"use client";
import React from "react";

interface ReservationProps {
  reservation: any;
  onCancel: () => void;
}

const ReservationCard: React.FC<ReservationProps> = ({ reservation, onCancel }) => {
  return (
    <div className="bg-black bg-opacity-60 p-6 rounded-3xl shadow-xl w-full max-w-[48%] border border-gray-700">
      <h3 className="text-xl mb-6 text-center font-bold text-blue-400">
        🚀 Foglalás részletei
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base text-gray-200">
        <div>🆔 <strong>Azonosító:</strong> {reservation.reservation_id}</div>
        <div>🚀 <strong>Űrhajó:</strong> {reservation.spaceship_name}</div>
        <div>🗺️ <strong>Úti cél:</strong> {reservation.planet_name} ({reservation.spaceport_name})</div>
        <div>📅 <strong>Indulás:</strong> {new Date(reservation.departure_time).toLocaleString()}</div>
        <div>🛬 <strong>Érkezés:</strong> {new Date(reservation.arrival_time).toLocaleString()}</div>
        {reservation.return_time && (
          <div>🔄 <strong>Visszaút:</strong> {new Date(reservation.return_time).toLocaleString()}</div>
        )}
        <div>💺 <strong>Ülés:</strong> {reservation.seat_name}</div>
        <div>🎫 <strong>Jegy típusa:</strong> {reservation.ticket_type}</div>
        <div>💰 <strong>Összeg:</strong> {reservation.total} Ft</div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={onCancel}
          className="bg-red-600 px-5 py-2 rounded-lg hover:bg-red-700 text-sm font-semibold"
        >
          Lemondás
        </button>
      </div>
    </div>
  );
};

export default ReservationCard;
