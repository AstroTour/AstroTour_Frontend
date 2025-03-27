"use client";
import { useState, useEffect, useCallback } from "react";

export const useUserData = () => {
  const [user, setUser] = useState<{
    id: number;
    email: string;
    name: string;
    role?: string;
  } | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/client`, {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, fetchUser };
};
