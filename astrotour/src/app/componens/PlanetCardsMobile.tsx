'use client';
import React, { useState } from 'react';

const PlanetCardCarousel = ({ planets }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const goUp = () => {
    setExpanded(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : planets.length - 1));
  };

  const goDown = () => {
    setExpanded(false);
    setCurrentIndex((prev) => (prev < planets.length - 1 ? prev + 1 : 0));
  };

  const current = planets[currentIndex];
  const previous = planets[(currentIndex - 1 + planets.length) % planets.length];
  const next = planets[(currentIndex + 1) % planets.length];

  return (
    <div className="block lg:hidden flex flex-col items-center justify-start min-h-screen px-4 pt-2 pb-6 space-y-4">
      {/* Előző (halvány) kártya */}
      {!expanded && (
        <div className="w-full max-w-md scale-90 opacity-30 blur-sm pointer-events-none select-none transition duration-500 ease-in-out transform">
          <PlanetCard planet={previous} />
        </div>
      )}

      {/* Aktív (középső) kártya */}
      <div className="relative w-full max-w-md z-10 transition duration-500 ease-in-out transform scale-100">
        <PlanetCard planet={current} expanded={expanded} setExpanded={setExpanded} />

        {/* Nyilak */}
        {!expanded && (
          <>
            <div className="absolute top-1/2 -left-10 transform -translate-y-1/2">
              <button
                onClick={goUp}
                className="text-white text-2xl bg-white/10 backdrop-blur rounded-full px-2 py-1 hover:bg-white/20 transition hover:scale-110"
              >
                ↑
              </button>
            </div>
            <div className="absolute top-1/2 -right-10 transform -translate-y-1/2">
              <button
                onClick={goDown}
                className="text-white text-2xl bg-white/10 backdrop-blur rounded-full px-2 py-1 hover:bg-white/20 transition hover:scale-110"
              >
                ↓
              </button>
            </div>
          </>
        )}
      </div>

      {/* Következő (halvány) kártya */}
      {!expanded && (
        <div className="w-full max-w-md scale-90 opacity-30 blur-sm pointer-events-none select-none transition duration-500 ease-in-out transform">
          <PlanetCard planet={next} />
        </div>
      )}
    </div>
  );
};

const PlanetCard = ({ planet, expanded = false, setExpanded = () => {} }) => {
  const getImagePath = (planetName) => {
    const map = {
      'Merkúr': 'mercury',
      'Mercury': 'mercury',
      'Vénusz': 'venus',
      'Venus': 'venus',
      'Föld': 'earth',
      'Earth': 'earth',
      'Mars': 'mars',
      'Jupiter': 'jupiter',
      'Szaturnusz': 'saturnus',
      'Saturn': 'saturnus',
      'Uránusz': 'uranus',
      'Uranus': 'uranus',
      'Neptunusz': 'neptune',
      'Neptune': 'neptune',
      'Plutó': 'pluto',
      'Pluto': 'pluto',
    };
    const fileName = map[planetName];
    const path = fileName ? `/image/${fileName}.png` : null;
    if (!path) {
      console.warn('Hiányzó kép:', planetName);
    }
    return path;
  };

  const imagePath = getImagePath(planet.name);

  return (
    <div className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 transition-all duration-500 ease-in-out hover:shadow-2xl ${expanded ? 'scale-105' : ''}`}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          {imagePath && (
            <img
              src={imagePath}
              alt={planet.name}
              className="w-16 h-16 object-contain drop-shadow-md"
            />
          )}
          <h2 className="text-xl font-bold tracking-wide text-white">{planet.name}</h2>
        </div>
        <p className="text-gray-200 text-sm leading-snug">
          {expanded ? planet.information : (planet.information.length > 160 ? planet.information.slice(0, 160) + '...' : planet.information)}
        </p>
        {!expanded && (
          <button
            onClick={() => setExpanded(true)}
            className="text-sm text-indigo-300 underline hover:text-indigo-100 self-end"
          >
            Bővebben
          </button>
        )}
        {expanded && (
          <button
            onClick={() => setExpanded(false)}
            className="text-sm text-red-300 underline hover:text-red-100 self-end"
          >
            Bezárás
          </button>
        )}
      </div>
    </div>
  );
};

export default PlanetCardCarousel;
