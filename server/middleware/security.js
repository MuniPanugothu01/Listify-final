const { logger } = require('../utils/logger');

const securityMiddleware = (req, res, next) => {
  // 1. Remove X-Powered-By header
  res.removeHeader('X-Powered-By');
  
  // 2. Set X-Content-Type-Options
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // 3. Set X-Frame-Options
  res.setHeader('X-Frame-Options', 'DENY');
  
  // 4. Set X-XSS-Protection
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // 5. Set Referrer-Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // 6. Set Permissions-Policy
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // 7. Log security-related headers
  if (process.env.NODE_ENV === 'development') {
    logger.debug('Security headers set for request', {
      path: req.path,
      method: req.method,
      headers: {
        'X-Content-Type-Options': res.getHeader('X-Content-Type-Options'),
        'X-Frame-Options': res.getHeader('X-Frame-Options'),
        'X-XSS-Protection': res.getHeader('X-XSS-Protection'),
      }
    });
  }
  
  // 8. Validate request origin (for production)
  if (process.env.NODE_ENV === 'production') {
    const allowedOrigins = process.env.ALLOWED_ORIGINS ? 
      process.env.ALLOWED_ORIGINS.split(',') : [];
    
    const origin = req.headers.origin;
    if (origin && !allowedOrigins.includes(origin) && req.path !== '/health') {
      logger.warn('Blocked request from unauthorized origin', {
        origin,
        ip: req.ip,
        path: req.path,
      });
      return res.status(403).json({
        success: false,
        message: 'Origin not allowed',
      });
    }
  }
  
  next();
};

module.exports = securityMiddleware;