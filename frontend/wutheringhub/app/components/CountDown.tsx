"use client"

import { useState, useEffect } from "react"

interface CountDownProps {
    target: string
}

export default function CountDown({ target }: CountDownProps){
    const calc = () => {
        const timeDifference = new Date(target).getTime() - Date.now()
        if (timeDifference <= 0) {
            return "0d 0h 0m 0s"
        }

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((timeDifference /(1000 * 60 * 60)) % 24)
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60)
        const seconds = Math.floor((timeDifference / 1000) % 60)

        return `${days}d ${hours}h ${minutes}m ${seconds}s`
    }

    const [timeLeft, setTimeLeft] = useState(calc)
    
    useEffect(() => {
        const tick = setInterval(() => setTimeLeft(calc()), 1000)
        return () => clearInterval(tick)
    }, [target])

    return <span>{timeLeft}</span>
}