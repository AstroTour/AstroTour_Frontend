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
        const res = await fetch("http://devsite.monvoie.com/api/profile");
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
      const res = await fetch("http://devsite.monvoie.com/api/profile", {
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
      const res = await fetch("http://devsite.monvoie.com/api/profile", {
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

  // Egyszerű inline stílusok a modalhoz
  const modalStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  };

  const modalContentStyle = {
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    minWidth: "300px",
  };

  return (
    <div>
      <h2 className="text-white">Profil Frissítése</h2>

      {/* Profilkép rész */}
      <div className="flex items-center space-x-4">
        <div className="flex flex-col items-center">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profil"
              width={100}
              height={100}
              className="rounded-full"
            />
          ) : (
            <div
              style={{
                width: "96px",
                height: "96px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ccc",
                borderRadius: "50%",
              }}
            >
              Nincs kép
            </div>
          )}
          <button
            type="button"
            className="text-blue-500 mt-2"
            onClick={handleProfileImageEdit}
          >
            Módosítás
          </button>
        </div>
      </div>

      {/* Felhasználónév rész */}
      <div className="mt-4">
        <label className="text-white">Felhasználónév: </label>
        <span className="text-white ml-2">{username || "Nincs felhasználónév megadva"}</span>
        <button
          type="button"
          className="text-blue-500 ml-2"
          onClick={() => setIsUsernameEditing(true)}
        >
          Módosítás
        </button>
      </div>

      {/* Email rész */}
      <div className="mt-4">
        <label className="text-white">Email: </label>
        <span className="text-white ml-2">{email || "Nincs email megadva"}</span>
        <button
          type="button"
          className="text-blue-500 ml-2"
          onClick={() => setIsEmailEditing(true)}
        >
          Módosítás
        </button>
      </div>

      {/* Jelszó rész */}
      <div className="mt-4">
        <label className="text-white">Jelszó: </label>
        <span className="text-white ml-2"> ******** </span>
        <button
          type="button"
          className="text-blue-500 ml-2"
          onClick={() => setIsPasswordEditing(true)}
        >
          Módosítás
        </button>
      </div>

      {/* Email módosító modal */}
      {isEmailEditing && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h3>Email módosítás</h3>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              style={{ border: "1px solid #ccc", padding: "8px", width: "100%", marginTop: "8px" }}
            />
            {emailError && <p style={{ color: "red" }}>{emailError}</p>}
            <div style={{ marginTop: "16px", display: "flex", justifyContent: "flex-end" }}>
              <button onClick={() => setIsEmailEditing(false)} style={{ background: "red", color: "white", padding: "8px", marginRight: "8px" }}>
                Mégse
              </button>
              <button onClick={handleEmailSave} style={{ background: "blue", color: "white", padding: "8px" }}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Felhasználónév módosító modal */}
      {isUsernameEditing && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h3>Felhasználónév módosítás</h3>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              style={{ border: "1px solid #ccc", padding: "8px", width: "100%", marginTop: "8px" }}
            />
            {usernameError && <p style={{ color: "red" }}>{usernameError}</p>}
            <div style={{ marginTop: "16px", display: "flex", justifyContent: "flex-end" }}>
              <button onClick={() => setIsUsernameEditing(false)} style={{ background: "red", color: "white", padding: "8px", marginRight: "8px" }}>
                Mégse
              </button>
              <button onClick={handleUsernameSave} style={{ background: "blue", color: "white", padding: "8px" }}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Jelszó módosító modal */}
      {isPasswordEditing && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <input
              type="password"
              placeholder="Új jelszó"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{ border: "1px solid #ccc", padding: "8px", width: "100%" }}
            />
            <input
              type="password"
              placeholder="Új jelszó megerősítése"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ border: "1px solid #ccc", padding: "8px", width: "100%", marginTop: "8px" }}
            />
            {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
            <div style={{ marginTop: "16px", display: "flex", justifyContent: "flex-end" }}>
              <button onClick={() => setIsPasswordEditing(false)} style={{ background: "red", color: "white", padding: "8px", marginRight: "8px" }}>
                Mégse
              </button>
              <button onClick={handlePasswordSave} style={{ background: "blue", color: "white", padding: "8px" }}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profilkép módosító modal (kétoszlopos elrendezéssel) */}
      {isProfileImageEditing && (
        <div style={modalStyle}>
          <div style={{ ...modalContentStyle, width: "80%", maxWidth: "600px" }}>
            <h3>Profilkép módosítás</h3>
            <div style={{ display: "flex", marginTop: "16px" }}>
              {/* Bal oldal: jelenlegi kép */}
              <div style={{ flex: 1, textAlign: "center", paddingRight: "8px", borderRight: "1px solid #ccc" }}>
                <p>Jelenlegi kép:</p>
                {profileImage ? (
                  <img src={profileImage} alt="Jelenlegi profil" width={100} height={100} style={{ borderRadius: "50%" }} />
                ) : (
                  <div style={{ width: "96px", height: "96px", margin: "0 auto", backgroundColor: "#ccc", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    Nincs kép
                  </div>
                )}
              </div>
              {/* Jobb oldal: ikonok */}
              <div style={{ flex: 1, textAlign: "center", paddingLeft: "8px" }}>
                <p>Válassz új ikont:</p>
                <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
                  {defaultIcons.map((icon, index) => (
                    <img
                      key={index}
                      src={icon}
                      alt={`Ikon ${index}`}
                      width={50}
                      height={50}
                      style={{ cursor: "pointer", border: "1px solid #ccc", borderRadius: "4px" }}
                      onClick={() => handleIconSelect(icon)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div style={{ marginTop: "16px", textAlign: "right" }}>
              <button onClick={() => setIsProfileImageEditing(false)} style={{ background: "red", color: "white", padding: "8px" }}>
                Mégse
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Végső mentés gomb */}
      <form onSubmit={handleSubmit} className="mt-4">
        <button className="text-white mt-4" type="submit">
          Mentés
        </button>
      </form>
    </div>
  );
}

export default Page;
