"use client";
import React from "react";

export default function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-black bg-opacity-90 p-6 rounded-xl shadow-lg min-w-[300px] max-w-md text-white">
        <h3 className="text-lg font-bold mb-4">{title}</h3>
        <div>{children}</div>
        <div className="mt-4 text-right">
        </div>
      </div>
    </div>
  );
}
