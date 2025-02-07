"use client";
import React, { useEffect, useState } from "react";

// 🔹 Bolygó adatok (MINDEN MÉRET KISEBB!)
const planets = [
  { name: "Merkúr", size: "w-4 h-4", color: "bg-gray-500", distance: 30, duration: 3, eccentricity: 5 },
  { name: "Vénusz", size: "w-5 h-5", color: "bg-orange-500", distance: 50, duration: 5, eccentricity: 8 },
  { name: "Föld", size: "w-6 h-6", color: "bg-blue-500", distance: 70, duration: 7, eccentricity: 10 },
  { name: "Mars", size: "w-5 h-5", color: "bg-red-500", distance: 90, duration: 9, eccentricity: 12 },
  { name: "Jupiter", size: "w-9 h-9", color: "bg-brown-500", distance: 120, duration: 12, eccentricity: 15 },
  { name: "Szaturnusz", size: "w-8 h-8", color: "bg-yellow-300", distance: 150, duration: 15, eccentricity: 18 },
  { name: "Uránusz", size: "w-7 h-7", color: "bg-teal-400", distance: 180, duration: 18, eccentricity: 20 },
  { name: "Neptunusz", size: "w-7 h-7", color: "bg-blue-700", distance: 210, duration: 21, eccentricity: 22 },
  { name: "Plútó", size: "w-4 h-4", color: "bg-gray-400", distance: 240, duration: 25, eccentricity: 25 },
];

const Planets = () => {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prevAngle) => prevAngle + 1); // 🔹 Lassú mozgás
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full h-full bg-transparent">
      {/* 🔥 KISEBB Nap középen */}
      <div className="absolute w-20 h-20 bg-yellow-500 rounded-full shadow-lg left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>

      {/* 🔹 Bolygók valódi ellipszis pályán keringenek */}
      {planets.map((planet, index) => {
        const currentAngle = (angle / (planet.duration * 10)) * Math.PI * 2; 
        const x = Math.cos(currentAngle) * planet.distance;
        const y = Math.sin(currentAngle) * (planet.distance / 2);

        return (
          <div
            key={planet.name}
            className={`absolute ${planet.size} ${planet.color} rounded-full`}
            style={{
              position: "absolute",
              top: `calc(50% + ${y}px)`,
              left: `calc(50% + ${x}px)`,
              transform: "translate(-50%, -50%)",
            }}
          >
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
