
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      onImageSelect(acceptedFiles[0]);
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
    },
    multiple: false,
  });

  return (
    <div 
      {...getRootProps()} 
      className={`
        w-full rounded-xl border-2 border-dashed transition-all duration-200 
        flex flex-col items-center justify-center p-8 cursor-pointer
        ${isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}
      `}
      style={{ minHeight: '200px' }}
    >
      <input {...getInputProps()} />
      
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
          <Upload className="h-8 w-8 text-primary" />
        </div>
        
        <h3 className="text-lg font-medium mb-2">
          {isDragActive ? 'Drop your image here' : 'Drag & drop your image here'}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4">
          or click to browse your files
        </p>
        
        <Button 
          type="button" 
          onClick={(e) => {
            e.stopPropagation();
            open();
          }}
          className="gradient-bg"
        >
          Select Image
        </Button>
      </div>
    </div>
  );
};

export default ImageUploader;
