"use client"

import Link from "next/link";
import Image from "next/image";

export type Resonator = {
    id: number,
    name: string,
    portraitURL: string,
    element: string,
    weaponType: string,
    star: number
}

interface Props {
    resonator: Resonator
}

export default function ResonatorCard({resonator}: Props){

    const bg = resonator.star === 5 ? "bg-yellow-500 hover:bg-yellow-400" : resonator.star === 4 ? "bg-violet-800 hover:bg-violet-700" : 'bg-gray-100 hover:bg-gray-200'
    return (
    <Link
      href={`/resonators/${resonator.id}`}
      className={`block rounded overflow-hidden shadow hover:shadow-lg transition`}
    >
      <div className={`relative w-full aspect-[2/3] ${bg} flex items-center justify-center`}>
        <Image
          src={resonator.portraitURL}
          alt={resonator.name}
          fill                               
          className="object-contain"
        />

        <div className="absolute top-0 left-0 w-9 h-9">
          <Image src={`/elements/${resonator.element}.png`} alt={resonator.element} fill/>
        </div>

        <div className="absolute top-0 right-0 w-9 h-9">
          <Image src={`/weapontype/${resonator.weaponType}.png`} alt={resonator.weaponType} fill className="object-contain drop-shadow-black"/>
        </div>

      </div>


      <div className="bg-gray-800 px-3 py-2 text-center">
        <p className="font-semibold text-white">{resonator.name}</p>
      </div>
    </Link>
    )
}