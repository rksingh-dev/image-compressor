
import React from 'react';

const Header = () => {
  return (
    <header className="w-full py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent gradient-bg">
          Image Compressor
        </h1>
        <p className="text-center text-muted-foreground mt-2 max-w-2xl mx-auto">
          Compress your images without losing quality. Perfect for websites, emails, and social media.
        </p>
      </div>
    </header>
  );
};

export default Header;
