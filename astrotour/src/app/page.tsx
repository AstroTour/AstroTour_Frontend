"use client"
import { useState } from "react";

export default function Home() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
  };

  return (
    <div className="w-full flex justify-center items-center pt-20 md:pt-40 lg:pt-20">
      <div className="text-center mt-10 md:mt-20 lg:mt-40">
        {!clicked ? (
          <h1
            className="lg:text-4xl md:text-2xl sm:text-2xl w-auto max-w-full font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-white to-blue-600 break-words px-4"
            onClick={handleClick}
          >
            „Nem találod a helyed a Földön? Próbáld ki az űrt!”
          </h1>
        ) : (
          <img
            src="/rocket.png"
            alt="Űrhajó"
            className="absolute animate-fly-through-space w-10 md:w-12 lg:w-16"
          />
        )}
      </div>
    </div>
  );
}
