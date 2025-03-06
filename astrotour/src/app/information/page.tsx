"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const Page = ({ title, content, image }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative flex flex-col max-w-lg md:flex-row items-center md:items-start bg-black/60 backdrop-blur-lg border border-white/20 rounded-lg shadow-lg p-6 transition-all hover:shadow-2xl">
        <div className="md:w-1/2 text-center md:text-left mb-4 md:mb-0">
          <h2 className="break-words text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-white to-purple-600">{title}</h2>
          <p className="break-word text-white text-sm">{content}</p>
        </div>

        <div className="w-full md:w-1/2 mt-4 md:mt-0 flex justify-center lg:absolute lg:-right-10">
          <div className="w-60 h-70 rounded-lg flex items-center justify-center">
            {image ? (
              <Image
                src={image}
                alt={title}
                width={240}
                height={160}
                className="rounded-lg object-cover"
              />
            ) : (
              <span className="text-white">Nincs kép</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const PageContainer = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProspectus = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/prospectus");
        if (!response.ok) {
          throw new Error("Hálózati hiba történt.");
        }
        const data = await response.json();

        // Backendből érkező adatok formázása
        const formattedCards = data.map((item) => ({
          title: item.title,
          content: item.information,
          image: item.picture
            ? `http://localhost:8000/${item.picture.replace(/^\/+/, "")}`
            : null,
        }));

        setCards(formattedCards);
      } catch (error) {
        console.error("Hiba történt az API lekérésekor:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProspectus();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        {/* Betöltési animáció forgó űrhajóval */}
        <div className="w-24 h-24 animate-spin">
          <Image
            src="/rocket.png"
            alt="Load"
            width={50}
            height={50}
            className="object-contain"
          />
        </div>
        <p className="text-lg font-semibold mt-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-white">Betöltés...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-10">
        Hiba történt: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-10 relative z-0">
      <div className="mb-8 flex justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-black/50 rounded-lg"></div>
            <div className="px-6 py-3 relative z-10 rounded-lg shadow-lg text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-white to-purple-600">
              Tájékoztatás
            </div>
          </div>
        </div>
      <div className="flex flex-col gap-8 md:grid md:grid-cols-1 lg:grid-cols-2">
        {cards.map((card, index) => (
          <Page key={index} 
          title={card.title} 
          content={card.content} 
          image={card.image} />
        ))}
      </div>
    </div>
  );
};

export default PageContainer;
