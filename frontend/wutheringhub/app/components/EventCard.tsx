"use client"

import { ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"
import { ReactNode, useState } from "react"

type GradientStops = {
  transparentStop: string
  opaqueStop: string
}

type EventProps = {
  imageURL: string
  gradientStops: GradientStops
  title: ReactNode
  subtitle?: ReactNode
  details?: ReactNode
}

export default function EventCard({
  imageURL,
  gradientStops,
  title,
  subtitle,
  details,
}: EventProps) {
  const { transparentStop, opaqueStop } = gradientStops
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className={`relative w-150 bg-gray-900 overflow-hidden ${
        isOpen ? "rounded-t-sm" : "h-16 rounded-sm"
      }`}
    >
      <div className="absolute top-0 left-0 h-16 w-32 overflow-hidden z-0">
        <Image
          src={imageURL}
          alt="event banner"
          width={128}
          height={128}
          quality={100}
          placeholder="empty"
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* gradient only in the top 4rem */}
      <div
        className="absolute inset-x-0 top-0 h-16 z-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(
            to right,
            ${transparentStop} 10px,
            ${opaqueStop} 20%
          )`,
        }}
      />

      {/* header stays exactly 4rem tall */}
      <div className="relative z-20 ml-40 p-4 text-white flex flex-col justify-center h-16">
        <div className="font-semibold text-lg">{title}</div>
        {subtitle && <div className="text-sm text-gray-200">{subtitle}</div>}
      </div>

      {details && (
        <button
          onClick={() => setIsOpen((o) => !o)}
          className="absolute top-4 right-4 z-20 text-gray-300 hover:text-white"
          aria-label={isOpen ? "Collapse details" : "Expand details"}
        >
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      )}

      {details && (
        <div className={`
            text-gray-300
            text-sm
            ${isOpen ? "bg-gray-800 rounded-b-sm px-4 pt-4 pb-4 space-y-2" : "hidden"}
        `}>
            {details}
        </div>
      )}
    </div>
  )
}
