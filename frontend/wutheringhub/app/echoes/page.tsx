"use client"

import EchoGrid, { Echo } from "../components/EchoGrid"
import EchoFilterBar from "../components/EchoFilterBar"
import ResonatorSearchBar from "../components/ResonatorSearchBar"
import { useState, useMemo } from "react"
import echoes from "@/data/echoes.json"

export default function Resonators(){
    const allEchoes = echoes as Echo[]
    const classType = useMemo(() => Array.from(new Set(allEchoes.map((e) => e.class))), [allEchoes])
    const allSetTypes = useMemo(() => Array.from(new Set(allEchoes.flatMap((e) => e.setURL))), [allEchoes])

    const [query, setQuery] = useState("");
    const [selectedClass, setSelectedClass] = useState<string[]>([])
    const [selectedSets, setSelectedSets] = useState<string[]>([])

    const toggleSets = (s: string) => {
        setSelectedSets((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s])
    }

    const toggleClass = (c: string) => {
        setSelectedClass((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c])
    }

    const resetFilters = () => {
        setSelectedClass([])
        setSelectedSets([])
        setQuery("")
    }

    const filtered = useMemo(() => {
        return allEchoes.filter((e) => {
            if (query && !e.name.toLowerCase().includes(query.toLowerCase())) {
                return false
            }

            if (selectedSets.length > 0 && !e.setURL.some((s) => selectedSets.includes(s))) {
                return false
            }

            if (selectedClass.length > 0 && !selectedClass.includes(e.class)) {
                return false
            }

            return true
        })
    }, [selectedClass, selectedSets, query, allEchoes])

    return(
                <main className="max-w-6xl mx-auto p-4 space-y-4">
                    <div className="mb-10 flex items-center justify-center">
                        <ResonatorSearchBar value={query} onChange={setQuery} placeholder="Search..." className="max-w-md"/>
                    </div>
                    <div className="mb-10 flex items-center justify-center">
                        <EchoFilterBar sets={allSetTypes} classes={classType}selectedClass={selectedClass} onToggleClass={toggleClass} selectedSets={selectedSets} onToggleSets={toggleSets} onReset={resetFilters}/>
                    </div>
                    <h1 className="text-2xl font-bold mb-6">Echoes</h1>
                    <EchoGrid echoes={filtered} />
                </main>
            )
}