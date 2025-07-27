"use client"

import React from "react"
import { X } from "lucide-react"
import Image from "next/image"
import { Echo } from "./EchoCard"

interface Props {
    sets: string[];
    classes: string[];

    selectedSets: string[];
    onToggleSets: (set: string) => void

    selectedClass: string[];
    onToggleClass: (cla: string) => void

    onReset: () => void

}

export default function ResonatorFilterBar({ sets,  classes, selectedSets, selectedClass,  onToggleClass, onToggleSets, onReset}: Props){
    const isSetActive = (s: string) => selectedSets.includes(s)
    const isClassActive = (c: string) => selectedClass.includes(c)

    const costOf = (c: string) =>
        c === "Calamity" || c === "Overlord"
            ? 4
            : c === "Elite"
            ? 3
            : c === "Common"
            ? 1
            : 0
    return (
        <div className="flex flex-wrap items-center gap-2 bg-gray-800 p-2 rounded-md">
            {classes.map((cla) => (
                <button key={cla} onClick={() => onToggleClass(cla)} className={`px-3 py-1 rounded ${isClassActive(cla) ? "bg-blue-500 text-gray-300": "bg-gray-700 text-gray-300"}`}>
                    {cla} ({costOf(cla)})
                </button>
            ))}

            <div className="h-6 border-l border-gray-600 mx-2" />
            {sets.map((set) => (
                <button key={set} onClick={() => onToggleSets(set)} className={`px-3 py-1 rounded ${isSetActive(set) ? "bg-blue-500 text-black": "bg-gray-700 text-gray-300"}`}>
                    <Image src={set} alt={set} width={32} height={32} className={isSetActive(set) ? "" : "opacity-100"}/>
                </button>
            ))}

            <button onClick={onReset} className="ml-auto text-gray-400 hover:text-white p-1" title="Reset all filters">
                <X size={16} />
            </button>
        </div>
    )
}