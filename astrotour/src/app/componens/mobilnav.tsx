"use client"

import React, { useState } from 'react';

function Mobilnav() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

  return (
    <div className="relative z-50">
      <div
        className={`tham tham-e-squeeze tham-w-6 ${isOpen ? "tham-active" : ""} flex items-center justify-center absolute top-4 right-5 z-50 md:hidden`}
        onClick={toggleMenu}>
        <div className="tham-box">
          <div className="tham-inner bg-white" />
        </div>
      </div>

      <div
        className={`fixed top-50 right-0 w-64 h-auto backdrop-blur-sm shadow-lg border border-white/30 transform transition-transform duration-300 rounded-lg z-40 bg-black bg-opacity-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"}`}>

        <ul className="flex flex-col p-4 space-y-4">
          <li className="relative border-b border-white/30 pb-2 group">
            <a
              href="/about"
              className="text-white group-hover:text-sm duration-300 transform transition">
              Rólunk
            </a>
          </li>
          <li className="relative border-b border-white/30 pb-2 group">
            <a
              href="/reservation"
              className="text-white group-hover:text-sm duration-300 transform transition">
              Foglalás
            </a>
          </li>
          <li className="relative border-b border-white/30 pb-2 group">
            <a
              href="planets"
              className="text-white group-hover:text-sm duration-300 transform transition">
              Bolygók
            </a>
          </li>
          <li className="relative border-b border-white/30 pb-2 group">
            <a
              href="/timetables"
              className="text-white group-hover:text-sm duration-300 transform transition">
              Menetrendek
            </a>
          </li>
          <li className="relative border-b border-white/30 pb-2 group">
            <a
              href="/gallery"
              className="text-white group-hover:text-sm duration-300 transform transition">
              Gallery
            </a>
          </li>
          <li className="relative border-b border-white/30 pb-2 group">
            <a
              href="F.A.Q"
              className="text-white group-hover:text-sm duration-300 transform transition">
              GY.I.K.
            </a>
          </li>
          <li className="relative group">
            <a
              href="information"
              className="text-white group-hover:text-sm duration-300 transform transition">
              Tájékoztatás
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Mobilnav;
