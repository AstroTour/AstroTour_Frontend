"use client";

import { useState } from "react";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div
        className={`tham tham-e-squeeze tham-w-6 ${isOpen ? "tham-active" : ""} flex items-center justify-center absolute top-5 right-5 z-50`}
        onClick={toggleMenu}>
        <div className="tham-box">
          <div className="tham-inner bg-white" />
        </div>
      </div>

      <div
        className={`fixed top- right-0 w-64 h-auto backdrop-blur-sm shadow-lg border-l border-white/30 transform transition-transform duration-500 rounded-lg ${
          isOpen ? "translate-x-0" : "translate-x-full"}`}>

        <ul className="flex flex-col p-4 space-y-4">
          <li className="relative border-b border-white/30 pb-2 group">
            <a
              href="/timetables"
              className="text-white group-hover:text-transparent group-hover:bg-transparent group-hover:backdrop-blur-none group-hover:opacity-100 transition-all duration-300">
              Menetrendek
            </a>
          </li>
          <li className="relative border-b border-white/30 pb-2 group">
            <a
              href="/gallery"
              className="text-white group-hover:text-transparent group-hover:bg-transparent group-hover:backdrop-blur-none group-hover:opacity-100 transition-all duration-300">
              Gallery
            </a>
          </li>
          <li className="relative border-b border-white/30 pb-2 group">
            <a
              href="F.A.Q"
              className="text-white group-hover:text-transparent group-hover:bg-transparent group-hover:backdrop-blur-none group-hover:opacity-100 transition-all duration-300">
              GY.I.K.
            </a>
          </li>
          <li className="relative group">
            <a
              href="information"
              className="text-white group-hover:text-transparent group-hover:bg-transparent group-hover:backdrop-blur-none group-hover:opacity-100 transition-all duration-300">
              Tájékoztatás
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HamburgerMenu;