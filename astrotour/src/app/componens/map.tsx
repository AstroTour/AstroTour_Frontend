import React from "react";
import Planets from "./Planets"; // 🔹 Bolygók importálása

const Map = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-transparent overflow-hidden">
      <Planets /> {/* 🔹 A bolygók most már átlátszó konténerben lesznek */}
    </div>
  );
};

export default Map;
