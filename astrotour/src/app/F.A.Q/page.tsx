"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const FAQPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch("http://localhost:8000/faq");
        if (!response.ok) {
          throw new Error("Hálózati hiba történt.");
        }
        const data = await response.json();
        setFaqs(data);
      } catch (error) {
        console.error("Hiba történt az API lekérésekor:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        {/* Betöltési animáció forgó űrhajóval */}
        <div className="w-24 h-24 animate-spin">
          <Image
            src="/rocket.png"
            alt="load"
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
    <div className="bg-transparent p-5 m-10">
      <div className="text-white rounded-xl bg-black/60 shadow-2xl p-10 max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto">
        <h2 className="text-3xl mb-6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-white to-white">
          GY.I.K.
        </h2>

        {/* GYIK lista dinamikusan a backend adatokkal */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-white/20 pb-4">
              <p className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-white">
                {faq.question}
              </p>
              <p className="text-white text-sm mt-2">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
