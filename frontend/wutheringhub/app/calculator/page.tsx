"use client";

import { useState } from "react";
import EchoBox, { type EchoPiece, type EchoMeta } from "../components/EchoBox";
// ⬇️ Adjust path to your JSON location
import echoesData from "@/data/echoes.json";

export default function Page() {
  const echoes = echoesData as unknown as EchoMeta[];

  const [piece, setPiece] = useState<EchoPiece>({
    id: "echo-1",
    level: 0,
    setName: "",
    cost: 1, // will be overridden when you pick an echo
    main: { stat: "", value: 0 },
    secondary: { stat: "hp", value: 0 }, // will auto-sync
    substats: Array.from({ length: 5 }, () => ({ stat: "", value: 0 })),
  });

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4">
      <EchoBox
        echoes={echoes}
        value={piece}
        onChange={setPiece}
        title="Test Echo Slot"
        // ⬇️ when you have real numbers for the secondary curves, plug them here
        secondaryScaler={(level, cost) => {
          // example placeholder; replace with real tables:
          const base = cost === 1 ? 140 : 260;
          const per = cost === 1 ? 3.2 : 5.5;
          return Math.round((base + per * level) * 10) / 10;
        }}
      />

      <pre className="overflow-auto rounded-xl border border-gray-800 bg-black p-3 text-xs text-gray-300">
        {JSON.stringify(piece, null, 2)}
      </pre>
    </div>
  );
}