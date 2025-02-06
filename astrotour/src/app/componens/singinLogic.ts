import { useState } from "react";
import { useRouter } from "next/navigation";

export const useSinginLogic = () => {
  // Állapotok a bejelentkezési és regisztrációs adatok tárolására
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  // Regisztráció és bejelentkezés közötti váltás
  const toggleForm = () => {
    setIsRegistering((prev) => !prev);
    setErrorMessage(""); // Üzenet törlése
  };

  // Adatok validálása
  const validateForm = () => {
    if (!email || !email.includes("@")) {
      setErrorMessage("Érvénytelen email cím.");
      return false;
    }
    if (password.length < 8) {
      setErrorMessage("A jelszónak legalább 8 karakter hosszúnak kell lennie.");
      return false;
    }
    return true;
  };

  // Bejelentkezési folyamat
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 200) {
      const data = await response.json();
      // Mentse el a felhasználót a localStorage-ba
      localStorage.setItem("username", email);
      localStorage.setItem("role", data.role);
      router.push("/");

      window.location.reload(); // 🔹 AZONNALI FRISSÍTÉS

      router.push("/");

    } else {
      const errorData = await response.json();
      if (errorData.message) {
        setErrorMessage(errorData.message); // Backend hibaüzenet megjelenítése
      }
    }
  };

  // Regisztrációs folyamat
  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.status === 201) {
      // Mentse el a felhasználót a localStorage-ba
      localStorage.setItem("username", email);
      router.push("/"); // Navigálás a főoldalra

      window.location.reload(); // AZONNALI FRISSÍTÉS

    } else {
      const errorData = await response.json();
      if (errorData.message) {
        setErrorMessage(errorData.message); // Backend hibaüzenet megjelenítése
      }
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
    errorMessage,
    toggleForm,
    handleLogin,
    handleRegister,
  };
};