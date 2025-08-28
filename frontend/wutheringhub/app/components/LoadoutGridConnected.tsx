"use client";

import LoadoutGrid from "./LoadoutGrid";
import type { EchoMeta } from "./EchoBox";
import { useCalculator } from "./CalculatorProvider";


export interface LoadoutGridConnectedProps {
    echoes: EchoMeta[];
}

export default function LoadoutGridConnected({ echoes }: LoadoutGridConnectedProps) {
    const { pieces, setPiece } = useCalculator();

    return (
        <LoadoutGrid
        echoes={echoes}
        pieces={pieces}
        onChangePiece={(slot, next) => setPiece(slot, next)}
        />
    );
}
