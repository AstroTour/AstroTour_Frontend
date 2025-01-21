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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (isRegistering) {
      try {
        const res = await fetch("http://devsite.monvoie.com/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        });

        if (!res.ok) {
          setErrorMessage("Regisztráció sikertelen.");
          return;
        }

        setIsRegistering(false);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage("Hiba történt a regisztráció során.");
      }
    } else {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (!result?.ok) {
        setErrorMessage("Érvénytelen bejelentkezési adatok.");
      }
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
