
/**
 * Compresses an image while trying to maintain quality
 * Uses browser canvas to resize and compress images
 */
export async function compressImage(
  file: File, 
  options: {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
    onProgress?: (progress: number) => void;
  } = {}
): Promise<{ blob: Blob; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    // Set defaults
    const maxWidth = options.maxWidth || 1920;
    const maxHeight = options.maxHeight || 1080;
    const quality = options.quality || 0.85;
    const onProgress = options.onProgress || (() => {});
    
    // Create image object
    const img = new Image();
    img.onload = () => {
      // Report loading progress
      onProgress(10);
      
      // Calculate dimensions while maintaining aspect ratio
      let width = img.width;
      let height = img.height;
      
      if (width > maxWidth) {
        height = (maxWidth / width) * height;
        width = maxWidth;
      }
      
      if (height > maxHeight) {
        width = (maxHeight / height) * width;
        height = maxHeight;
      }
      
      // Create canvas
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      
      // Report progress
      onProgress(40);
      
      // Draw image to canvas
      ctx.drawImage(img, 0, 0, width, height);
      
      // Report progress
      onProgress(70);
      
      // Convert to WebP if supported, otherwise use JPEG
      let mimeType: string;
      if (typeof HTMLCanvasElement !== 'undefined' && HTMLCanvasElement.prototype.toBlob) {
        try {
          // Try WebP
          const testCanvas = document.createElement('canvas');
          testCanvas.width = 1;
          testCanvas.height = 1;
          const testBlob = testCanvas.toDataURL('image/webp');
          mimeType = testBlob.startsWith('data:image/webp') ? 'image/webp' : 'image/jpeg';
        } catch (e) {
          mimeType = 'image/jpeg';
        }
      } else {
        mimeType = 'image/jpeg';
      }
      
      // Convert to blob
      canvas.toBlob((blob) => {
        if (blob) {
          // Report completion
          onProgress(100);
          resolve({ blob, width, height });
        } else {
          reject(new Error('Could not compress image'));
        }
      }, mimeType, quality);
    };
    
    img.onerror = () => {
      reject(new Error('Error loading image'));
    };
    
    // Load the image
    img.src = URL.createObjectURL(file);
  });
}
