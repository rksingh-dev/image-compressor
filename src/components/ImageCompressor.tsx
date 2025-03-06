import React, { useState, useCallback } from 'react';
import ImageUploader from './ImageUploader';
import ComparisonView from './ComparisonView';
import { compressImage } from '@/utils/imageCompression';
import { toast } from 'sonner';

const ImageCompressor = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<Blob | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [compressionRatio, setCompressionRatio] = useState<number>(0);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [compressionProgress, setCompressionProgress] = useState<number>(0);

  const handleImageSelect = useCallback(async (file: File) => {
    try {
      setOriginalImage(file);
      setCompressedImage(null);
      setOriginalSize(file.size);
      setIsCompressing(true);
      setCompressionProgress(0);
      
      const result = await compressImage(file, {
        quality: 0.8, // Adjust quality for optimal compression
        onProgress: (progress) => {
          setCompressionProgress(progress);
        }
      });
      
      setCompressedImage(result.blob);
      setCompressedSize(result.blob.size);
      
      const ratio = 100 - (result.blob.size / file.size) * 100;
      setCompressionRatio(ratio);
      
      if (ratio < 5) {
        toast.info("This image couldn't be compressed much further while maintaining quality.");
      } else {
        toast.success(`Image compressed by ${ratio.toFixed(0)}%!`);
      }
    } catch (error) {
      console.error('Compression error:', error);
      toast.error('Error compressing image. Please try another image.');
    } finally {
      setIsCompressing(false);
    }
  }, []);
  
  const handleDownload = useCallback(() => {
    if (!compressedImage || !originalImage) return;
    
    const url = URL.createObjectURL(compressedImage);
    const link = document.createElement('a');
    
    // Keep the original file name and add a suffix
    const originalName = originalImage.name;
    const extension = originalName.split('.').pop();
    const nameWithoutExtension = originalName.substring(0, originalName.lastIndexOf('.'));
    const newFileName = `${nameWithoutExtension}-compressed.${extension}`;
    
    link.href = url;
    link.download = newFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success('Image downloaded successfully!');
  }, [compressedImage, originalImage]);
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      {!originalImage ? (
        <ImageUploader onImageSelect={handleImageSelect} />
      ) : (
        <div className="space-y-6">
          <ComparisonView 
            originalImage={originalImage}
            compressedImage={compressedImage}
            compressedSize={compressedSize}
            originalSize={originalSize}
            compressionRatio={compressionRatio}
            onDownload={handleDownload}
            isCompressing={isCompressing}
          />
          
          <div className="flex justify-center mt-8">
            <button 
              onClick={() => {
                setOriginalImage(null);
                setCompressedImage(null);
              }}
              className="text-primary hover:underline"
            >
              Compress another image
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCompressor;
