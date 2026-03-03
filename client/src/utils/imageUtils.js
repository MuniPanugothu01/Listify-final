/**
 * Image Utilities
 *
 * Production-grade helpers for client-side image processing.
 * Compresses images via OffscreenCanvas / <canvas> before storing
 * as base-64 data-URLs in Redux (for draft listings without a backend).
 */

/** Maximum dimension (px) for compressed thumbnails stored in state. */
const MAX_DIMENSION = 800;

/** Default WebP quality (0-1).  0.7 ≈ 30-50 KB per image. */
const DEFAULT_QUALITY = 0.7;

/**
 * Compress a single File/Blob into a base-64 data-URL string.
 *
 * Pipeline:
 *   File → FileReader (ArrayBuffer) → createImageBitmap → Canvas → toDataURL
 *
 * @param {File|Blob} file           – Raw image file from <input>.
 * @param {object}    [opts]
 * @param {number}    [opts.maxDimension=800]  – Max width/height in px.
 * @param {number}    [opts.quality=0.7]       – WebP quality 0-1.
 * @returns {Promise<string>} Compressed base-64 data-URL.
 */
export const compressImageToDataUrl = (
  file,
  { maxDimension = MAX_DIMENSION, quality = DEFAULT_QUALITY } = {},
) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        // Calculate scaled dimensions (preserve aspect ratio)
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          const ratio = Math.min(maxDimension / width, maxDimension / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        // Smooth downscaling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        // Prefer WebP; fall back to JPEG for older browsers
        let dataUrl = canvas.toDataURL("image/webp", quality);
        if (!dataUrl.startsWith("data:image/webp")) {
          dataUrl = canvas.toDataURL("image/jpeg", quality);
        }

        resolve(dataUrl);
      };

      img.onerror = () => reject(new Error("Failed to decode image"));
      img.src = e.target.result;
    };

    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });

/**
 * Compress multiple image files in parallel.
 *
 * @param {File[]}  files   – Array of image File objects.
 * @param {object}  [opts]  – Options forwarded to `compressImageToDataUrl`.
 * @returns {Promise<string[]>} Array of base-64 data-URLs.
 */
export const compressImagesToDataUrls = (files, opts) =>
  Promise.all(files.map((f) => compressImageToDataUrl(f, opts)));
