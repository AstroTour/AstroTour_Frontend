"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import HamburgerMenu from "./hamburger-spin";
import Mobilnav from "./mobilnav";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const checkAuth = () => {
      const loggedInUser = localStorage.getItem("username");
      const role = localStorage.getItem("role") || "";
  
      // Ha változás történt, egyszerre frissítjük az állapotokat
      setIsLoggedIn(loggedInUser !== null);
      setUserRole(role);
    };
  
    checkAuth(); // Azonnali ellenőrzés
  
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []); // Üres dependency array -> csak egyszer fut le

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    setIsLoggedIn(false);
    setUserRole("");

    window.dispatchEvent(new Event("storage")); // Kikényszerített frissítés
    window.location.href = "/";
  };

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
            <Link href="/about" className="m-4">Rólunk</Link>
            <Link href="/reservation" className="m-4">Foglalás</Link>
            <Link href="/planets" className="m-4">Bolygók</Link>
          </div>
        </div>

        <div className="flex items-center">
          {isLoggedIn ? (
            <>
              <img
                src="/user.png"
                alt="Felhasználó"
                width={40}
                height={40}
                className="mr-2"
              />

              {/* 🔹 Admin ikon csak adminoknak */}
              {(userRole === "admin" || userRole === "superadmin") && (
                <Link href="/admin">
                  <img
                    src="/admin-icon.png"
                    alt="Admin Panel"
                    width={40}
                    height={40}
                    className="mr-2"
                  />
                </Link>
              )}

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
