"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useReservationLogic } from "../componens/useReservationLogic";

const planets = [
  { id: 1, name: "Merkúr", image: "/image/mercury.png", thumbnail: "/image/mercury.png", price: 10000000},
  { id: 2, name: "Vénus", image: "/image/venus.png", thumbnail: "/image/venus.png", price: 8000000},
  { id: 3, name: "Föld", image: "/image/earth.png", thumbnail: "/image/earth.png", price: 0},
  { id: 4, name: "Mars", image: "/image/mars.png", thumbnail: "/image/mars.png", price: 13000000},
  { id: 5, name: "Jupiter", image: "/image/jupiter.png", thumbnail: "/image/jupiter.png", price: 20000000},
  { id: 6, name: "Szaturnusz", image: "/image/saturnus.png", thumbnail: "/image/saturnus.png", price: 50000000},
  { id: 7, name: "Uránusz", image: "/image/uranus.png", thumbnail: "/image/uranus.png", price: 100000000},
  { id: 8, name: "Neptunusz", image: "/image/neptune.png", thumbnail: "/image/neptune.png", price: 200000000},
  { id: 9, name: "Plútó", image: "/image/pluto.png", thumbnail: "/image/pluto.png", price: 300000000}
];

function Page() {
  const [selectedPlanet, setSelectedPlanet] = useState(planets[0]);
  const [ticketType, setTicketType] = useState("Basic");
  const [seatType, setSeatType] = useState(false);
  const [showShip, setShowShip] = useState(false);
  const vipExtraFee = 5000000;
  const ablakExtraFee = 2000000;
  const [showDetails, setShowDetails] = useState(false);
  const totalPrice =
  selectedPlanet.price +
  (ticketType === "VIP" ? vipExtraFee : 0) +
  (seatType === true ? ablakExtraFee : 0);

  const {
    schedules,
    selectedSchedule,
    setSelectedSchedule,
    message,
    setMessage,
    handleReservation
  } = useReservationLogic(selectedPlanet.id, seatType, ticketType, totalPrice);

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
                  className={`border-2 rounded-xl p-2 text-white text-center flex flex-col items-center justify-center ${
                    selectedPlanet.name === planet.name ? "border-blue-500" : "border-transparent"}`}>
                  <Image
                    src={planet.thumbnail || planet.image}
                    alt={planet.name}
                    width={60}
                    height={60}
                    objectFit="cover"
                  />
                  <div className="text-sm mt-2">{planet.name}</div>
                  <div className="text-sm text-gray-300 font-bold mb-1">
                    {planet.price.toLocaleString()} Ft
                  </div>
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
            <h2 className="text-3xl mb-6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-white">
              Csomagok
            </h2>
            
            {/* Csomagok + részletek */}
            <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
              
              {/* Alap csomag */}
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="package"
                  className="form-radio"
                  value="Basic"
                  onChange={(e) => setTicketType(e.target.value)}
                  checked={ticketType === "Basic"}
                />
                <span className="text-xl text-white">Alap</span>
              </label>

              {/* VIP csomag */}
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="package"
                  className="form-radio"
                  value="VIP"
                  onChange={(e) => setTicketType(e.target.value)}
                  checked={ticketType === "VIP"}
                />
                <span className="text-xl text-white">
                  V.I.P{" "}
                  <span className="text-sm text-green-400">
                    +{vipExtraFee.toLocaleString()} Ft
                  </span>
                </span>
              </label>

              {/* Részletek gomb */}
              <button
                onClick={() => setShowDetails(true)}
                className="text-sm text-blue-400 hover:underline ml-auto"
              >
                Részletek
              </button>
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
                  onChange={() => setSeatType(false)}
                  checked={seatType === false}
                />
                <span className="text-xl text-white">Folyosó mellett</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="seat"
                  className="form-radio"
                  onChange={() => setSeatType(true)}
                  checked={seatType === true}/>
                <span className="text-xl text-white">
                  Ablak mellett{" "}
                  <span className="text-sm text-green-400">
                    +{ablakExtraFee.toLocaleString()} Ft
                  </span>
                </span>
              </label>
            </div>
          </section>

          <section className="bg-black bg-opacity-60 backdrop-blur-md rounded-2xl px-8 py-4 shadow-lg text-white text-xl">
            <div className="flex justify-between">
              <span>Végösszeg:</span>
              <span className="font-bold text-green-400">{totalPrice.toLocaleString()} Ft</span>
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

      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-black/90 text-white p-8 rounded-2xl shadow-lg w-[90%] md:w-[800px] relative">
            <h2 className="text-2xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Jegyek Részletezése
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
              {/* BAL oldal - BASIC */}
              <div className="flex-1 space-y-2">
                <h3 className="text-xl font-semibold text-blue-400">Basic</h3>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Poggyász: 2 poggyász</li>
                  <li>Ellátás: korlátolt fogyasztás + önköltség (étel, ital)</li>
                  <li>Szórakoztatás: saját eszköz, Űr túrai érdekességek elérhetősége</li>
                  <li>Beszállás: Utolsó csoportok egyike</li>
                </ul>
              </div>

              {/* Függőleges elválasztó */}
              <div className="w-px bg-gray-600 hidden md:block" />

              {/* JOBB oldal - VIP */}
              <div className="flex-1 space-y-2">
                <h3 className="text-xl font-semibold text-yellow-400">VIP</h3>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Poggyász: 4 poggyász</li>
                  <li>Ellátás: korlátlan fogyasztás (étel, ital)</li>
                  <li>Szórakoztatás: biztosított eszköz, Űr túrai érdekességek elérhetősége</li>
                  <li>Beszállás: Elsőként történő beszállás</li>
                  <li>Ülés: Ülő párna a kényelmesebb utazási élményért</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setShowDetails(false)}
              className="absolute top-4 right-4 text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-3xl text-sm"
            >
              Bezárás
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Page;
