"use client"

import { useState, useMemo } from "react"
import WeaponGrid, { Weapon } from "../components/WeaponGrid"
import ResonatorSearchBar from "../components/ResonatorSearchBar"
import WeaponCard from "../components/WeaponCard"
import WeaponsFilterBar from "../components/WeaponsFilterBar"
import weapons from '@/data/weapons.json'

export default function Weapons(){
    const allWeapons = weapons as Weapon[];    
    const weaponType = useMemo(() => Array.from(new Set(allWeapons.map((w) => w.weaponType))), [allWeapons]);

    const [query, setQuery] = useState("");
    const [selectedWeapon,  setSelectedWeapon]  = useState<string | null>(null);
    const [selectedStar,    setSelectedStar]    = useState<number | null>(null);

    const toggleStar = (s: number | null) => {
        setSelectedStar(current => (current === s ? null : s))
    };

    const toggleWeapon = (wep: string | null) => {
        setSelectedWeapon(current => (current === wep ? null : wep))
    };

    const resetFilters = () => {
        setSelectedStar(null);
        setSelectedWeapon(null);
        setQuery("");
    };

    const filtered = useMemo(() => {
        return allWeapons.filter((w) => {
            if (query && !w.name.toLowerCase().includes(query.toLowerCase())) {
                return false
            }
            if (selectedWeapon && w.weaponType !== selectedWeapon){
                return false
            }
            if (selectedStar && w.star !== selectedStar){
                return false
            }
            return true
        })    
    }, [allWeapons, query, selectedStar, selectedWeapon])

    return(
            <main className="max-w-6xl mx-auto p-4 space-y-4">
                <div className="mb-10 flex items-center justify-center">
                    <ResonatorSearchBar value={query} onChange={setQuery} placeholder="Search..." className="max-w-md"/>
                </div>
                <div className="mb-10 flex items-center justify-center">
                    <WeaponsFilterBar  weapons={weaponType}  selectedWeapon={selectedWeapon} onToggleWeapon={toggleWeapon} selectedStar={selectedStar} onToggleStar={toggleStar} onReset={resetFilters}/>
                </div>
                <h1 className="text-2xl font-bold mb-6">Resonators</h1>
                <WeaponGrid weapons={filtered} />
            </main>
        )
}