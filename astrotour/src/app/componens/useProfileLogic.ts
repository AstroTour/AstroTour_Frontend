"use client";
import { useState, useEffect } from "react";

export const useProfileLogic = () => {
  const [userData, setUserData] = useState<{ username: string; email: string } | null>(null);
  const [error, setError] = useState("");
  const [reservation, setReservation] = useState<any>(null);
  const [reservationError, setReservationError] = useState("");

  // CSRF token lekérése
  const getCsrfToken = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`, {
      method: "GET",
      credentials: "include",
    });
  };

  // Felhasználói profil lekérése
  const fetchUserProfile = async () => {
    try {
      await getCsrfToken();

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/datainsert`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        setError("Nem vagy bejelentkezve!");
        return;
      }

      const data = await res.json();
      setUserData(data);
    } catch (err) {
      setError("Hiba történt a profil adat lekérésekor!");
    }
  };

  // Profil mező frissítése
  const updateProfile = async (field: string, value: string) => {
    try {
      await getCsrfToken();

      const formData = new FormData();
      formData.append(field, value);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/update`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        setError("Nem sikerült frissíteni!");
        return;
      }

      await fetchUserProfile();

    } catch (err) {
      setError("Frissítési hiba!");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Foglalás adatainak lekérése
  const fetchReservation = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`, {
        credentials: "include",
      });
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reservationData`, {
        credentials: "include",
      });
  
      if (!res.ok) {
        setReservation(null);
        return;
      }
  
      const data = await res.json();
      setReservation(data);
    } catch (err) {
      setReservationError("Nem sikerült lekérni a foglalást.");
    }
  };
  
  useEffect(() => {
    fetchReservation();
  }, []);

  // Foglalás törlése
  const handleDeleteReservation = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`, {
        credentials: "include",
      });
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reservationDelete`, {
        method: "POST",
        credentials: "include",
      });
  
      if (!res.ok) {
        alert("Nem sikerült törölni a foglalást!");
        return;
      }
  
      alert("Foglalás sikeresen törölve!");
      setReservation(null);
    } catch (err) {
      alert("Hiba történt törlés közben.");
    }
  };

  return {
    userData,
    error,
    fetchUserProfile,
    updateProfile,
    reservation,
    handleDeleteReservation
  };
};
