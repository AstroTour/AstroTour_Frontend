"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export const useProfileLogic = () => {
  const { data: session, status } = useSession(); // FONTOS: status kell!
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);
  const [error, setError] = useState("");

  const getCsrfToken = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`, {
      method: "GET",
      credentials: "include",
    });
  };

  const fetchUserProfile = async () => {
    try {
      await getCsrfToken();

      if (!session?.user?.accessToken) {
        setError("Nincs token! Jelentkezz be újra.");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/datainsert`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${session.user.accessToken}`, // <<< Megvan
        },
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

  const updateProfile = async (field, value) => {
    try {
      const formData = new FormData();
      formData.append(field, value);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/update`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${session.user.accessToken}`,
        },
        body: formData,
      });

      if (!res.ok) {
        setError("Nem sikerült frissíteni!");
        return;
      }

      await fetchUserProfile(); // újratöltés

    } catch (err) {
      setError("Frissítési hiba!");
    }
  };

  useEffect(() => {
    // FONTOS: csak akkor fusson le, ha session ready!
    if (status === "authenticated") {
      fetchUserProfile();
    }
  }, [status, session]); // figyelje a session változást!

  return { userData, error, session, fetchUserProfile };
};
