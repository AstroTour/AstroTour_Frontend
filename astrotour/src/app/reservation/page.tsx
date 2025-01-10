import React from 'react';
import Image from 'next/image';

function page() {
  const planets = [
    "mercury",
    "venus",
    "earth",
    "mars",
    "jupiter",
    "saturn",
    "uranus",
    "neptune",
    "pluto", // Ha szeretnéd a törpebolygót is hozzáadni
  ];

  return (
    <div className="flex justify-center items-center min-h-screen m-5">
      <div className="w-full max-w-md backdrop-blur-sm bg-black bg-opacity-40 p-6 rounded-lg shadow-lg border border-gray-300">
        <h1 className="text-2xl font-bold text-center mb-6 text-white">Foglalás</h1>

        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Vezetéknév"
            className="w-1/2 p-2 border bg-black bg-opacity-20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
          />
          <input
            type="text"
            placeholder="Keresztnév"
            className="w-1/2 p-2 border bg-black bg-opacity-20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
          />
        </div>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email cím"
            className="w-full p-2 border bg-black bg-opacity-20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <h2 className="text-lg font-medium text-center mb-4 text-white">Bolygó kiválasztása</h2>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {planets.map((planet) => (
            <label
              key={planet}
              className="flex flex-col items-center cursor-pointer"
            >
              <input
                type="radio"
                name="planet"
                value={planet}
                className="hidden"
              />
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300 hover:border-blue-500 transition">
                <Image
                  src={`/image/${planet}.png`}
                  alt={planet}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <span className="mt-2 text-sm font-medium text-white">{planet}</span>
            </label>
          ))}
        </div>
        
        <div className="mb-6 text-white">
          <input
            type="text"
            placeholder="Hónap.nap-Óra:perc (Megadott Idő)"
            className="w-full p-2 border bg-black bg-opacity-40 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <h2 className="text-lg font-medium text-center mb-4 text-white">Csomagok</h2>
        <div className="flex justify-between mb-6">
          <label className="flex items-center text-white">
            <input
              type="radio"
              name="package"
              value="basic"
              className="mr-2"
            />
            Basic
          </label>
          <label className="flex items-center text-white">
            <input
              type="radio"
              name="package"
              value="vip"
              className="mr-2"
            />
            V.I.P
          </label>
        </div>

        <h2 className="text-lg font-medium text-center mb-4 text-white">Ülőhelyek</h2>
        <div className="flex justify-between mb-6">
          <label className="flex items-center text-white">
            <input
              type="radio"
              name="seat"
              value="window"
              className="mr-2"
            />
            Ablak melletti
          </label>
          <label className="flex items-center text-white">
            <input
              type="radio"
              name="seat"
              value="aisle"
              className="mr-2"
            />
            Folyosó melletti
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-white via-blue-600 to-purple-600 text-white rounded-full font-bold hover:from-purple-600 hover:to-blue-600 transition"
        >
          Foglalás
        </button>
      </div>
    </div>
  );
}

export default page;
