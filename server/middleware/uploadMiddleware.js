const multer = require('multer');

// Configure multer for memory storage
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB per file (reduced from 50MB)
    files: 6,                    // Max 6 files per request
    fieldSize: 10 * 1024 * 1024, // Max field value size
  },
  fileFilter: fileFilter,
});

/**
 * Middleware to optimise uploaded images using sharp.
 * - Resizes to max 1920px wide (no upscaling)
 * - Converts to WebP for 30-50% smaller sizes
 * - Strips EXIF/metadata for privacy & bandwidth
 */
const optimiseImages = async (req, res, next) => {
  if (!req.files || req.files.length === 0) return next();

  try {
    const sharp = require('sharp');

    const optimised = await Promise.all(
      req.files.map(async (file) => {
        const processed = await sharp(file.buffer)
          .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 82 })
          .toBuffer();

        return {
          ...file,
          buffer: processed,
          mimetype: 'image/webp',
          size: processed.length,
          originalname: file.originalname.replace(/\.[^.]+$/, '.webp'),
        };
      })
    );

    req.files = optimised;
    next();
  } catch (error) {
    // If sharp fails, proceed with original files
    console.warn('Image optimisation failed, using originals:', error.message);
    next();
  }
};

module.exports = upload;
module.exports.optimiseImages = optimiseImages;