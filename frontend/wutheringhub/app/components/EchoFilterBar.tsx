"use client"

import React from "react"
import { X } from "lucide-react"
import Image from "next/image"
import { Echo } from "./EchoCard"

interface Props {
    sets: string[];
    costs: number[];

    selectedSets: string[];
    onToggleSets: (set: string) => void

    selectedClass: number[];
    onToggleClass: (cla: number) => void

    onReset: () => void

    echo: Echo
}

export default function ResonatorFilterBar({ sets,  costs, selectedSets, selectedClass,  onToggleClass, onToggleSets, onReset, echo}: Props){
    const isSetActive = (s: string) => selectedSets.includes(s)
    const isClassActive = (c: number) => selectedClass.includes(c)
    const cost = 
        echo.class === "Calamity" || echo.class === "Overlord"
            ? 4
            : echo.class === "Elite"
            ? 3
            : echo.class === "Common"
            ? 1
            : 0
    return (
        <div className="flex flex-wrap items-center gap-2 bg-gray-800 p-2 rounded-md">
            {costs.map((cla) => (
                <button key={cla} onClick={() => onToggleClass(cla)} className={`px-3 py-1 rounded ${isClassActive(cla) ? "bg-blue-500 text-gray-300": "bg-gray-700 text-gray-300"}`}>
                    {echo.class} {cost}
                </button>
            ))}

            <div className="h-6 border-l border-gray-600 mx-2" />
            {sets.map((set) => (
                <button key={set} onClick={() => onToggleSets(set)} className={`px-3 py-1 rounded ${isSetActive(set) ? "bg-blue-500 text-black": "bg-gray-700 text-gray-300"}`}>
                    <Image src={`/sets/${set}.webp`} alt={set} width={32} height={32} className={isSetActive(set) ? "" : "opacity-100"}/>
                </button>
            ))}

            <button onClick={onReset} className="ml-auto text-gray-400 hover:text-white p-1" title="Reset all filters">
                <X size={16} />
            </button>
        </div>
    )
}