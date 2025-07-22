"use client"

import { useState, useMemo } from "react"
import ResonatorGrid, { Resonator } from '../components/ResonatorGrid'
import resonators from '@/data/resonators.json'
import ResonatorSearchBar from "../components/ResonatorSearchBar"
import ResonatorFilterBar from "../components/ResonatorFilterBar"

export default function Resonators(){
    const allResonators = resonators as Resonator[];
    const elements = useMemo(() => Array.from(new Set(allResonators.map((r) => r.element))), [allResonators]);
    const weapons = useMemo(() => Array.from(new Set(allResonators.map((r) => r.weaponType))), [allResonators]);

    const [query, setQuery] = useState("");
    const [selectedElement, setSelectedElement] = useState<string | null>(null)
    const [selectedWeapon,  setSelectedWeapon]  = useState<string | null>(null)
    const [selectedStar,    setSelectedStar]    = useState<number | null>(null) 

    const toggleStar = (s: number | null) => {
        setSelectedStar(current => (current === s ? null : s))
    };

    const toggleElement = (ele: string | null) => {
        setSelectedElement(current => (current === ele ? null : ele))
    };

    const toggleWeapon = (wep: string | null) => {
        setSelectedWeapon(current => (current === wep ? null : wep))
    };

    const resetFilters = () => {
        setSelectedStar(null);
        setSelectedElement(null);
        setSelectedWeapon(null);
        setQuery("");
    }


    const filtered = useMemo(() => {
        return allResonators.filter((r) => {
            if (query && !r.name.toLowerCase().includes(query.toLowerCase())) {
                return false
            }
            if (selectedElement && r.element !== selectedElement){
                return false
            }
            if (selectedWeapon && r.weaponType !== selectedWeapon){
                return false
            }
            if (selectedStar && r.star !== selectedStar){
                return false
            }
            return true
        })    
    }, [allResonators, query, selectedElement, selectedStar, selectedWeapon])

    return(
        <main className="max-w-6xl mx-auto p-4 space-y-4">
            <div className="mb-10 flex items-center justify-center">
                <ResonatorSearchBar value={query} onChange={setQuery} placeholder="Search..." className="max-w-md"/>
            </div>
            <div className="mb-10 flex items-center justify-center">
                <ResonatorFilterBar elements={elements} weapons={weapons} selectedElement={selectedElement} onToggleElement={toggleElement} selectedWeapon={selectedWeapon} onToggleWeapon={toggleWeapon} selectedStar={selectedStar} onToggleStar={toggleStar} onReset={resetFilters}/>
            </div>
            <h1 className="text-2xl font-bold mb-6">Resonators</h1>
            <ResonatorGrid resonators={filtered} />
        </main>
    )
}