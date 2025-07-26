"use client"

import Link from "next/link"
import Image from "next/image"

export type Weapon = {
  id: number
  name: string
  portraitURL: string
  weaponType: string
  star: number
}

interface Props {
  weapon: Weapon
}

export default function WeaponCard({ weapon }: Props) {
  const bg =
    weapon.star === 5
      ? "bg-yellow-400 hover:bg-yellow-300"
      : weapon.star === 4
      ? "bg-violet-700 hover:bg-violet-600"
      : weapon.star === 3
      ? "bg-sky-600 hover:bg-sky-500"
      : weapon.star === 2
      ? "bg-green-700 hover:bg-green-600"
      : weapon.star === 1
      ? "bg-neutral-700 hover:bg-neutral-600"
      : "bg-gray-300 hover:bg-gray-200"

  return (
    <Link
      href={`/resonators/${weapon.id}`}
      className="block rounded overflow-hidden shadow hover:shadow-lg transition"
    >
      <div className="relative w-full aspect-square overflow-hidden">
        <div className={`${bg} absolute inset-0`}>
          <Image
            src={weapon.portraitURL}
            alt={weapon.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="absolute top-0 right-0 w-12 h-12">
          <Image
            src={`/weapontype/${weapon.weaponType}.png`}
            alt={weapon.weaponType}
            fill
            className="object-contain drop-shadow-black"
          />
        </div>
      </div>

      <div className="bg-gray-800 px-3 py-2 text-center">
        <p className="font-semibold text-white">{weapon.name}</p>
      </div>
    </Link>
  )
}