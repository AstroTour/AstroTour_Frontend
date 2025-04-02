"use client";
import React, { useState } from "react";
import Modal from "../componens/Modal";
import Image from "next/image";
import { useUserContext } from "../componens/UserContext";
import ProfileImageSelector from "../componens/ProfileImageSelector";
import { useProfileLogic } from "../componens/useProfileLogic";
import ReservationCard from "../componens/ReservationCard";

export default function ProfilPage() {
  const { user, fetchUser } = useUserContext();
  const { reservation, handleDeleteReservation } = useProfileLogic();

  const [editField, setEditField] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pendingData, setPendingData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [changed, setChanged] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Betöltés
  if (!user) {
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

  // Modal mentése
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

  // Végleges mentés
  const handleFinalSave = async () => {
    try {
      const formData = new FormData();
      if (pendingData.username) formData.append("username", pendingData.username);
      if (pendingData.email) formData.append("email", pendingData.email);
      if (pendingData.password) formData.append("password", pendingData.password);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/update`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        alert("Hiba a mentésnél!");
        return;
      }

      await fetchUser();
      setPendingData({ username: "", email: "", password: "" });
      setChanged(false);
      setShowSuccessModal(true);
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
          src={user.profile_image ?? "/images/default.png"}
          alt="Profilkép"
          className="w-[600px] h-[600px] rounded-full mb-4 shadow-xl ring-4 ring-blue-500"
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
          <div className="pt-4 text-xl">
            <strong className="font-semibold">Felhasználónév:</strong> {pendingData.username || user.username}
            <button
              onClick={() => {
                setEditField("username");
                setInputValue(user.username);
              }}
              className="ml-4 text-pink-400 text-base hover:underline">
              Módosít
            </button>
          </div>

          <div className="pt-4 text-xl">
            <strong className="font-semibold">Email:</strong> {pendingData.email || user.email}
            <button
              onClick={() => {
                setEditField("email");
                setInputValue(user.email);
              }}
              className="ml-4 text-blue-400 text-base hover:underline">
              Módosít
            </button>
          </div>

          <div className="pt-4 text-xl">
            <strong className="font-semibold">Jelszó:</strong> ********
            <button
              onClick={() => setEditField("password")}
              className="ml-4 text-purple-400 text-base hover:underline">
              Módosít
            </button>
          </div>
        </div>

        <hr className="my-8 border-gray-500" />

        {/* FOGLALÁS KÁRTYA */}
        {reservation ? (
          <ReservationCard reservation={reservation} onCancel={handleDeleteReservation} />
        ) : (
          <p className="text-center text-gray-300">Jelenleg nincs aktív foglalásod.</p>
        )}

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
          title="Profilkép kiválasztása"
          onClose={() => setIsImageModalOpen(false)}
        >
          <ProfileImageSelector
            onClose={() => setIsImageModalOpen(false)}
            onSuccess={() => {
              fetchUser();
              setIsImageModalOpen(false);
              setShowSuccessModal(true);
            }}
          />
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
