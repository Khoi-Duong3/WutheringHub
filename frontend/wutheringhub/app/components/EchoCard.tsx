"use client"

import Link from "next/link"
import Image from "next/image"

export type Echo = {
  id: number
  name: string
  cost: number
  class: string
  sets: string[]
  portraitURL: string
  setURL: string[] 
}

interface Props {
  echo: Echo
}

export default function ResonatorCard({ echo }: Props) {

  return (
    <Link
      href={`/resonators/${echo.id}`}
      className="block rounded overflow-hidden shadow hover:shadow-lg transition"
    >
      <div className="relative w-full aspect-square overflow-hidden">
        <div className={`bg-gray-500 absolute inset-0`}>
          <Image
            src={echo.portraitURL}
            alt={echo.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="absolute top-1 left-1 flex flex-col gap-1">
            {echo.setURL.map((setName) => (
                <Image key={setName} src={setName} alt={setName} width={28} height={28}/>
            ))}
        </div>

        <div className="absolute top-1 right-1 w-6 h-6">
          <Image
            src={`/cost/${echo.cost}.png`}
            alt={`${echo.cost}`}
            fill
            className="object-contain drop-shadow-black"
          />
        </div>
      </div>

      <div className="bg-gray-800 px-3 py-2 text-center h-14 flex items-center justify-center overflow-hidden">
        <p className="font-semibold text-white leading-snug line-clamp-2">{echo.name}</p>
      </div>
    </Link>
  )
}