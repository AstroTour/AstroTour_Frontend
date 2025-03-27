'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const Page = ({ image }: { image: string }) => {
  if (!image) return null;

  return (
    <div className="flex justify-center items-center">
      <div className="relative w-full h-[350px] bg-black/30 backdrop-blur-md rounded-lg flex items-center justify-center border-4 border-white/30 shadow-lg overflow-hidden">
        <Image 
          src={image} 
          alt="image" 
          layout="fill" 
          objectFit="cover" 
          
        />
      </div>
    </div>
  );
};

const ImageContainer = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch('http://localhost:8000/api/gallery');
      const data = await res.json();
  
      
      const urls = data.map((item: any) => item.url);
      setImages(urls);
    };
  
    fetchImages();
  }, []);

  return (
    <div className="container mx-auto p-10 relative z-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {images.map((image, index) => (
          <Page key={index} image={image} />
        ))}
      </div>
    </div>
  );
};

export default ImageContainer;
