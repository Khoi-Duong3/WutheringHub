import ResonatorGrid, { Resonator } from '../components/ResonatorGrid'
import resonators from '@/data/resonators.json'

export default function Resonators(){
    const list = resonators as Resonator[]

    return(
        <main className="max-w-6xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Resonators</h1>
            <ResonatorGrid resonators={list} />
        </main>
    )
}