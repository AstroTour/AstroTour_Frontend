"use client";
import { useState, useEffect } from "react";

export const useProfileLogic = () => {
  const [userData, setUserData] = useState<{ username: string; email: string } | null>(null);
  const [error, setError] = useState("");

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

  return { userData, error, fetchUserProfile, updateProfile };
};
