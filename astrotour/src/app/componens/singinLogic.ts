import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export const useSinginLogic = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { data: session } = useSession();

  const toggleForm = () => {
    setIsRegistering((prev) => !prev);
    setErrorMessage("");
  };

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); 
    if (!validateForm()) {
      return;
    }

    try {
      if (isRegistering) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.message || "Regisztráció sikertelen.");
          return;
        }

        setIsRegistering(false);
        setErrorMessage("");
        alert("Sikeres regisztráció! Most már bejelentkezhetsz.");
      } else {
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.message || "Érvénytelen bejelentkezési adatok.");
          return;
        }

        const data = await response.json();

        
        signIn("credentials", {
          redirect: false,
          email: data.email,
          password,
        });
      }
    } catch (error) {
      setErrorMessage("Hiba történt. Próbáld újra később!");
    }
  };

  const handleLogout = () => {
    signOut();
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
    handleSubmit,
    handleLogout,
  };
};
