"use client"

import Link from "next/link"
import Image from "next/image"

export type Echo = {
  id: number
  name: string
  cost: number
  class: string
  set: string[] 
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
            src={`/echoes/${echo.name}.webp`}
            alt={echo.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="absolute top-0 left-0 flex flex-col gap-1">
            {echo.set.map((setName) => (
                <Image key={setName} src={`/sets/${setName}.webp`} alt={setName} width={12} height={12}/>
            ))}
        </div>

        <div className="absolute top-0 right-0 w-12 h-12">
          <Image
            src={`/cost/${echo.cost}.webp`}
            alt={`${echo.cost}`}
            fill
            className="object-contain drop-shadow-black"
          />
        </div>
      </div>

      <div className="bg-gray-800 px-3 py-2 text-center">
        <p className="font-semibold text-white">{echo.name}</p>
      </div>
    </Link>
  )
}