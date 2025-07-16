"use client"

import { useState, useEffect, useMemo } from "react"

interface CountDownProps {
    start: string,
    end: string
}

export default function CountDown({ start, end }: CountDownProps){
    const startTime = useMemo(() => Date.parse(start), [start])
    const endTime   = useMemo(() => Date.parse(end),   [end])

    const calc = () => {
        const now = Date.now()

        if (now < startTime) {
            const timeDifference = startTime - now

            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
            const hours = Math.floor((timeDifference /(1000 * 60 * 60)) % 24)
            const minutes = Math.floor((timeDifference / (1000 * 60)) % 60)
            const seconds = Math.floor((timeDifference / 1000) % 60)

            return `${days}d ${hours}h ${minutes}m ${seconds}s`
        }
        
        if (now < endTime){
            const timeDifference = endTime - now

            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
            const hours = Math.floor((timeDifference /(1000 * 60 * 60)) % 24)
            const minutes = Math.floor((timeDifference / (1000 * 60)) % 60)
            const seconds = Math.floor((timeDifference / 1000) % 60)

            return `${days}d ${hours}h ${minutes}m ${seconds}s`
        }

        return "Event Ended"
    }
    
    const [timeLeft, setTimeLeft] = useState(calc)
    
    useEffect(() => {
        const tick = setInterval(() => setTimeLeft(calc()), 1000)
        return () => clearInterval(tick)
    }, [start, end])

    return <span>{timeLeft}</span>
}