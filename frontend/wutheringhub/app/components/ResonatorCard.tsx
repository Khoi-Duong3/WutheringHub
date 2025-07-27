"use client"

import Link from "next/link"
import Image from "next/image"

export type Resonator = {
  id: number
  name: string
  portraitURL: string
  element: string
  weaponType: string
  star: number
}

interface Props {
  resonator: Resonator
}

export default function ResonatorCard({ resonator }: Props) {
  const bg =
    resonator.star === 5
		? "bg-yellow-400 hover:bg-yellow-300"
      	: resonator.star === 4
      	? "bg-violet-700 hover:bg-violet-600"
      	: "bg-gray-100 hover:bg-gray-200"

  return (
    <Link
      href={`/resonators/${resonator.id}`}
      className="block rounded overflow-hidden shadow hover:shadow-lg transition"
    >
      <div className="relative w-full aspect-square overflow-hidden">
        <div className={`${bg} absolute inset-0`}>
          <Image
            src={resonator.portraitURL}
            alt={resonator.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="absolute top-0 left-0 w-12 h-12">
          <Image
            src={`/elements/${resonator.element}.png`}
            alt={resonator.element}
            fill
          />
        </div>

        <div className="absolute top-0 right-0 w-12 h-12">
          <Image
            src={`/weapontype/${resonator.weaponType}.png`}
            alt={resonator.weaponType}
            fill
            className="object-contain drop-shadow-black"
          />
        </div>
      </div>

      <div className="bg-gray-800 px-3 py-2 text-center h-14 flex items-center justify-center overflow-hidden">
        <p className="font-semibold text-white leading-snug line-clamp-2">{resonator.name}</p>
      </div>
    </Link>
  )
}