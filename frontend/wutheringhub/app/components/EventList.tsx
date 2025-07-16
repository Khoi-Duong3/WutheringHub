"use client"

import { useState } from "react"
import RegionButton, { type Region } from "./RegionButtons"
import EventCard from "./EventCard"
import type { Event } from "@/lib/getEvents"

interface Props { events: Event[] }

export default function EventList({events}: Props) {
    const [region, setRegion] = useState<Region>("NA")

    const regionOffsets: Record<Region, number> = {
        EU: -1,
        NA: +5,
        ASIA: -8
    }

    const now = Date.now()
    const timedEvents = events.map((e) => {
        const baseStart = Date.parse(e.start)
        const baseEnd = Date.parse(e.end)
        const offsetMs = regionOffsets[region] * 60 * 60 * 1000
        return {
            ...e,
            regionStartMs: baseStart + offsetMs,
            regionEndMs: baseEnd + offsetMs,
            regionStart: new Date(baseStart + offsetMs).toISOString(),
            regionEnd: new Date(baseEnd + offsetMs).toISOString(),
        }
    })

    const upcoming = timedEvents.filter((e) => now < e.regionStartMs)
    const ongoing = timedEvents.filter((e) => now >= e.regionStartMs && now < e.regionEndMs)


    return(
        <>
            <div className="flex justify-center mb-6">
                <RegionButton region={region} setRegion={setRegion} />
            </div>
            <div className="grid grid-cols-2 gap-14 mb-20">
                <div >
                    <h3 className="text-xl font-bold text-white mb-6">Ongoing</h3>
                    <div className="space-y-4">
                        {ongoing.map((e) => (
                        <EventCard
                            key={e.eventType}
                            imageURL={e.imageURL}
                            gradientStops={e.gradientStops}
                            title={e.title}
                            countdownStart={e.regionStart}
                            countdownEnd={e.regionEnd}
                            details={
                            <>
                                <p>
                                <strong>Event Duration:</strong> {new Date(e.regionStartMs).toLocaleString()} — {new Date(e.regionEndMs).toLocaleString()}
                                </p>
                                {e.description.map((line, i) => (
                                <p key={i}>{line}</p>
                                ))}
                            </>
                            }
                        />
                        ))}
                    </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-white mb-6">Upcoming</h3>
                        <div className="space-y-4">
                            {upcoming.map((e) => (
                                <EventCard
                                    key={e.eventType}
                                    imageURL={e.imageURL}
                                    gradientStops={e.gradientStops}
                                    title={e.title}
                                    countdownStart={e.regionStart}
                                    details={
                                        <>
                                            <p>
                                                <strong>Event Starts:</strong> {new Date(e.regionStartMs).toLocaleString()}
                                            </p>
                                            {e.description.map((line, i) => (
                                                <p key={i}>{line}</p>
                                            ))}
                                        </>
                                    }
                                />
                        ))}
                    </div>
                </div>
            </div>       
        </>
    )
}