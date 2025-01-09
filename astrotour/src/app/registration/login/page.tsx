"use client";

import { useState } from "react";
import Image from "next/image";

const Singin = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const toggleForm = () => {
    setIsRegistering((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center m-5">
      <div className="relative w-96 bg-white bg-opacity-10 backdrop-blur-lg border border-white/20 rounded-lg shadow-lg overflow-hidden transition-all duration-300">
        {isRegistering ? (
          <div className="p-8">
            {/* Registration Form */}
            <h1 className="text-2xl font-bold text-white text-center mb-6">
              Registration
            </h1>
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Username"
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
                placeholder="Email"
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
                placeholder="Password"
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
            <div className="flex items-center text-sm text-white mb-6">
              <label>
                <input
                  type="checkbox"
                  className="text-blue-500 focus:ring-blue-500 mr-2"
                />
                I agree to the terms & conditions
              </label>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-full font-bold shadow-lg hover:bg-blue-600 transition"
            >
              Register
            </button>
            <p className="text-sm text-center text-white mt-4">
              Already have an account?{" "}
              <a
                href="#"
                className="text-blue-500 hover:underline"
                onClick={toggleForm}
              >
                Login
              </a>
            </p>
          </div>
        ) : (
          <div className="p-8">
            {/* Login Form */}
            <h1 className="text-2xl font-bold text-white text-center mb-6">Login</h1>
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Username"
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
                placeholder="Password"
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
                Remember me
              </label>
              <a href="#" className="hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-full font-bold shadow-lg hover:bg-blue-600 transition"
            >
              Login
            </button>
            <p className="text-sm text-center text-white mt-4">
              Don&apos;t have an account?{" "}
              <a
                href="#"
                className="text-blue-500 hover:underline"
                onClick={toggleForm}
              >
                Register
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Singin;
