"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import HamburgerMenu from './hamburger-spin';
import Mobilnav from './mobilnav';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("username");
    setIsMenuOpen(false);  // Menüt bezárjuk kijelentkezés után
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='bg-cover bg-center'>
      <nav className="flex justify-between items-center text-white backdrop-blur-sm bg-black bg-opacity-40 p-6 rounded-bl-3xl rounded-br-3xl overflow-hidden border-b border-white/30">
        <div className="flex">
          <Link href="/" className="m-4 text-2xl">
            AstroTour
          </Link>
        </div>

        <div className="flex justify-center flex-grow">
          <div className='hidden md:block'>
            <Link href="/about" className="m-4">Rólunk</Link>
            <Link href="/reservation" className="m-4">Foglalás</Link>
            <Link href="/planets" className="m-4">Bolygók</Link>
          </div>
        </div>

        <div className='hidden md:block relative'>
          {isLoggedIn ? (
            <div className="relative">
              <button 
                className="flex items-center text-white m-4"
                onClick={toggleMenu}  // Ikon kattintáskor a menü nyitása
              >
                <img
                  src="/user.png"
                  alt="Felhasználó"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                <span>Felhasználó</span>
              </button>

              {/* Legördülő menü */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-10">
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"
                  >
                    Kijelentkezés
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/registration/login" className="m-4 flex justify-between rounded-xl border p-1">
              Bejelentkezés
            </Link>
          )}
        </div>
      </nav>

      <div className='md:hidden m-auto p-0'>
        <Mobilnav />
      </div>

      <div className='hidden md:block'>
        <HamburgerMenu />
      </div>
    </header>
  );
}

export default Navbar;
