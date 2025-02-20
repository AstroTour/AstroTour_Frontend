"use client";
import React from "react";
import Head from "next/head";
import FlightSchedule from "../componens/FlightTable";
import Planets from "../componens/Planets";

const Page = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="flex flex-col md:flex-row w-full min-h-screen">
        {/* Járatok: Mobilon felül, nagy képernyőn bal oldalon */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-5">
          <div className="w-full max-w-3xl bg-black/60 p-4 rounded-lg shadow-lg flex items-center justify-center">
            <FlightSchedule />
          </div>
        </div>
  
        {/* Térkép: Mobilon alul, nagy képernyőn jobb oldalon */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-5">
          <div className="w-full max-w-3xl bg-black/30 p-4 rounded-lg shadow-lg flex items-center justify-center">
            <Planets />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
