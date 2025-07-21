"use client"

import React from "react"
import { X } from "lucide-react"
import Image from "next/image"

interface Props {
    elements: string[];
    weapons: string[];

    selectedElements: string[]
    onToggleElement: (element: string) => void;

    selectedWeapons: string[]
    onToggleWeapon: (element: string) => void;

    selectedStars: number[];
    onToggleStar: (star: number) => void

    onReset: () => void
}

export default function ResonatorFilterBar({elements, weapons, selectedElements, selectedWeapons, selectedStars, onToggleElement, onToggleWeapon, onToggleStar, onReset}: Props){
    const isActive = (arr: any[], v: any) => arr.includes(v)
    return (
        <div className="flex flex-wrap items-center gap-2 bg-gray-800 p-2 rounded-md">
            {[4,5].map((star) => (
                <button key={star} onClick={() => onToggleStar(star as number)} className={`px-3 py-1 rounded ${isActive(selectedStars, star)? "bg-blue-500 text-gray-300": "bg-gray-700 text-gray-300"}`}>
                    {star}★
                </button>
            ))}

            <div className="h-6 border-l border-gray-600 mx-2" />
            {elements.map((ele) => (
                <button key={ele} onClick={() => onToggleElement(ele)} className={`px-3 py-1 rounded ${isActive(selectedElements, ele)? "bg-blue-500 text-black": "bg-gray-700 text-gray-300"}`}>
                    <Image src={`/elements/${ele}.png`} alt={ele} width={40} height={40} className={isActive(selectedElements, ele) ? "" : "opacity-100"}/>
                </button>
            ))}

            <div className="h-6 border-l border-gray-600 mx-2" />
            {weapons.map((wep) => (
                <button key={wep} onClick={() => onToggleWeapon(wep)} className={`px-3 py-1 rounded ${isActive(selectedWeapons, wep)? "bg-blue-500 text-black": "bg-gray-700 text-gray-300"}`}>
                    <Image src={`/weapontype/${wep}.png`} alt={wep} width={40} height={40} className={isActive(selectedWeapons, wep) ? "" : "opacity-100"}/>
                </button>
            ))}

            <button onClick={onReset} className="ml-auto text-gray-400 hover:text-white p-1" title="Reset all filters">
                <X size={16} />
            </button>
        </div>
    )
}