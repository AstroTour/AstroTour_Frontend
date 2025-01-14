"use client"
import { useState } from "react";

export default function Home() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
  };

  return (
    <div className="">
      <div className="flex justify-center items-center m-40">
        {!clicked ? (
          <h1
            className="lg:text-4xl md:text-2xl w-auto max-w-full font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-500 to-white break-words"
             onClick={handleClick}>
            „Nem találod a helyed a Földön? Próbáld ki az űrt!”
          </h1>
        ) : (
          <img
            src="/rocket.png"
            alt="Űrhajó"
            className="absolute animate-fly-through-space"
          />
        )}
      </div>
    </div>
  );
}
