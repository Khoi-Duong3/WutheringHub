"use client"

import { useState, useMemo } from "react"
import ResonatorGrid, { Resonator } from '../components/ResonatorGrid'
import resonators from '@/data/resonators.json'
import ResonatorSearchBar from "../components/ResonatorSearchBar"
import ResonatorFilterBar, {Star} from "../components/ResonatorFilterBar"

export default function Resonators(){
    const allResonators = resonators as Resonator[];
    const elements = useMemo(() => Array.from(new Set(allResonators.map((r) => r.element))), [allResonators]);
    const weapons = useMemo(() => Array.from(new Set(allResonators.map((r) => r.weaponType))), [allResonators]);

    const [query, setQuery] = useState("");
    const [selectedStars, setSelectedStars] = useState<Star[]>([])
    const [selectedElements, setSelectedElements] = useState<string[]>([])
    const [selectedWeapons, setSelectedWeapons] = useState<string[]>([])

    const toggleStar = (s: Star) => setSelectedStars((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev,s]))
    const toggleElement = (ele: string) => setSelectedElements((prev) => (prev.includes(ele) ? prev.filter((x) => x !== ele) : [...prev,ele]))
    const toggleWeapon = (wep: string) => setSelectedWeapons((prev) => (prev.includes(wep) ? prev.filter((x) => x !== wep) : [...prev,wep]))
    const resetFilters = () => {
        setSelectedStars([])
        setSelectedElements([])
        setSelectedWeapons([])
        setQuery("")
    }


    const filtered = useMemo(() => {
        return allResonators.filter((r) => {
            if (query && !r.name.toLowerCase().includes(query.toLowerCase())) {
                return false
            }
            if (selectedElements.length && !selectedElements.includes(r.element)) {
                return false
            }
            if (selectedWeapons.length && !selectedWeapons.includes(r.weaponType)) {
                return false
            }
            return true
        })    
    }, [allResonators, query, selectedElements, selectedStars, selectedWeapons])

    return(
        <main className="max-w-6xl mx-auto p-4 space-y-4">
            <div className="mb-10 flex items-center justify-center">
                <ResonatorSearchBar value={query} onChange={setQuery} placeholder="Search..." className="max-w-md"/>
            </div>
            <div className="mb-10 flex items-center justify-center">
                <ResonatorFilterBar elements={elements} weapons={weapons} selectedElements={selectedElements} onToggleElement={toggleElement} selectedWeapons={selectedWeapons} onToggleWeapon={toggleWeapon} selectedStars={selectedStars} onToggleStar={toggleStar} onReset={resetFilters}/>
            </div>
            <h1 className="text-2xl font-bold mb-6">Resonators</h1>
            <ResonatorGrid resonators={filtered} />
        </main>
    )
}