"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import HamburgerMenu from "./hamburger-spin";
import Mobilnav from "./mobilnav";

function Navbar() {
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  // Ha be van jelentkezve, a session.user.role tartalmazza a szerepet
  const userRole = (session?.user as { role?: string })?.role || "";

  return (
    <header className="bg-cover bg-center">
      <nav className="flex justify-between items-center text-white backdrop-blur-sm bg-black bg-opacity-60 p-6 rounded-bl-3xl rounded-br-3xl overflow-hidden border-b border-white/30">
        <div className="flex">
          <Link href="/" className="m-4 text-2xl text-white transition-all duration-500 relative hover:text-transparent">
            AstroTour
            <span className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent opacity-0 transition-opacity duration-500 hover:opacity-100">
              AstroTour
            </span>
          </Link>
        </div>

        <div className="flex justify-center flex-grow">
          <div className="hidden md:block">
            <Link href="/about" className="relative m-4 pb-2 text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:left-1/2 hover:after:right-1/2">
              Rólunk
            </Link>
            <Link href="/reservation" className="relative m-4 pb-2 text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:left-1/2 hover:after:right-1/2">
              Foglalás
            </Link>
            <Link href="/planets" className="relative m-4 pb-2 text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:left-1/2 hover:after:right-1/2">
              Bolygók
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {isLoggedIn ? (
            <>
              <Link href="/profilupdate">
                <Image 
                  src="/user.png" 
                  alt="Felhasználó" 
                  width={40} 
                  height={40} 
                  className="cursor-pointer"
                />
              </Link>

              {(userRole === "admin" || userRole === "super-admin") && (
                <a
                  href="http://localhost:8000/admin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/admin.png"
                    alt="Admin Panel"
                    width={40}
                    height={40}
                    className="mr-2"
                  />
                </a>
              )}
              <button
                onClick={() => signOut()}
                className="bg-red-500 text-white py-1 px-4 rounded-full hover:bg-red-600 transition">
                Kijelentkezés
              </button>
            </>
          ) : (
            <Link
              href="/registration/login"
              className="m-4 flex justify-between rounded-xl border border-white p-1 font-bold relative">
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-pink-700 to-purple-600 transition-transform duration-300 hover:scale-110">
                Bejelentkezés
              </span>
            </Link>
          )}
        </div>
      </nav>

      <div className="md:hidden m-auto p-0">
        <Mobilnav />
      </div>

      <div className="hidden md:block">
        <HamburgerMenu />
      </div>
    </header>
  );
}

export default Navbar;
