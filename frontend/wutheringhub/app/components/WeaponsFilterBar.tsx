"use client"

import React from "react"
import { X } from "lucide-react"
import Image from "next/image"

interface Props {
    weapons: string[];


    selectedWeapon: string | null;
    onToggleWeapon: (weapon: string | null) => void

    selectedStar: number | null;
    onToggleStar: (star: number | null) => void

    onReset: () => void
}

export default function ResonatorFilterBar({ weapons, selectedWeapon, selectedStar,  onToggleWeapon, onToggleStar, onReset}: Props){
    const isActive = (selection: any, v: any) => selection === v
    return (
        <div className="flex flex-wrap items-center gap-2 bg-gray-800 p-2 rounded-md">
            {[1,2,3,4,5].map((star) => (
                <button key={star} onClick={() => onToggleStar(isActive(selectedStar, star) ? null : star)} className={`px-3 py-1 rounded ${isActive(selectedStar, star)? "bg-blue-500 text-gray-300": "bg-gray-700 text-gray-300"}`}>
                    {star}★
                </button>
            ))}

            <div className="h-6 border-l border-gray-600 mx-2" />
            {weapons.map((wep) => (
                <button key={wep} onClick={() => onToggleWeapon(isActive(selectedWeapon, wep) ? null : wep)} className={`px-3 py-1 rounded ${isActive(selectedWeapon, wep)? "bg-blue-500 text-black": "bg-gray-700 text-gray-300"}`}>
                    <Image src={`/weapontype/${wep}.png`} alt={wep} width={40} height={40} className={isActive(selectedWeapon, wep) ? "" : "opacity-100"}/>
                </button>
            ))}

            <button onClick={onReset} className="ml-auto text-gray-400 hover:text-white p-1" title="Reset all filters">
                <X size={16} />
            </button>
        </div>
    )
}