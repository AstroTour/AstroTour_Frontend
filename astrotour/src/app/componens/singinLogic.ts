"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const useSinginLogic = () => {
  const router = useRouter();

  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleForm = () => {
    setError("");
    setIsRegistering((prev) => !prev);
  };

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

  const getCsrfToken = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`, {
      method: "GET",
      credentials: "include",
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // CSRF token szükséges!
      await getCsrfToken();

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (res.status === 200) {
        const data = await res.json();
        console.log("Sikeres login, user:", data.user);
        setIsAuthenticated(true);
        router.push("/");
      } else {
        const data = await res.json();
        setError(data.message || "Hibás bejelentkezés!");
      }
    } catch (err) {
      setError("Hiba történt a bejelentkezés során.");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    await getCsrfToken();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, email, password }),
      });

      if (res.status === 201) {
        // Automatikus login regisztráció után
        await handleLogin(e);
      } else {
        const data = await res.json();
        setError(data.message || "Hiba a regisztráció során.");
      }
    } catch (err) {
      setError("Hiba történt.");
    }
  };

  const checkAuth = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/client`, {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

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
    isAuthenticated,
  };
};
