import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Ha van tárolt téma, használjuk azt
    const savedMode = localStorage.getItem("theme");
    if (savedMode) {
      setIsDarkMode(savedMode === "dark");
    } else {
      setIsDarkMode(false); // Alapértelmezetten világos mód
    }
  }, []);

  useEffect(() => {
    // Alkalmazzuk a megfelelő osztályt a sötét/világos mód alapján
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="p-2 text-xl text-white bg-gray-800 rounded-full hover:bg-gray-600"
    >
      {/* Kép használata a sötét/világos mód váltáshoz */}
      {isDarkMode ? (
        <img
          src="/images/sun-icon.png"
          alt="Light Mode"
          className="w-8 h-8"
        />
      ) : (
        <img
          src="/images/moon-icon.png"
          alt="Dark Mode"
          className="w-8 h-8"
        />
      )}
    </button>
  );
};

export default ThemeToggle;
