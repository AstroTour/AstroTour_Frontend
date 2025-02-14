"use client";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const planets = [
  { name: "Mercury", image: "/image/mercury.png", thumbnail: "/image/mercury.png" },
  { name: "Venus", image: "/image/venus.png", thumbnail: "/image/venus.png" },
  { name: "Earth", image: "/image/earth.png", thumbnail: "/image/earth.png" },
  { name: "Mars", image: "/image/mars.png", thumbnail: "/image/mars.png" },
  { name: "Jupiter", image: "/image/jupiter.png", thumbnail: "/image/jupiter.png" },
  { name: "Saturn", image: "/image/saturnus.png", thumbnail: "/image/saturn.png" },
  { name: "Uranus", image: "/image/uranus.png", thumbnail: "/image/uranus.png" },
  { name: "Neptune", image: "/image/neptune.png", thumbnail: "/image/neptune.png" },
  { name: "Pluto", image: "/image/pluto.png", thumbnail: "/image/pluto.png" }
];

function Page() {
  const [selectedPlanet, setSelectedPlanet] = useState(planets[0]);
  const [showShip, setShowShip] = useState(false);

  // Görgetési animáció – hogy a bal oldal végiggördüljön
  const { scrollYProgress } = useScroll();
  const yTransform = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);

  useEffect(() => {
    const handleScroll = () => {
      const packagesSection = document.getElementById("packages");
      if (packagesSection) {
        const rect = packagesSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.5) {
          setShowShip(true);
        } else {
          setShowShip(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-transparent">
      {/* Bal oldali animált kártya – hozzáadva bg-black bg-opacity-40 */}
      <div className="md:w-1/2 flex items-center justify-center relative">
        <motion.div
          style={{ y: yTransform }}
          className="absolute top-20 bg-black bg-opacity-40 p-4 rounded-2xl shadow-lg"
        >
          <div className="relative w-[400px] h-[400px]">
            {showShip ? (
              // Űrhajó mód a csomagnál vált
              <motion.div
                key="spaceship"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full flex items-center justify-center"
              >
                <Image
                  src="/seats.png"
                  alt="Űrhajó"
                  width={500}
                  height={500}
                  objectFit="contain"
                  className="rounded-2xl"
                />
                <div className="absolute inset-0 flex items-center justify-between px-20">
                  <div className="bg-gray-800 bg-opacity-70 text-white text-sm px-2 py-1 rounded">
                    Bal Ülés
                  </div>
                  <div className="bg-gray-800 bg-opacity-70 text-white text-sm px-2 py-1 rounded">
                    Folyosó
                  </div>
                  <div className="bg-gray-800 bg-opacity-70 text-white text-sm px-2 py-1 rounded">
                    Jobb Ülés
                  </div>
                </div>
              </motion.div>
            ) : (
              // Bolygó mód
              <motion.div
                key={selectedPlanet.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full flex items-center justify-center relative"
              >
                <Image
                  src={selectedPlanet.image}
                  alt={selectedPlanet.name}
                  width={300}
                  height={300}
                  objectFit="contain"
                  className="rounded-2xl"
                />
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white text-sm px-3 py-1 rounded">
                  {selectedPlanet.name}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Jobb oldali tartalom – változatlan */}
      <div className="md:w-1/2 p-8 mt-20 space-y-32 bg-transparent">
        {/* Bolygó kiválasztása keret */}
        <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-2xl px-6 py-4 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-white">Bolygó kiválasztása</h2>
          <div className="grid grid-cols-3 gap-8">
            {planets.map((planet) => (
              <button
                key={planet.name}
                onClick={() => setSelectedPlanet(planet)}
                className={`border-2 rounded-full overflow-hidden w-20 h-20 ${
                  selectedPlanet.name === planet.name ? "border-blue-500" : "border-transparent"
                }`}
              >
                <Image
                  src={planet.thumbnail || planet.image}
                  alt={planet.name}
                  width={80}
                  height={80}
                  objectFit="cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Indulási idő szekció */}
        <section className="bg-black bg-opacity-40 backdrop-blur-md rounded-2xl px-8 py-6 shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-white">Indulási idő</h2>
          <select className="w-full p-4 bg-slate-100 rounded-lg">
            <option>2025-06-15 10:00</option>
            <option>2025-06-16 12:00</option>
            <option>2025-06-17 14:00</option>
          </select>
        </section>

        {/* Csomagok szekció */}
        <section id="packages" className="bg-black bg-opacity-40 backdrop-blur-md rounded-2xl px-8 py-6 shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-white">Csomagok</h2>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input type="radio" name="package" className="form-radio" />
              <span className="text-xl text-white">Alap</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="package" className="form-radio" />
              <span className="text-xl text-white">V.I.P</span>
            </label>
          </div>
        </section>

        {/* Ülőhelyek szekció */}
        <section className="bg-black bg-opacity-40 backdrop-blur-md rounded-2xl px-8 py-6 shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-white">Ülőhelyek</h2>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input type="radio" name="seat" className="form-radio" />
              <span className="text-xl text-white">Ablak mellett</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="seat" className="form-radio" />
              <span className="text-xl text-white">Folyosó mellett</span>
            </label>
          </div>
        </section>

        {/* Foglalás gomb */}
        <button className="w-full bg-blue-600 text-white py-4 rounded-lg shadow-lg text-xl">
          Foglalás
        </button>
      </div>
    </div>
  );
}

export default Page;
