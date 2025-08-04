"use client"

import { useState } from "react";
import { EchoStat } from "@/lib/types";


interface TypicalEcho {
    primaryStat: {key: EchoStat; value: number};
    secondaryStat: {key: EchoStat; value: number};
    subStats: Array<{key: EchoStat; value: number}>;
    cost: number;
}

type CharacterKey = "Changli" | "Lupa"
type WeaponKey = "Blazing Brilliance" | "Widfire Mark"

interface BuildStats {
    character: CharacterKey;
    charLevel: number;
    weapon: WeaponKey;
    weaponLevel: number;
    abilityMultipliers: number[];
    echoes: TypicalEcho[];
}

const blankEcho: TypicalEcho = {
    primaryStat: {key: "", value: 0},
    secondaryStat: {key: "", value: 0},
    subStats:      Array(4).fill(null).map(() => ({ key: "", value: 0 })),
    cost: 0
}


