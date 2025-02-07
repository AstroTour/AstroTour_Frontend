"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useSinginLogic } from "@/app/componens/singinLogic";
import { useRouter } from "next/navigation";

const Signin = () => {
  const {
    isRegistering,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    error,
    toggleForm,
    handleLogin,
    handleRegister,
    session,
  } = useSinginLogic();

  const router = useRouter();

  // useEffect-ben végezzük az átirányítást, ha session létezik
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);


  return (
    <div className="flex justify-center items-center m-5">
      <div className="relative w-96 bg-black bg-opacity-40 backdrop-blur-lg border border-white/20 rounded-lg shadow-lg overflow-hidden transition-all duration-300">
        {isRegistering ? (
          // Regisztrációs űrlap
          <div className="p-8">
            <h1 className="text-2xl font-bold text-white text-center mb-6">
              Regisztráció
            </h1>
            <form onSubmit={handleRegister}>
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
              {error && (
                <p className="text-red-500 text-sm text-center mb-4">
                  {error}
                </p>
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
                Bejelentkezés
              </button>
            </p>
          </div>
        ) : (
          // Bejelentkezési űrlap
          <div className="p-8">
            <h1 className="text-2xl font-bold text-white text-center mb-6">
              Bejelentkezés
            </h1>
            <form onSubmit={handleLogin}>
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
              {error && (
                <p className="text-red-500 text-sm text-center mb-4">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-full font-bold shadow-lg hover:bg-blue-600 transition"
              >
                Bejelentkezés
              </button>
            </form>
            <p className="text-sm text-center text-white mt-4">
              Nincs még fiókja?{" "}
              <button
                className="text-blue-500 hover:underline"
                onClick={toggleForm}
              >
                Regisztráció
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signin;
