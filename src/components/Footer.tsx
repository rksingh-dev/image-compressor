
import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-6 mt-12 border-t">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-muted-foreground">
          Image Compressor — Compress images without losing quality
        </p>
        <p className="text-center text-xs text-muted-foreground mt-1">
          All processing happens in your browser. Your images are never uploaded to a server.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
