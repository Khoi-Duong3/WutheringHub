"use client"

import { ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"
import { ReactNode, useState } from "react"
import CountDown from "./CountDown"

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
  countdownStart?: string
  countdownEnd?: string
}

export default function EventCard({
  imageURL,
  gradientStops,
  title,
  subtitle,
  details,
  countdownStart,
  countdownEnd,
}: EventProps) {
  const { transparentStop, opaqueStop } = gradientStops
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      onClick={() => setIsOpen(o => !o)}
      role="button"
      aria-expanded={isOpen}
      className={`relative w-150 bg-gray-900 overflow-hidden cursor-pointer ${
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

      <div
        className="absolute inset-x-0 top-0 h-16 z-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(
            to right,
            ${transparentStop} 10px,
            ${opaqueStop} 19%
          )`,
        }}
      />

      <div className="relative z-20 ml-28 p-4 text-white flex items-center justify-between h-16">
        <div className="flex flex-col">
          <div className="font-semibold text-lg">{title}</div>
          {subtitle && <div className="text-sm text-gray-200">{subtitle}</div>}
        </div>

        <div className="flex items-center space-x-4">
          {(countdownStart || countdownEnd) && (
            <div className="px-2 py-0.5 bg-gray-800/40 rounded text-sm font-mono">
              <CountDown start={countdownStart!} end={countdownEnd!} />
            </div>
          )}
          {details && (
            <span className="text-white">
              {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </span>
          )}
        </div>
      </div>

      {details && (
        <div
          className={`${isOpen
            ? "bg-gray-800 rounded-b-sm px-4 pt-4 pb-4 space-y-2"
            : "hidden"} text-gray-300 text-sm`
        }
        >
          {details}
        </div>
      )}
    </div>
  )
}