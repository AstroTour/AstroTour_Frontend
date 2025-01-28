import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const useSinginLogic = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

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

      
        const loginResult = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (loginResult?.ok) {
          router.push("/"); 
        } else {
          setErrorMessage("Bejelentkezés sikertelen.");
        }
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

        const loginResult = await signIn("credentials", {
          redirect: false,
          email: data.email,
          password,
        });

        console.log(loginResult);

        if (loginResult?.ok) {
          router.push("/");
        } else {
          setErrorMessage("Bejelentkezés sikertelen.");
        }
      }
    } catch (error) {
      setErrorMessage("Hiba történt. Próbáld újra később!");
    }
  };

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
    handleSubmit,
    handleLogout,
  };
};
