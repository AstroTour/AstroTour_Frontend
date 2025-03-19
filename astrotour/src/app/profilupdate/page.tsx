"use client";
import React, { useState } from "react";
import { useProfileLogic } from "../componens/useProfileLogic";
import Modal from "../componens/Modal";
import Image from "next/image";

export default function ProfilPage() {
  const { userData, error, session, fetchUserProfile } = useProfileLogic();

  const [editField, setEditField] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pendingData, setPendingData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [changed, setChanged] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // ÚJ!

  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-24 h-24 animate-spin">
          <Image
            src="/rocket.png"
            alt="load"
            width={50}
            height={50}
            className="object-contain"
          />
        </div>
        <p className="text-lg font-semibold mt-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-white">
          Betöltés...
        </p>
      </div>
    );
  }

  const handleModalSave = () => {
    if (editField === "password") {
      if (inputValue.length < 8 || inputValue !== confirmPassword) {
        alert("Hibás jelszó!");
        return;
      }
      setPendingData({ ...pendingData, password: inputValue });
    } else if (editField === "email") {
      setPendingData({ ...pendingData, email: inputValue });
    } else if (editField === "username") {
      setPendingData({ ...pendingData, username: inputValue });
    }
    setChanged(true);
    setEditField(null);
    setInputValue("");
    setConfirmPassword("");
  };

  const handleFinalSave = async () => {
    try {
      const formData = new FormData();
      if (pendingData.username) formData.append("username", pendingData.username);
      if (pendingData.email) formData.append("email", pendingData.email);
      if (pendingData.password) formData.append("password", pendingData.password);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/update`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${session.user.accessToken}`,
        },
        body: formData,
      });

      if (!res.ok) {
        alert("Hiba a mentésnél!");
        return;
      }

      await fetchUserProfile();
      setPendingData({ username: "", email: "", password: "" });
      setChanged(false);
      setShowSuccessModal(true); // Sikeres modal megnyitása!
    } catch (err) {
      alert("Mentési hiba!");
    }
  };

  return (
    <div className="min-h-screen p-6 flex flex-col md:flex-row gap-6 text-white">
      {/* BAL OLDALI KÁRTYA */}
      <div className="bg-black bg-opacity-70 p-6 rounded-3xl shadow-md flex-1 flex flex-col items-center justify-center">
        <h3 className="text-xl mb-4">Profilkép</h3>
        <img
          src={userData?.profile_image ? `${process.env.NEXT_PUBLIC_API_URL}/${userData.profile_image}` : '/images/default.png'}
          alt="Profilkép"
          className="w-32 h-32 rounded-full mb-4"
        />
        <button
          onClick={() => setIsImageModalOpen(true)}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
          Módosítás
        </button>
      </div>

      {/* JOBB OLDALI KÁRTYA */}
      <div className="bg-black bg-opacity-70 p-8 rounded-3xl shadow-md flex-1 space-y-6">
        <h3 className="text-xl mb-4">Profil adatok</h3>

        <div className="space-y-6 divide-y divide-gray-500/50">
          <div className="pt-4">
            <strong>Felhasználónév:</strong> {pendingData.username || userData.username}
            <button
              onClick={() => {
                setEditField("username");
                setInputValue(userData.username);
              }}
              className="ml-4 text-blue-400">
              Módosít
            </button>
          </div>

          <div className="pt-4">
            <strong>Email:</strong> {pendingData.email || userData.email}
            <button
              onClick={() => {
                setEditField("email");
                setInputValue(userData.email);
              }}
              className="ml-4 text-blue-400">
              Módosít
            </button>
          </div>

          <div className="pt-4">
            <strong>Jelszó:</strong> ********
            <button
              onClick={() => setEditField("password")}
              className="ml-4 text-blue-400">
              Módosít
            </button>
          </div>
        </div>

        {changed && (
          <button
            onClick={handleFinalSave}
            className="mt-6 bg-green-600 px-6 py-2 rounded-lg hover:bg-green-700">
            Mentés
          </button>
        )}
      </div>

      {/* Modal - Username, Email, Password */}
      {editField && (
        <Modal
          title={
            editField === "password"
              ? "Jelszó módosítása"
              : editField === "email"
              ? "Email módosítása"
              : "Felhasználónév módosítása"
          }
          onClose={() => {
            setEditField(null);
            setInputValue("");
            setConfirmPassword("");
          }}
        >
          {editField === "password" ? (
            <>
              <input
                type="password"
                placeholder="Új jelszó"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="bg-transparent border border-gray-400 text-white p-2 w-full mb-2 rounded focus:outline-none"
              />
              <input
                type="password"
                placeholder="Jelszó megerősítése"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-transparent border border-gray-400 text-white p-2 w-full mb-4 rounded focus:outline-none"
              />
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => {
                    setEditField(null);
                    setInputValue("");
                    setConfirmPassword("");
                  }}
                  className="bg-red-500 px-4 py-1 rounded hover:bg-red-600">
                  Mégse
                </button>
                <button
                  onClick={handleModalSave}
                  className="bg-green-500 px-4 py-1 rounded hover:bg-green-600">
                  Mentés
                </button>
              </div>
            </>
          ) : (
            <>
              <input
                type={editField === "email" ? "email" : "text"}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="bg-transparent border border-gray-400 text-white p-2 w-full mb-4 rounded focus:outline-none"
              />
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => {
                    setEditField(null);
                    setInputValue("");
                  }}
                  className="bg-red-500 px-4 py-1 rounded hover:bg-red-600">
                  Mégse
                </button>
                <button
                  onClick={handleModalSave}
                  className="bg-green-500 px-4 py-1 rounded hover:bg-green-600">
                  Mentés
                </button>
              </div>
            </>
          )}
        </Modal>
      )}

      {/* Modal - Profilkép */}
      {isImageModalOpen && (
        <Modal
          title="Profilkép módosítása"
          onClose={() => setIsImageModalOpen(false)}>
        </Modal>
      )}

      {/* Modal - Sikeres mentés */}
      {showSuccessModal && (
        <Modal
          title="Sikeres mentés!"
          onClose={() => setShowSuccessModal(false)}
        >
          <p className="mb-4">A profil adataid sikeresen frissítve lettek. 🚀</p>
          <div className="flex justify-end">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="bg-green-500 px-4 py-1 rounded hover:bg-green-600"
            >
              OK
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
