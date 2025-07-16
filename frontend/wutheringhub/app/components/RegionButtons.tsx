"use client"

import { useState, Dispatch, SetStateAction } from "react";

const regions = ["ASIA", "EU", "NA"] as const;
export type Region = typeof regions[number];

interface RegionProps {
    region: Region,
    setRegion: Dispatch<SetStateAction<Region>>
}

export default function RegionButton({region, setRegion}: RegionProps){
    return(
        <div className="flex space-x-2 mb-1">
            {regions.map((re) => (
                <button key={re} onClick={() => setRegion(re)} className={`px-3 py-1 rounded-xs ${region == re ? "bg-blue-500 text-white hover:bg-blue-400" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}>
                    {re}
                </button>
            ))}
        </div>
    )
}