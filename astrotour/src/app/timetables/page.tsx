import React from "react";
import FlightTable from "../componens/FlightTable";
import Map from "../componens/map";

const Page = () => {
  return (
    <div className="flex h-screen"> {/* 🔹 A teljes képernyőt kitöltő flex konténer */}
      
      {/* 🔹 Bal oldalon a menetrend (táblázat) */}
      <div className="w-1/2 h-full flex items-center justify-center p-10">
        <div className="w-full h-full bg-black/50 p-4 rounded-lg shadow-lg flex items-center justify-center">
          <FlightTable />
        </div>
      </div>

      {/* 🔹 Jobb oldalon a térkép */}
      <div className="w-2/3 h-full flex items-center justify-center p-10">
        <div className="w-full h-full bg-black/50 p-4 rounded-lg shadow-lg flex items-center justify-center">
          <Map />
        </div>
      </div>

    </div>
  );
};

export default Page;
