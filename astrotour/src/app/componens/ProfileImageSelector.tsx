"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface AvatarData {
  id: number;
  url: string;
}

export default function ProfileImageSelector({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [avatars, setAvatars] = useState<AvatarData[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Avatarok betöltése
  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/avatar`, {
          credentials: "include",
        });
        const data = await res.json();
        setAvatars(data);
      } catch (err) {
        console.error("❌ Nem sikerült betölteni az avatarokat:", err);
        setError("Nem sikerült betölteni a képeket.");
      } finally {
        setLoading(false);
      }
    };
    fetchAvatars();
  }, []);

  const handleSubmit = async () => {
    if (!selectedId) return;

    const formData = new FormData();
    formData.append("avatar_id", String(selectedId));

    try {
      // CSRF token lekérése Laravelhez
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`, {
        credentials: "include",
      });

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/avatarUpdate`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (res.ok) {
        onSuccess();
      } else {
        const errData = await res.json();
        console.error("❌ Backend válasz:", errData);
        alert(errData.message || "Nem sikerült menteni a képet.");
      }
    } catch (err) {
      console.error("Mentési hiba:", err);
      alert("Hiba a mentés során.");
    }
  };

  return (
    <div>
      {loading ? (
        <p className="text-white">Betöltés...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {avatars.map((avatar) => (
            <div
                key={String(avatar.id)}
                onClick={() => setSelectedId(avatar.id)}
                className={`cursor-pointer border-2 rounded-lg p-1 ${
                selectedId === avatar.id ? "border-blue-500" : "border-transparent"}`}>
                <Image
                src={avatar.url}
                width={80}
                height={80}
                alt="Avatar"
                className="rounded"
                />
            </div>
            ))}
        </div>
      )}

      <div className="mt-4 flex justify-end gap-4">
        <button
          onClick={onClose}
          className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
        >
          Mégse
        </button>
        <button
          onClick={handleSubmit}
          disabled={!selectedId}
          className="bg-green-500 px-4 py-1 rounded hover:bg-green-600 disabled:opacity-50"
        >
          Mentés
        </button>
      </div>
    </div>
  );
}
