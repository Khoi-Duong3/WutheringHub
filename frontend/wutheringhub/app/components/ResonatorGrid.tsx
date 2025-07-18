import { Resonator } from './ResonatorCard'
import ResonatorCard from './ResonatorCard'

export type {Resonator};

interface Props {
  resonators: Resonator[]
}

export default function ResonatorGrid({ resonators }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {resonators.map(r => (
        <ResonatorCard key={r.id} resonator={r} />
      ))}
    </div>
  )
}