import React from 'react';
import FlightTable from '../componens/FlightTable';
import SolarSystem from '../componens/SolarSystem';



function page() {
  return (
    <div className="flex h-screen bg-gray-200">
      <FlightTable />
      <SolarSystem />
    </div>
  );
}

export default page