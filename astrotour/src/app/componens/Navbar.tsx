// app/componens/Navbar.tsx
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
  const userRole = session?.user?.role || "";

  return (
    <header className="bg-cover bg-center">
      <nav className="flex justify-between items-center text-white backdrop-blur-sm bg-black bg-opacity-40 p-6 rounded-bl-3xl rounded-br-3xl overflow-hidden border-b border-white/30">
        <div className="flex">
          <Link href="/" className="m-4 text-2xl">
            AstroTour
          </Link>
        </div>

        <div className="flex justify-center flex-grow">
          <div className="hidden md:block">
            <Link href="/about" className="m-4">
              Rólunk
            </Link>
            <Link href="/reservation" className="m-4">
              Foglalás
            </Link>
            <Link href="/planets" className="m-4">
              Bolygók
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {isLoggedIn ? (
            <>
              <Image 
              src="/user.png" 
              alt="Felhasználó" 
              width={40} 
              height={40} 
              />
              
              {(userRole === "admin" || userRole === "super-admin") && (
                <a
                  href="http://devsite.monvoie.com/admin"
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
                className="bg-red-500 text-white py-1 px-4 rounded-full hover:bg-red-600 transition"
              >
                Kijelentkezés
              </button>
            </>
          ) : (
            <Link
              href="/registration/login"
              className="m-4 flex justify-between rounded-xl border p-1"
            >
              Bejelentkezés
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
