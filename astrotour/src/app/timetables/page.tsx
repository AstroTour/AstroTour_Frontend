import React from "react";
import FlightTable from "../componens/FlightTable";
import Map from "../componens/map"; // 🔹 Nagybetűs, hogy illeszkedjen a fájlnévhez!

const Page = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen p-4">
      {/* 🔹 Bal oldalon a menetrend */}
      <div className="md:w-1/3 w-full p-4">
        <FlightTable />
      </div>

      {/* 🔹 Jobb oldalon a térkép (átlátszó kártyában) */}
      <div className="md:w-2/3 w-full flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-lg w-full h-[90%] flex items-center justify-center">
          <Map />
        </div>
      </div>
    </div>
  );
};

export default Page;
