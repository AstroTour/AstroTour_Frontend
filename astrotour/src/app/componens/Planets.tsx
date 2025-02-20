"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

// Bolygó adatok (Most már kisebb méretekkel!)
const planets = [
  { name: "Mercury", size: 20, image: "/image/mercury.png", distance: 80, duration: 3 },
  { name: "Venus", size: 24, image: "/image/venus.png", distance: 115, duration: 5 },
  { name: "Earth", size: 28, image: "/image/earth.png", distance: 150, duration: 7 },
  { name: "Mars", size: 24, image: "/image/mars.png", distance: 185, duration: 9 },
  { name: "Jupiter", size: 38, image: "/image/jupiter.png", distance: 225, duration: 12 },
  { name: "Saturn", size: 34, image: "/image/saturnus.png", distance: 270, duration: 15 },
  { name: "Uranus", size: 30, image: "/image/uranus.png", distance: 310, duration: 18 },
  { name: "Neptune", size: 30, image: "/image/neptune.png", distance: 350, duration: 21 },
  { name: "Pluto", size: 20, image: "/image/pluto.png", distance: 380, duration: 25 },
];

const Planets = () => {
  const [angle, setAngle] = useState(0);
  const [sunRotation, setSunRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prevAngle) => prevAngle + 1);
      setSunRotation((prevRotation) => prevRotation + 1);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="relative flex items-center justify-center w-full h-[400px] md:h-[600px] lg:h-[800px] overflow-hidden"
      style={{
        backgroundImage: "url('/image/stars.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Nap középen */}
      <div 
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{ transform: `translate(-50%, -50%) rotate(${sunRotation}deg)` }}
      >
        <Image 
          src="/image/sun.png" 
          alt="Sun" 
          width={80}  
          height={80}  
          priority
          className="pointer-events-none"
        />
      </div>

      {/* Bolygók mozgása */}
      {planets.map((planet) => {
        const currentAngle = (angle / (planet.duration * 10)) * Math.PI * 2; 
        const x = Math.cos(currentAngle) * planet.distance;
        const y = Math.sin(currentAngle) * (planet.distance / 2);

        return (
          <div
            key={planet.name}
            className="absolute"
            style={{
              top: `calc(50% + ${y}px)`,
              left: `calc(50% + ${x}px)`,
              transform: "translate(-50%, -50%)",
              zIndex: 5,
            }}
          >
            <Image 
              src={planet.image} 
              alt={planet.name} 
              width={planet.size} 
              height={planet.size} 
              priority
              className="pointer-events-none"
            />
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-white text-xs">
              {planet.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Planets;
