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
      <div className="flex flex-col lg:flex-row w-full min-h-screen">
        <div className="w-full lg:w-1/3 flex items-start justify-center p-5 pt-10 lg:pt-5">
          <div className="w-full max-w-2xl bg-black/60 p-4 rounded-lg shadow-lg flex items-center justify-center">
            <FlightSchedule />
          </div>
        </div>
  
        <div className="w-full lg:w-2/3 flex items-center justify-center p-5">
          <div className="w-full max-w-4xl bg-black/30 p-4 rounded-lg shadow-lg flex items-center justify-center">
            <Planets />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
