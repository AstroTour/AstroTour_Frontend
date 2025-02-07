"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

// 🔹 Bolygó adatok (Most már kisebb méretekkel!)
const planets = [
  { name: "Mercury", size: 20, image: "/image/mercury.png", distance: 80, duration: 3, eccentricity: 6 },
  { name: "Venus", size: 24, image: "/image/venus.png", distance: 120, duration: 5, eccentricity: 10 },
  { name: "Earth", size: 28, image: "/image/earth.png", distance: 150, duration: 7, eccentricity: 14 },
  { name: "Mars", size: 24, image: "/image/mars.png", distance: 180, duration: 9, eccentricity: 18 },
  { name: "Jupiter", size: 38, image: "/image/jupiter.png", distance: 220, duration: 12, eccentricity: 25 },
  { name: "Saturn", size: 34, image: "/image/saturn.png", distance: 270, duration: 15, eccentricity: 30 },
  { name: "Uranus", size: 30, image: "/image/uranus.png", distance: 320, duration: 18, eccentricity: 35 },
  { name: "Neptune", size: 30, image: "/image/neptune.png", distance: 360, duration: 21, eccentricity: 40 },
  { name: "Pluto", size: 20, image: "/image/pluto.png", distance: 400, duration: 25, eccentricity: 45 },
];

const Planets = () => {
  const [angle, setAngle] = useState(0);
  const [sunRotation, setSunRotation] = useState(0); // 🔹 Nap forgási állapota

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prevAngle) => prevAngle + 1); // 🔹 Bolygók mozgása
      setSunRotation((prevRotation) => prevRotation + 1); // 🔹 Nap forgása (lassú)
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="relative flex items-center justify-center w-[900px] h-[900px] overflow-visible"
      style={{
        backgroundImage: "url('/image/stars.jpg')", // 🔹 Csillagos háttérkép
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        animation: "starsAnimation 60s infinite linear"
      }}
    >
      {/* 🔥 Nap középen (forgó animáció) */}
      <div 
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{ transform: `translate(-50%, -50%) rotate(${sunRotation}deg)` }} // 🔄 Forgás
      >
        <Image 
          src="/image/sun.png" 
          alt="Sun" 
          width={80}  
          height={80}  
          priority
          className="pointer-events-none"
          style={{ background: "transparent" }}
        />
      </div>

      {/* 🔹 Bolygók valódi ellipszis pályán keringenek */}
      {planets.map((planet, index) => {
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
            {/* 🔹 Kisebb bolygók */}
            <Image 
              src={planet.image} 
              alt={planet.name} 
              width={planet.size} 
              height={planet.size} 
              priority
              className="pointer-events-none"
              style={{ background: "transparent" }}
            />

            {/* 🔹 Bolygók neve */}
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
