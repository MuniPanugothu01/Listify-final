const winston = require('winston');
const path = require('path');
const fs = require('fs');

// Create logs directory if it doesn't exist
const logDir = 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// Console format for development
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    let metaStr = '';
    if (Object.keys(meta).length > 0) {
      metaStr = JSON.stringify(meta, null, 2);
    }
    return `${timestamp} [${level}]: ${message} ${metaStr}`;
  })
);

// Create logger instance
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  defaultMeta: { service: 'listify-api' },
  transports: [
    // Write all logs with level 'error' and below to error.log
    new winston.transports.File({ 
      filename: path.join(logDir, 'error.log'), 
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // Write all logs with level 'info' and below to combined.log
    new winston.transports.File({ 
      filename: path.join(logDir, 'combined.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // Write product-related activity to a dedicated file
    new winston.transports.File({
      filename: path.join(logDir, 'products.log'),
      maxsize: 10485760, // 10MB — products log is high-value for auditing
      maxFiles: 10,
      // Only capture product-related log entries
      format: winston.format.combine(
        winston.format((info) => {
          if (
            typeof info.message === 'string' &&
            (info.message.includes('[PRODUCT_POSTED]') ||
             info.message.includes('[PRODUCT_UPDATED]') ||
             info.message.includes('[PRODUCT_DELETED]') ||
             info.message.includes('[VALIDATION_FAILED]'))
          ) {
            return info;
          }
          return false;
        })(),
        logFormat,
      ),
    }),
  ],
});

// If we're not in production, log to the console as well
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: consoleFormat,
  }));
}

// Create a stream object for Morgan HTTP logging
logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

// Helper methods for specific log types
logger.requestLog = (req, res, error = null) => {
  const logData = {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get('user-agent'),
    userId: req.user?.id || 'anonymous',
    statusCode: res.statusCode,
    responseTime: res.get('x-response-time'),
  };

  if (error) {
    logger.error('Request failed', { ...logData, error: error.message });
  } else {
    logger.info('Request completed', logData);
  }
};

logger.dbLog = (operation, collection, query, result, error = null) => {
  const logData = {
    operation,
    collection,
    query: JSON.stringify(query),
    resultCount: Array.isArray(result) ? result.length : result ? 1 : 0,
  };

  if (error) {
    logger.error('Database operation failed', { ...logData, error: error.message });
  } else {
    logger.debug('Database operation completed', logData);
  }
};

logger.emailLog = (action, recipient, status, error = null) => {
  const logData = {
    action,
    recipient,
    status,
    timestamp: new Date().toISOString(),
  };

  if (error) {
    logger.error('Email operation failed', { ...logData, error: error.message });
  } else {
    logger.info('Email operation completed', logData);
  }
};

/**
 * Log product lifecycle events — posted, updated, deleted.
 * These entries are written to both combined.log and the dedicated products.log.
 *
 * @param {'posted'|'updated'|'deleted'} action
 * @param {string} entity - e.g. 'electronics', 'vehicles', 'forsale'
 * @param {Object} listing - listing document / data
 * @param {Object} req - Express request (for IP, user, user-agent)
 * @param {Object} [extra] - additional metadata (e.g. changes object)
 */
logger.productLog = (action, entity, listing, req, extra = {}) => {
  const tag = `[PRODUCT_${action.toUpperCase()}]`;
  const logData = {
    entity,
    listingId: listing._id || listing.id,
    title: listing.title,
    category: listing.category,
    subcategory: listing.subcategory,
    price: listing.price,
    condition: listing.condition,
    location: listing.location,
    imageCount: (listing.images || []).length,
    sellerId: req.user?._id || req.user?.id || 'unknown',
    sellerEmail: req.user?.email || 'unknown',
    ip: req.ip,
    userAgent: req.get ? req.get('user-agent') : 'unknown',
    timestamp: new Date().toISOString(),
    ...extra,
  };

  logger.info(`${tag} ${entity} listing ${action}`, logData);
};

module.exports = { logger };