import { Weapon } from "./WeaponCard";
import WeaponCard from "./WeaponCard";

export type {Weapon};

interface Props {
  weapons: Weapon[]
}

export default function ResonatorGrid({ weapons }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {weapons.map(w => (
        <WeaponCard key={w.id} weapon={w} />
      ))}
    </div>
  )
}