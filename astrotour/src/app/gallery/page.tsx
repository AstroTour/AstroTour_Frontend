import React from 'react';
import Image from 'next/image';

const Page = ({ image }: { image: string }) => {
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
  const images = [
    "/astro/astro1.jpg",
    "/astro/astro2.jpg",
    "/astro/astro3.jpg",
    "/astro/astro4.jpg",
    "/astro/astro5.jpg",
    "/astro/astro6.jpg",
    "/astro/astro7.png",
    "/astro/astro8.png",
    "/astro/astro9.png",
    "/astro/astro10.png",
    "/astro/astro11.png",
    "/astro/astro12.jpg",
    "/astro/astro13.jpg",
    "/astro/astro14.jpg",
    "/astro/astro15.png",
    "/astro/astro16.png",
    "/astro/astro17.png",
    "/astro/astro18.png",
  ];

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
