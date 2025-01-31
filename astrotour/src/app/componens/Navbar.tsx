"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import HamburgerMenu from './hamburger-spin';
import Mobilnav from './mobilnav';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Figyeljük a localStorage-t, hogy automatikusan frissüljön az állapot
  useEffect(() => {
    const loggedInUser = localStorage.getItem("username");
    setIsLoggedIn(!!loggedInUser); // Ha van mentett felhasználó, be van jelentkezve
  }, []); // Csak egyszer fusson le, amikor a komponens betöltődik

  const handleLogout = () => {
    localStorage.removeItem("username"); // Távolítsuk el a felhasználót a localStorage-ból
    setIsLoggedIn(false); // Állapot frissítése
    window.location.href = "/"; // Főoldalra navigálás
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

        <div className='hidden md:flex items-center'>
          {isLoggedIn ? (
            <>
              <img
                src="/user.png"
                alt="Felhasználó"
                width={40}
                height={40}
                className="mr-2"
              />
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-1 px-4 rounded-full hover:bg-red-600 transition"
              >
                Kijelentkezés
              </button>
            </>
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
