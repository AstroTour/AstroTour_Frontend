"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "./UserContext";

export const useSinginLogic = () => {
  const router = useRouter();
  const { fetchUser } = useUserContext();

  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState(""); // üzenet (pl kijelentkezés után)

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

  // LOGIN
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await getCsrfToken();

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
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
        console.log("Sikeres login:", data.user);
        setIsAuthenticated(true);
        setMessage("");
        router.push("/");
      } else {
        const data = await res.json();
        setError(data.message || "Hibás bejelentkezés!");
      }
    } catch (err) {
      setError("Hiba történt a bejelentkezés során.");
    }
  };

  // REGISZTRÁCIÓ
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    await getCsrfToken();
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username,
          email,
          password,
          password_confirmation: password,
        }),
      });
  
      const data = await res.json();
  
      if (res.status === 201) {
        // automatikus bejelentkezés
        const loginRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        });
  
        if (loginRes.ok) {
          await fetchUser();
          setIsAuthenticated(true);
          setMessage("");
          router.push("/");
        } else {
          const loginData = await loginRes.json();
          setError(loginData.message || "Sikeres regisztráció, de hibás belépés.");
        }
  
      }
  
    } catch (err) {
      console.error("Hálózati vagy ismeretlen hiba:", err);
      setError("Hiba történt.");
    }
  };
  

  // AUTH CHECK
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

  // KIJELENTKEZÉS
  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`, {
        method: "POST",
        credentials: "include",
      });
      setIsAuthenticated(false);
      setMessage("Sikeresen kijelentkeztél!");
      router.push("/");

      // Üzenet eltüntetése pl. 2 mp után:
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      console.error("Hiba a kijelentkezés során:", err);
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
    message,
    toggleForm,
    handleLogin,
    handleRegister,
    handleLogout,
    isAuthenticated,
  };
};
