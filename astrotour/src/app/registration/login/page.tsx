"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const Singin = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  useEffect(() => {
    const loggedInUser = localStorage.getItem("username");
    if (loggedInUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleForm = () => {
    setIsRegistering((prev) => !prev);
    setErrorMessage(""); 
  };

  const validateForm = () => {
    if (!email || !email.includes("@")) {
      setErrorMessage("Érvénytelen email cím.");
      return false;
    }

    if (password.length < 8) {
      setErrorMessage("A jelszónak legalább 8 karakter hosszúnak kell lennie.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (isRegistering) {
      
      localStorage.setItem("username", username);
      setIsLoggedIn(true);
    } else {
      
      if (username === localStorage.getItem("username")) {
        setIsLoggedIn(true);
      } else {
        setErrorMessage("Érvénytelen felhasználónév vagy jelszó.");
        return;
      }
    }

    setTimeout(() => {
      window.location.href = "/";
    }, 500); 
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <div className="flex justify-center items-center m-5">
      <div className="relative w-96 bg-black bg-opacity-40 backdrop-blur-lg border border-white/20 rounded-lg shadow-lg overflow-hidden transition-all duration-300">
        {isLoggedIn ? (
          
          <div className="p-8">
            <h1 className="text-2xl font-bold text-white text-center mb-6">
              Üdvözöljük, {localStorage.getItem("username")}!
            </h1>
            <div className="text-center">
            </div>
          </div>
        ) : isRegistering ? (
          <div className="p-8">
            <h1 className="text-2xl font-bold text-white text-center mb-6">
              Regisztráció
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Felhasználónév"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full p-4 pl-12 bg-transparent border border-white/20 text-white placeholder-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Image
                  src="/profile.png"
                  alt="profile"
                  width={20}
                  height={20}
                  className="absolute top-1/2 left-4 transform -translate-y-1/2"
                />
              </div>
              <div className="relative mb-6">
                <input
                  type="email"
                  placeholder="Emailcím"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-4 pl-12 bg-transparent border border-white/20 text-white placeholder-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Image
                  src="/email.png"
                  alt="email"
                  width={20}
                  height={20}
                  className="absolute top-1/2 left-4 transform -translate-y-1/2"
                />
              </div>
              <div className="relative mb-6">
                <input
                  type="password"
                  placeholder="Jelszó"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-4 pl-12 bg-transparent border border-white/20 text-white placeholder-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Image
                  src="/lock.png"
                  alt="lock"
                  width={20}
                  height={20}
                  className="absolute top-1/2 left-4 transform -translate-y-1/2"
                />
              </div>
              {errorMessage && (
                <p className="text-red-500 text-sm text-center mb-4">{errorMessage}</p>
              )}
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-full font-bold shadow-lg hover:bg-blue-600 transition"
              >
                Regisztráció
              </button>
            </form>
            <p className="text-sm text-center text-white mt-4">
              Már van fiókja?{" "}
              <button
                className="text-blue-500 hover:underline"
                onClick={toggleForm}
              >
                Belépés
              </button>
            </p>
          </div>
        ) : (
          <div className="p-8">
            <h1 className="text-2xl font-bold text-white text-center mb-6">
              Bejelentkezés
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Felhasználónév"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full p-4 pl-12 bg-transparent border border-white/20 text-white placeholder-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Image
                  src="/profile.png"
                  alt="profile"
                  width={20}
                  height={20}
                  className="absolute top-1/2 left-4 transform -translate-y-1/2"
                />
              </div>
              <div className="relative mb-6">
                <input
                  type="password"
                  placeholder="Jelszó"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-4 pl-12 bg-transparent border border-white/20 text-white placeholder-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Image
                  src="/lock.png"
                  alt="lock"
                  width={20}
                  height={20}
                  className="absolute top-1/2 left-4 transform -translate-y-1/2"
                />
              </div>
              <div className="flex justify-between text-sm text-white mb-6">
                <label>
                  <input
                    type="checkbox"
                    className="text-blue-500 focus:ring-blue-500"
                  />
                  Emlékezz rám!
                </label>
                <a href="#" className="hover:underline">
                  Elfelejtette jelszavát?
                </a>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-full font-bold shadow-lg hover:bg-blue-600 transition"
              >
                Bejelentkezés
              </button>
              <p className="text-sm text-center text-white mt-4">
                Nincs még fiókja?{" "}
                <button
                  className="text-blue-500 hover:underline"
                  onClick={toggleForm}
                >
                  Regisztráció
                </button>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Singin;
