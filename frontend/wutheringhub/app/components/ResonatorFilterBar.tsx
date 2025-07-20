"use client"

import React from "react"
import { X } from "lucide-react"

export type Star = 4 | 5

interface Props {
    elements: string[];
    weapons: string[];

    selectedElements: string[]
    onToggleElement: (element: string) => void;

    selectedWeapons: string[]
    onToggleWeapon: (element: string) => void;

    selectedStars: Star[];
    onToggleStar: (star: Star) => void

    onReset: () => void
}

export default function ResonatorFilterBar({elements, weapons, selectedElements, selectedWeapons, selectedStars, onToggleElement, onToggleWeapon, onToggleStar, onReset}: Props){
    const isActive = (arr: any[], v: any) => arr.includes(v)
    return (
        <div className="flex flex-wrap items-center gap-2 bg-gray-800 p-2 rounded-md">
            {[4,5].map((star) => (
                <button key={star} onClick={() => onToggleStar(star as Star)} className={`px-3 py-1 rounded ${isActive(selectedStars, star)? "bg-yellow-500 text-black": "bg-gray-700 text-gray-300"}`}>
                    {star}★
                </button>
            ))}

            <div className="h-6 border-l border-gray-600 mx-2" />
            {elements.map((ele) => (
                <button key={ele} onClick={() => onToggleElement(ele)} className={`px-3 py-1 rounded ${isActive(selectedElements, ele)? "bg-yellow-500 text-black": "bg-gray-700 text-gray-300"}`}>
                    {ele}
                </button>
            ))}

            <div className="h-6 border-l border-gray-600 mx-2" />
            {weapons.map((wep) => (
                <button key={wep} onClick={() => onToggleWeapon(wep)} className={`px-3 py-1 rounded ${isActive(selectedWeapons, wep)? "bg-yellow-500 text-black": "bg-gray-700 text-gray-300"}`}>
                    {wep}
                </button>
            ))}

            <button onClick={onReset} className="ml-auto text-gray-400 hover:text-white p-1" title="Reset all filters">
                <X size={16} />
            </button>
        </div>
    )
}