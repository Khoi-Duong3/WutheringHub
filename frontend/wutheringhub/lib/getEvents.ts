import path from "path";
import fs from "fs/promises"
import { Vibrant } from "node-vibrant/node"

export type RawEvent = {
    eventType: string,
    imageURL: string,
    title: string,
    start: string,
    end: string,
    description: string[]
}

export type Event = RawEvent & {
    gradientStops: {
        opaqueStop: string,
        transparentStop: string
    }
}

export async function getEvents(): Promise<Event[]> {
  const raw: RawEvent[] = JSON.parse(
    await fs.readFile(path.join(process.cwd(), "data", "events.json"), "utf-8")
  )

  return Promise.all(
    raw.map(async (e) => {
      const imgPath = path.join(process.cwd(), "public", e.imageURL.slice(1))
      const palette = await Vibrant.from(imgPath).getPalette()
      const swatch  = palette.DarkMuted || palette.Vibrant!
      const [r, g, b] = swatch.rgb

      return {
        ...e,
        gradientStops: {
          opaqueStop:      swatch.hex,
          transparentStop: `rgba(${r},${g},${b},0)`,
        },
      }
    })
  )
}