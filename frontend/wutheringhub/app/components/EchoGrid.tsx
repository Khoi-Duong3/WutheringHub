import { Echo } from './EchoCard'
import EchoCard from './EchoCard'

export type {Echo};

interface Props {
  resonators: Echo[]
}

export default function ResonatorGrid({ resonators }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {resonators.map(e => (
        <EchoCard key={e.id} echo={e} />
      ))}
    </div>
  )
}