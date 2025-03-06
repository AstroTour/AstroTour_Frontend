"use client";
import React, { useState, useEffect } from "react";

function Page() {
  // Eredeti adatok
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("********");
  const [profileImage, setProfileImage] = useState(null);

  // Modal állapotok
  const [isEmailEditing, setIsEmailEditing] = useState(false);
  const [isUsernameEditing, setIsUsernameEditing] = useState(false);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const [isProfileImageEditing, setIsProfileImageEditing] = useState(false);

  // Új értékek
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Hibák
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Statikus ikonok
  const defaultIcons = [
    "https://example.com/icons/icon1.png",
    "https://example.com/icons/icon2.png",
    "https://example.com/icons/icon3.png",
  ];

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("http://localhost:8000/api/profile");
        const data = await res.json();
        if (data.email) {
          setEmail(data.email);
          setNewEmail(data.email);
        }
        if (data.username) {
          setUsername(data.username);
          setNewUsername(data.username);
        }
        if (data.image) {
          setProfileImage(data.image);
        }
      } catch (error) {
        console.error("Hiba a profil betöltésekor:", error);
      }
    }
    fetchProfile();
  }, []);

  // Email módosítás validáció
  const handleEmailSave = () => {
    if (newEmail.trim() === "") {
      setEmailError("Az email nem lehet üres!");
      return;
    }
    if (!newEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailError("Helytelen e-mail formátum!");
      return;
    }
    setEmail(newEmail);
    setEmailError("");
    setIsEmailEditing(false);
  };

  // Felhasználónév módosítás validáció
  const handleUsernameSave = () => {
    if (newUsername.trim() === "") {
      setUsernameError("A felhasználónév nem lehet üres!");
      return;
    }
    setUsername(newUsername);
    setUsernameError("");
    setIsUsernameEditing(false);
  };

  // Jelszó módosítás validáció
  const handlePasswordSave = () => {
    if (newPassword.trim() === "" || confirmPassword.trim() === "") {
      setPasswordError("A jelszó nem lehet üres!");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("A jelszónak legalább 8 karakter hosszúnak kell lennie!");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("A jelszavak nem egyeznek!");
      return;
    }
    setPasswordError("");
    setIsPasswordEditing(false);
  };

  // Profilkép módosító modal megnyitása
  const handleProfileImageEdit = () => {
    console.log("Profilkép módosító modal megnyitása");
    setIsProfileImageEditing(true);
  };

  // Ikon kiválasztása
  const handleIconSelect = async (iconUrl) => {
    setProfileImage(iconUrl);
    setIsProfileImageEditing(false);

    const formData = new FormData();
    formData.append("image", iconUrl);

    try {
      const res = await fetch("http://localhost:8000/api/profile", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("Profilkép frissítve:", data);
    } catch (error) {
      console.error("Hiba a profilkép frissítésekor:", error);
    }
  };

  // Teljes profil frissítése
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newEmail.trim() === "" || newUsername.trim() === "") {
      alert("Az email és felhasználónév nem lehet üres!");
      return;
    }
    if (newPassword && (newPassword.length < 8 || newPassword !== confirmPassword)) {
      alert("A jelszónak legalább 8 karakternek kell lennie és a jelszavaknak egyezniük kell!");
      return;
    }

    const formData = new FormData();
    formData.append("email", newEmail);
    formData.append("username", newUsername);
    formData.append("password", newPassword || password);

    try {
      const res = await fetch("http://localhost:8000/api/profile", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("Profil frissítve:", data);
      setEmail(newEmail);
      setUsername(newUsername);
      setPassword(newPassword ? "********" : password);
    } catch (error) {
      console.error("Hiba a profil frissítésekor:", error);
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Bal oldali kártya: Nagy kép */}
        <div className="bg-white p-6 rounded shadow-md flex-1">
          <h3 className="text-xl font-bold mb-4">Profilkép</h3>
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profil"
              className="w-full h-auto rounded"
            />
          ) : (
            <div className="w-full h-64 bg-gray-300 flex items-center justify-center rounded">
              Nincs kép
            </div>
          )}
          <button
            type="button"
            onClick={handleProfileImageEdit}
            className="mt-4 text-blue-500"
          >
            Módosítás
          </button>
        </div>

        {/* Jobb oldali kártya: Profil adatok */}
        <div className="bg-black bg-opacity-60 p-6 rounded shadow-md flex-1">
          <h2 className="text-xl font-bold mb-4">Profil Frissítése</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Felhasználónév:</label>
            <div className="flex items-center mt-1">
              <span className="text-gray-900 mr-4">
                {username || "Nincs felhasználónév megadva"}
              </span>
              <button
                type="button"
                onClick={() => setIsUsernameEditing(true)}
                className="text-blue-500"
              >
                Módosítás
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <div className="flex items-center mt-1">
              <span className="text-gray-900 mr-4">
                {email || "Nincs email megadva"}
              </span>
              <button
                type="button"
                onClick={() => setIsEmailEditing(true)}
                className="text-blue-500"
              >
                Módosítás
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Jelszó:</label>
            <div className="flex items-center mt-1">
              <span className="text-gray-900 mr-4">********</span>
              <button
                type="button"
                onClick={() => setIsPasswordEditing(true)}
                className="text-blue-500"
              >
                Módosítás
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Mentés
            </button>
          </form>
        </div>
      </div>

      {/* Email módosító modal */}
      {isEmailEditing && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg min-w-[300px]">
            <h3 className="text-lg font-bold">Email módosítás</h3>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="border border-gray-300 p-2 w-full mt-2"
            />
            {emailError && (
              <p className="text-red-500 mt-2">{emailError}</p>
            )}
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsEmailEditing(false)}
                className="bg-red-500 text-white px-3 py-1 mr-2 rounded"
              >
                Mégse
              </button>
              <button
                onClick={handleEmailSave}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Felhasználónév módosító modal */}
      {isUsernameEditing && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg min-w-[300px]">
            <h3 className="text-lg font-bold">Felhasználónév módosítás</h3>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="border border-gray-300 p-2 w-full mt-2"
            />
            {usernameError && (
              <p className="text-red-500 mt-2">{usernameError}</p>
            )}
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsUsernameEditing(false)}
                className="bg-red-500 text-white px-3 py-1 mr-2 rounded"
              >
                Mégse
              </button>
              <button
                onClick={handleUsernameSave}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Jelszó módosító modal */}
      {isPasswordEditing && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg min-w-[300px]">
            <input
              type="password"
              placeholder="Új jelszó"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border border-gray-300 p-2 w-full"
            />
            <input
              type="password"
              placeholder="Új jelszó megerősítése"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-gray-300 p-2 w-full mt-2"
            />
            {passwordError && (
              <p className="text-red-500 mt-2">{passwordError}</p>
            )}
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsPasswordEditing(false)}
                className="bg-red-500 text-white px-3 py-1 mr-2 rounded"
              >
                Mégse
              </button>
              <button
                onClick={handlePasswordSave}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profilkép módosító modal (kétoszlopos elrendezéssel) */}
      {isProfileImageEditing && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg w-4/5 max-w-[600px]">
            <h3 className="text-lg font-bold">Profilkép módosítás</h3>
            <div className="flex mt-4">
              {/* Bal oldal: Jelenlegi kép */}
              <div className="flex-1 text-center pr-4 border-r border-gray-300">
                <p>Jelenlegi kép:</p>
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Jelenlegi profil"
                    width={100}
                    height={100}
                    className="rounded-full mx-auto"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto flex items-center justify-center">
                    Nincs kép
                  </div>
                )}
              </div>
              {/* Jobb oldal: Ikonok */}
              <div className="flex-1 text-center pl-4">
                <p>Válassz új ikont:</p>
                <div className="flex justify-center flex-wrap gap-2 mt-2">
                  {defaultIcons.map((icon, index) => (
                    <img
                      key={index}
                      src={icon}
                      alt={`Ikon ${index}`}
                      width={50}
                      height={50}
                      className="cursor-pointer border border-gray-300 rounded"
                      onClick={() => handleIconSelect(icon)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={() => setIsProfileImageEditing(false)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Mégse
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
