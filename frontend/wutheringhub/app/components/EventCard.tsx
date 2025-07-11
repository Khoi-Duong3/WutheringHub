"use-client"

import Image from "next/image"
import { ReactNode } from "react"

type GradientStops = {
    transparentStop: string;
    opaqueStop: string;
}

type EventProps = {
    imageURL: string;
    gradientStops: GradientStops;
    children: ReactNode;
}


export default function EventCard({ imageURL, gradientStops, children}: EventProps){
    const { transparentStop, opaqueStop } = gradientStops

    return (
        <div className="relative flex h-32 rounded-lg overflow-hidden bg-gray-900">
            <div className="absolute inset-y-0 z-0 left-0 w-32">
                <Image src={imageURL} alt="event banner" fill quality={100} placeholder="empty" style={{objectFit: "cover"}}/>
            </div>
            <div 
                className="absolute inset-0 z-10 pointer-events-none" 
                style={{
                    backgroundImage: `linear-gradient(
                        to right,
                        ${transparentStop} 12px,
                        ${opaqueStop} 60%
                    )`,
                }}
            />

            <div className="relative z-20 ml-40 p-4 text-white">
                {children}
            </div>
        </div>
    )
};