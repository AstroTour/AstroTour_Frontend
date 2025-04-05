'use client';
import React, { useEffect, useState } from 'react';
import PlanetCardsMobile from '../componens/PlanetCardsMobile';
import SolarSystemDesktop from '../componens/SolarSystemDesktop';

// Alapértelmezett bolygó adatok
const defaultPlanets = [
  { id: 1, name: "Merkúr", thumbnail: "/image/mercury.png", information: "Merkúr információ..." },
  { id: 2, name: "Vénusz", thumbnail: "/image/venus.png", information: "Vénusz információ..." },
  { id: 3, name: "Föld", thumbnail: "/image/earth.png", information: "Föld információ..." },
  { id: 4, name: "Mars", thumbnail: "/image/mars.png", information: "Mars információ..." },
  { id: 5, name: "Jupiter", thumbnail: "/image/jupiter.png", information: "Jupiter információ..." },
  { id: 6, name: "Szaturnusz", thumbnail: "/image/saturn.png", information: "Szaturnusz információ..." },
  { id: 7, name: "Uránusz", thumbnail: "/image/uranus.png", information: "Uránusz információ..." },
  { id: 8, name: "Neptunusz", thumbnail: "/image/neptune.png", information: "Neptunusz információ..." },
  { id: 9, name: "Plutó", thumbnail: "/image/pluto.png", information: "Plutó információ..." },
];

const Page = () => {
  const [planets, setPlanets] = useState(defaultPlanets);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/planet')
      .then((res) => {
        if (!res.ok) throw new Error('Hiba a bolygók lekérdezésénél');
        return res.json();
      })
      .then((data) => {
        setPlanets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-10">Betöltés...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">Hiba: {error}</div>;

  return (
    <>
      <SolarSystemDesktop planets={planets} />
      <PlanetCardsMobile planets={planets} />
    </>
  );
};

export default Page;
