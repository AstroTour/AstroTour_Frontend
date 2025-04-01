"use client";
import React, { useEffect, useState } from "react";

const FlightTables = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lekéri az összes járatot
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/schedule");
        if (!response.ok) {
          throw new Error("Hiba történt az adatok betöltésekor.");
        }
        const data = await response.json();
        setFlights(data);
      } catch (error) {
        console.error("Hiba történt az API lekérésekor:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  // Betöltés
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-auto">
        <div className="w-30 h-30 animate-spin">
          🚀
        </div>
        <p className="text-lg font-semibold mt-4 text-white">Betöltés...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-10">Hiba történt: {error}</div>
    );
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl text-center mb-6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-600 to-purple-600">Járatok</h1>

      <div className="space-y-4">
        {flights.map((flight, index) => (
          <div key={index} className="bg-black/70 text-white p-4 rounded-lg shadow-md border border-white/20">
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold">🚀 {flight.flight_number}</p>
              <span className="text-sm px-3 py-1 rounded-lg bg-blue-500">
                {flight["port"] ?? "Ismeretlen"} - {flight["planet"] ?? "Ismeretlen"}
              </span>
            </div>
            <div className="mt-2 border-t border-white/20 pt-2">
              <p>Indulás: <span className="font-semibold">{flight.departure_time}</span></p>
              <p>Érkezés: <span className="font-semibold">{flight.arrival_time}</span></p>
              <p>Visszaindul: <span className="font-semibold">{flight.goes_back}</span></p>
              <p>Visszaérkezik: <span className="font-semibold">{flight.comes_back}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightTables;
