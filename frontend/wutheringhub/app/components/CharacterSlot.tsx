"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCalculator, type BaseRow, type CharacterBasic } from "./CalculatorProvider";

export interface CharacterOption {
    id: number | string;
    name: string;
}

export interface CharacterSlotProps {
    options: CharacterOption[];
}

interface PickRowArgs {
    rows: BaseRow[] | null;
    level: number;
    ascension: number;
}

