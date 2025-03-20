"use client";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const useSinginLogic = () => {
  const { data: session } = useSession();
  const router = useRouter();

  // Állapotok a bejelentkezési és regisztrációs adatok tárolására
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState(""); // Csak regisztrációhoz
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Regisztráció és bejelentkezés közötti váltás
  const toggleForm = () => {
    setError("");
    setIsRegistering((prev) => !prev);
  };

  // Adatok validálása
  const validateForm = () => {
    if (!email || !email.includes("@")) {
      setError("Érvénytelen email cím.");
      return false;
    }
    if (password.length < 8) {
      setError("A jelszónak legalább 8 karakter hosszúnak kell lennie.");
      return false;
    }
    return true;
  };

  // Laravel Sanctum CSRF cookie lekérése
  const getCsrfToken = async () => {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`, {
    method: "GET",
    credentials: "include",
  });
};

  // Bejelentkezési folyamat NextAuth signIn segítségével
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    await getCsrfToken(); // CSRF token lekérése
  
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
  
      if (result?.status === 200 && result.ok) {
        router.push("/");
      } else if (result?.error) {
        setError(result.error);
      }
    } catch (error) {
      setError("Hiba történt a bejelentkezés során.");
    }
  };

  // Regisztrációs folyamat: API hívás a backend regisztrációs végpontjára, majd automatikus bejelentkezés
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    await getCsrfToken(); // CSRF token lekérése

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, email, password }),
      });

      if (res.status === 201) {
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (result?.status === 200 && result.ok) {
          router.push("/");
        } else if (result?.error) {
          setError(result.error);
        }
      } else {
        const data = await res.json();
        setError(data.message || "Ismeretlen hiba történt.");
      }
    } catch (err) {
      setError("Hiba történt a regisztráció során.");
    }
  };

  return {
    isRegistering,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    error,
    toggleForm,
    handleLogin,
    handleRegister,
    session,
  };
};
