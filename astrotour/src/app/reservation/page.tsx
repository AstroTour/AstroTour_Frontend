"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useReservationLogic } from "../componens/useReservationLogic";

const planets = [
  { id: 1, name: "Merkúr", image: "/image/mercury.png", thumbnail: "/image/mercury.png" },
  { id: 2, name: "Vénus", image: "/image/venus.png", thumbnail: "/image/venus.png" },
  { id: 3, name: "Föld", image: "/image/earth.png", thumbnail: "/image/earth.png" },
  { id: 4, name: "Mars", image: "/image/mars.png", thumbnail: "/image/mars.png" },
  { id: 5, name: "Jupiter", image: "/image/jupiter.png", thumbnail: "/image/jupiter.png" },
  { id: 6, name: "Szaturnusz", image: "/image/saturnus.png", thumbnail: "/image/saturnus.png" },
  { id: 7, name: "Uránusz", image: "/image/uranus.png", thumbnail: "/image/uranus.png" },
  { id: 8, name: "Neptunusz", image: "/image/neptune.png", thumbnail: "/image/neptune.png" },
  { id: 9, name: "Plútó", image: "/image/pluto.png", thumbnail: "/image/pluto.png" }
];

function Page() {
  const [selectedPlanet, setSelectedPlanet] = useState(planets[0]);
  const [ticketType, setTicketType] = useState("Alap");
  const [seatType, setSeatType] = useState(false);
  const [showShip, setShowShip] = useState(false);

  const {
    schedules,
    selectedSchedule,
    setSelectedSchedule,
    message,
    setMessage,
    handleReservation
  } = useReservationLogic(selectedPlanet.id, seatType, ticketType);

  const { scrollYProgress } = useScroll();
  const yTransform = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);

  useEffect(() => {
    const handleScroll = () => {
      const packagesSection = document.getElementById("packages");
      if (packagesSection) {
        const rect = packagesSection.getBoundingClientRect();
        setShowShip(rect.top < window.innerHeight * 0.5);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <>
      <div className="flex min-h-screen flex-col md:flex-row bg-transparent">
        {/* Bal oldali animált kártya */}
        <div className="md:w-1/2 flex items-center justify-center relative">
          <motion.div
            style={{ y: yTransform }}
            className="absolute top-20 bg-black bg-opacity-30 p-4 rounded-2xl shadow-lg"
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
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white text-sm px-3 py-1 rounded">
                    {selectedPlanet.name}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Jobb oldali tartalom */}
        <div className="md:w-1/2 p-8 mt-20 space-y-32 bg-transparent">
          {/* Bolygó kiválasztása */}
          <div className="bg-black bg-opacity-60 backdrop-blur-md rounded-2xl px-6 py-4 shadow-lg">
            <h2 className="text-3xl mb-4 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-white to-white">Bolygó kiválasztása</h2>
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
          <section className="bg-black bg-opacity-60 backdrop-blur-md rounded-2xl px-8 py-6 shadow-lg">
            <h2 className="text-3xl mb-6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-600 to-blue-600">Indulási idő</h2>
            <select
              className="w-full p-4 bg-black/70 rounded-3xl text-white"
              value={selectedSchedule}
              onChange={(e) => setSelectedSchedule(e.target.value)}
            >
              {schedules.length > 0 ? schedules.map((schedule) => (
                <option key={schedule.id} value={schedule.id}>
                  {schedule.departure_time}
                </option>
              )) : (
                <option value="">Nincsenek elérhető indulások!</option>
              )}
            </select>
          </section>

          {/* Csomagok szekció */}
          <section id="packages" className="bg-black bg-opacity-60 backdrop-blur-md rounded-2xl px-8 py-6 shadow-lg">
            <h2 className="text-3xl mb-6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-white">Csomagok</h2>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="package"
                  className="form-radio"
                  value="Alap"
                  onChange={(e) => setTicketType(e.target.value)}
                  checked={ticketType === "Alap"}
                />
                <span className="text-xl text-white">Alap</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="package"
                  className="form-radio"
                  value="V.I.P"
                  onChange={(e) => setTicketType(e.target.value)}
                  checked={ticketType === "V.I.P"}
                />
                <span className="text-xl text-white">V.I.P</span>
              </label>
            </div>
          </section>


          {/* Ülőhelyek szekció */}
          <section className="bg-black bg-opacity-60 backdrop-blur-md rounded-2xl px-8 py-6 shadow-lg">
            <h2 className="text-3xl mb-6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-blue-600 to-white">Ülőhelyek</h2>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="seat"
                  className="form-radio"
                  onChange={() => setSeatType(true)}
                  checked={seatType === true}
                />
                <span className="text-xl text-white">Ablak mellett</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="seat"
                  className="form-radio"
                  onChange={() => setSeatType(false)}
                  checked={seatType === false}
                />
                <span className="text-xl text-white">Folyosó mellett</span>
              </label>
            </div>
          </section>

          {/* Foglalás gomb */}
          <button className="w-full bg-blue-600 text-white py-4 rounded-3xl shadow-lg text-xl" onClick={handleReservation}>
            Foglalás
          </button>
        </div>
      </div>

      {/* Teljes képernyős modal az üzenettel */}
      {message && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-black/80 p-8 rounded-2xl shadow-lg text-center">
            <p className="text-xl text-white">{message}</p>
            <button className="mt-4 px-4 py-2 bg-purple-700 text-white rounded-3xl" onClick={() => setMessage("")}>
              Bezár
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Page;
