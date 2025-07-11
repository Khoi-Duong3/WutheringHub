'use client'

import { useRef } from 'react'
import Script from 'next/script'

export default function WuwaTwitterTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <>
      {/* 1) This div will get replaced by the timeline */}
      <div
        ref={containerRef}
        className="w-full h-[400px] mx-auto"
      />

      {/* 2) Load the Twitter SDK, then create the timeline */}
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="afterInteractive"
        onLoad={() => {
          const tw = (window as any).twttr
          if (tw?.widgets && containerRef.current) {
            tw.widgets
              .createTimeline(
                {
                  sourceType: 'profile',
                  screenName: 'Wuthering_Waves',
                },
                containerRef.current,
                {
                  theme: 'dark',
                  tweetLimit: 5,
                  chrome: 'noheader nofooter noborders',
                }
              )
              .catch((err: any) =>
                console.error('Twitter createTimeline error', err)
              )
          }
        }}
        onError={(err) => console.error('Failed to load widgets.js', err)}
      />
    </>
  )
}
