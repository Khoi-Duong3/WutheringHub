"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { EchoPiece, EchoCost } from "./EchoBox";

export interface CharacterBasic {
	id: number | string;
	name: string;
	portraitURL?: string;
}

export interface BaseRow {
	level: number;
	ascension: number;
	base: Record<string, number>; 
}

export interface CalculatorContextValue {

	pieces: EchoPiece[];
	setPiece: (slot: number, next: EchoPiece) => void;


	character: CharacterBasic | null;
	setCharacter: (c: CharacterBasic | null) => void;

	level: number;
	setLevel: (n: number) => void;

	ascension: number;
	setAscension: (n: number) => void;


	rows: BaseRow[] | null;
}

export interface CalculatorProviderProps {

	children: React.ReactNode;

	initialRows?: BaseRow[] | null;

	initialCharacter?: CharacterBasic | null;
	initialLevel?: number;
	initialAscension?: number;
}

interface MakeEmptyPieceArgs {
  	slot: number;
}


const CalculatorContext = createContext<CalculatorContextValue | null>(null);

function makeEmptyPiece({ slot }: MakeEmptyPieceArgs): EchoPiece {
	return {
		id: `slot-${slot}`,
		level: 25,
		setName: "",
		cost: 1 as EchoCost,
		main: { stat: "", value: 0 },
		secondary: { stat: "hp", value: 0 },
		substats: Array.from({ length: 5 }, () => ({ stat: "", value: 0 })),

	};
}

export function CalculatorProvider({
	children,
	initialRows = null,
	initialCharacter = null,
	initialLevel = 1,
	initialAscension = 0,
}: CalculatorProviderProps) {
	const [pieces, setPieces] = useState<EchoPiece[]>(
		Array.from({ length: 5 }, (_, i) => makeEmptyPiece({ slot: i }))
	);
	const setPiece = (slot: number, next: EchoPiece) =>
		setPieces(prev => prev.map((p, i) => (i === slot ? next : p)));


	const [character, setCharacter] = useState<CharacterBasic | null>(initialCharacter);
	const [level, setLevel] = useState<number>(initialLevel);
	const [ascension, setAscension] = useState<number>(initialAscension);


	const rows = useMemo(() => initialRows, [initialRows]);

	const value: CalculatorContextValue = {
		pieces,
		setPiece,
		character,
		setCharacter,
		level,
		setLevel,
		ascension,
		setAscension,
		rows,
	};

  	return <CalculatorContext.Provider value={value}>{children}</CalculatorContext.Provider>;
}

export function useCalculator(): CalculatorContextValue {
	const context = useContext(CalculatorContext);
	if (!context) throw new Error("useCalculator must be used inside CalculatorProvider");
	return context;
}
