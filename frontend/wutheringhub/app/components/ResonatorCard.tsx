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
    return (
    <Link
      href={`/resonators/${resonator.id}`}
      className="block rounded overflow-hidden shadow hover:shadow-lg transition"
    >
      <div className="relative w-full pb-[100%]"> {/* 1:1 aspect ratio box */}
        <Image
          src={resonator.portraitURL}
          alt={resonator.name}
          fill                                 // ← tells Next.js “fill the parent div”
          className="object-cover"
        />
      </div>
      <div className="p-2 text-center">
        <p className="font-semibold">{resonator.name}</p>
        <p className="text-sm text-gray-500">
          {resonator.element} • {resonator.star}★
        </p>
      </div>
    </Link>
  )
}