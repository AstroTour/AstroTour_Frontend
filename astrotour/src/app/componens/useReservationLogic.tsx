"use client";

import { useState, useEffect } from "react";

export function useReservationLogic(selectedPlanetId: number, seatType: boolean, ticketType: string) {
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchSchedules() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schedules-for-planet?planet_id=${selectedPlanetId}`, {
          credentials: "include"
        });
        if (!response.ok) throw new Error("Nem sikerült betölteni az adatokat");
        const data = await response.json();
        setSchedules(data);
        setSelectedSchedule(data.length > 0 ? data[0].id : "");
      } catch (error) {
        console.error(error);
      }
    }
    fetchSchedules();
  }, [selectedPlanetId]);

  const handleReservation = async () => {
    if (!selectedSchedule) {
      setMessage("Kérlek válassz indulási időpontot a foglaláshoz!");
      return;
    }
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`, {
        credentials: "include",
      });
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reservation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          schedule_id: selectedSchedule,
          ticket_type: ticketType,
          seat: seatType
        })
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setMessage("Sikeres foglalás! 🚀");
      } else {
        setMessage(result.message || "Hiba történt a foglalás során!");
      }
    } catch (error) {
      setMessage("Hiba történt a foglalás során!");
    }
  };

  return {
    schedules,
    selectedSchedule,
    setSelectedSchedule,
    message,
    setMessage,
    handleReservation
  };
}
