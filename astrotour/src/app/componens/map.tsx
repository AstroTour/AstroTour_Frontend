import React from "react";
import Planets from "./Planets"; // 🔹 Biztosítsd, hogy a fájl `Planets.tsx` és nagybetűvel van írva!

const Map = () => {
  console.log("Map komponens betöltődött!");
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <Planets />
    </div>
  );
};

export default Map;
