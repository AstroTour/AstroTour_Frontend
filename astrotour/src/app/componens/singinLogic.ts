import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
 
export const useSinginLogic = () => {
  // Állapotok a bejelentkezési és regisztrációs adatok tárolására
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { data: session } = useSession(); // NextAuth session adatokat figyeli
  const router = useRouter();

  // Regisztráció és bejelentkezés közötti váltás
  const toggleForm = () => {
    setIsRegistering((prev) => !prev);
    setErrorMessage("");
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
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Érvénytelen bejelentkezési adatok.");
        return;
      }
      const data = await response.json();
      const loginResult = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password,
      });
      if (loginResult?.ok) {
        router.push("/");
        router.refresh(); // Session frissítés
      } else {
        setErrorMessage("Bejelentkezés sikertelen.");
      }
    } catch (error) {
      setErrorMessage("Hiba történt. Próbáld újra később!");
    }
  };

  // Regisztrációs folyamat
  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Regisztráció sikertelen.");
        return;
      }
      setIsRegistering(false);
      setErrorMessage("");
      await handleLogin(event); // Regisztráció után automatikus bejelentkezés
    } catch (error) {
      setErrorMessage("Hiba történt. Próbáld újra később!");
    }
  };

  // Kijelentkezés
  const handleLogout = () => {
    signOut();
    router.push("/");
  };

  return {
    session,
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
    handleLogout,
  };
};