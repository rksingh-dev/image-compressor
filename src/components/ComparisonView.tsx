
import React, { useState, useEffect, useRef } from 'react';
import { Download, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface ComparisonViewProps {
  originalImage: File | null;
  compressedImage: Blob | null;
  compressedSize: number;
  originalSize: number;
  compressionRatio: number;
  onDownload: () => void;
  isCompressing: boolean;
}

const ComparisonView: React.FC<ComparisonViewProps> = ({
  originalImage,
  compressedImage,
  compressedSize,
  originalSize,
  compressionRatio,
  onDownload,
  isCompressing,
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [zoom, setZoom] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const originalUrl = originalImage ? URL.createObjectURL(originalImage) : '';
  const compressedUrl = compressedImage ? URL.createObjectURL(compressedImage) : '';
  
  // Cleanup URLs when component unmounts
  useEffect(() => {
    return () => {
      if (originalUrl) URL.revokeObjectURL(originalUrl);
      if (compressedUrl) URL.revokeObjectURL(compressedUrl);
    };
  }, [originalUrl, compressedUrl]);
  
  const formatSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };
  
  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };
  
  if (isCompressing) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <Progress value={compressionRatio} className="w-full" />
        <p className="text-center text-muted-foreground">Compressing your image...</p>
      </div>
    );
  }
  
  if (!originalImage || !compressedImage) {
    return null;
  }
  
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
          <h3 className="text-lg font-medium">Image Comparison</h3>
          <p className="text-sm text-muted-foreground">
            Slide to compare original and compressed images
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleZoomOut}
            disabled={zoom <= 0.5}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm">{Math.round(zoom * 100)}%</span>
          <Button
            variant="outline"
            size="icon"
            onClick={handleZoomIn}
            disabled={zoom >= 3}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="relative overflow-hidden border rounded-lg image-compression-area" ref={containerRef}>
        <div
          className="relative"
          style={{
            height: originalImage ? 'auto' : '300px',
            maxHeight: '70vh',
            overflow: 'hidden',
          }}
        >
          {/* Compressed Image (Background) */}
          <img
            src={compressedUrl}
            alt="Compressed"
            className="w-full h-auto object-contain"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
          />
          
          {/* Original Image (Foreground with clip) */}
          <div
            className="absolute top-0 left-0 h-full"
            style={{
              width: `${sliderPosition}%`,
              overflow: 'hidden',
            }}
          >
            <img
              src={originalUrl}
              alt="Original"
              className="w-full h-auto object-contain"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: 'top left',
                width: containerRef.current ? containerRef.current.offsetWidth : '100%',
              }}
            />
          </div>
          
          {/* Slider control */}
          <div
            className="absolute top-0 bottom-0"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          >
            <div className="w-0.5 h-full bg-primary"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg cursor-ew-resize">
              ⇄
            </div>
          </div>
        </div>
      </div>
      
      <Slider
        value={[sliderPosition]}
        min={0}
        max={100}
        step={1}
        onValueChange={(values) => setSliderPosition(values[0])}
        className="mt-4"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
        <div className="text-center p-4 bg-background rounded-md">
          <p className="text-sm font-medium">Original Size</p>
          <p className="text-2xl font-bold">{formatSize(originalSize)}</p>
        </div>
        <div className="text-center p-4 bg-background rounded-md">
          <p className="text-sm font-medium">Compressed Size</p>
          <p className="text-2xl font-bold">{formatSize(compressedSize)}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {compressionRatio > 0 ? `${compressionRatio.toFixed(0)}% smaller` : ''}
          </p>
        </div>
      </div>
      
      <div className="flex justify-center mt-4">
        <Button onClick={onDownload} className="gradient-bg" disabled={!compressedImage}>
          <Download className="mr-2 h-4 w-4" /> Download Compressed Image
        </Button>
      </div>
    </div>
  );
};

export default ComparisonView;
