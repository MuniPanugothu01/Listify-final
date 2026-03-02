const { logger } = require('../utils/logger');

const securityMiddleware = (req, res, next) => {
  // 1. Remove X-Powered-By header (defense in depth — helmet also does this)
  res.removeHeader('X-Powered-By');
  
  // 2. Set X-Content-Type-Options — prevents MIME sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // 3. Set X-Frame-Options — prevents clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // 4. Set X-XSS-Protection — legacy XSS filter
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // 5. Set Referrer-Policy — controls referrer header leakage
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // 6. Set Permissions-Policy — restrict browser features
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  
  // 7. Strict-Transport-Security (HSTS) — force HTTPS in production
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }

  // 8. Cache-Control for auth endpoints — prevent caching of sensitive data
  if (req.path.startsWith('/api/auth')) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
  
  // 9. Log security-related headers (dev only)
  if (process.env.NODE_ENV === 'development') {
    logger.debug('Security headers set for request', {
      path: req.path,
      method: req.method,
    });
  }
  
  // 10. CSRF origin validation for state-changing requests
  // Ensures POST/PUT/PATCH/DELETE requests come from the expected
  // origin, preventing cross-site request forgery even if cookies
  // are sent (sameSite=none in cross-origin production setups).
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
    const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
      .split(',')
      .map((o) => o.trim());

    const origin = req.headers.origin;
    const referer = req.headers.referer;

    // Skip for server-to-server (no origin at all — e.g. curl, Postman, mobile SDKs).
    // Browsers ALWAYS send Origin on cross-origin and same-origin POST, so
    // if Origin is present it MUST match. If absent, check Referer.
    if (origin) {
      if (!allowedOrigins.includes(origin)) {
        logger.warn('CSRF: blocked mutation from unexpected origin', {
          origin,
          ip: req.ip,
          path: req.path,
        });
        return res.status(403).json({
          success: false,
          message: 'Origin not allowed',
        });
      }
    } else if (referer) {
      try {
        const refererOrigin = new URL(referer).origin;
        if (!allowedOrigins.includes(refererOrigin)) {
          logger.warn('CSRF: blocked mutation from unexpected referer', {
            refererOrigin,
            ip: req.ip,
            path: req.path,
          });
          return res.status(403).json({
            success: false,
            message: 'Origin not allowed',
          });
        }
      } catch (_) {
        // Malformed referer — allow (could be a proxy stripping it)
      }
    }
    // No Origin, no Referer: server-to-server or privacy extension — allow.
  }
  
  next();
};

module.exports = securityMiddleware;