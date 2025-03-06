
import React from 'react';
import Header from '@/components/Header';
import ImageCompressor from '@/components/ImageCompressor';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="w-full max-w-4xl mx-auto space-y-12">
          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-lg bg-accent/50">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full gradient-bg flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3"></path>
                  <path d="M21 8V5a2 2 0 0 0-2-2h-3"></path>
                  <path d="M3 16v3a2 2 0 0 0 2 2h3"></path>
                  <path d="M16 21h3a2 2 0 0 0 2-2v-3"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Smart Compression</h3>
              <p className="text-sm text-muted-foreground">Reduce file size while maintaining visual quality</p>
            </div>
            
            <div className="p-6 rounded-lg bg-accent/50">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full gradient-bg flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Privacy First</h3>
              <p className="text-sm text-muted-foreground">All processing happens in your browser</p>
            </div>
            
            <div className="p-6 rounded-lg bg-accent/50">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full gradient-bg flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="m15 9-6 6"></path>
                  <path d="m9 9 6 6"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Free & Fast</h3>
              <p className="text-sm text-muted-foreground">No limits, no watermarks, no registration</p>
            </div>
          </div>
          
          {/* Compressor Component */}
          <ImageCompressor />
          
          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-2">How does the compression work?</h3>
                <p className="text-muted-foreground">Our compressor uses advanced algorithms to reduce image file size while preserving visual quality. It balances compression ratio with image clarity to get the best results.</p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-2">Are my images uploaded to your servers?</h3>
                <p className="text-muted-foreground">No. All processing happens directly in your browser. Your images never leave your device, ensuring total privacy and security.</p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-2">What image formats are supported?</h3>
                <p className="text-muted-foreground">Our tool supports the most common image formats including JPEG, PNG, GIF, and WebP.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
