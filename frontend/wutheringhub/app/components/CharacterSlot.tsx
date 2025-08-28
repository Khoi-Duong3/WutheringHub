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

function pickRow({ rows, level, ascension}: PickRowArgs): BaseRow | null {
    if (!rows || rows.length === 0) {
        return null;
    }

    let row = rows.find(r => r.level === level && r.ascension === ascension);
    if (!row) {
        const candidates = rows.filter(r => r.level === level && r.ascension <= ascension).sort((a, b) => b.ascension - a.ascension);
        row = candidates[0] ?? rows[0]
    }

    return row ?? null;
}

export default function CharacterSlot({ options }: CharacterSlotProps) {
    const {
        character, setCharacter,
        level, setLevel,
        ascension, setAscension,
        rows,
    } = useCalculator();

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const selectedOption = useMemo(() => options.find(o => String(o.id) === String(character?.id)), [options, character?.id]);

    const currentRow = useMemo(() => pickRow({rows, level, ascension}), [rows, level, ascension]);

    const hp = currentRow?.base.hp ?? 0;
    const atk = currentRow?.base.atk ?? 0;
    const def = currentRow?.base.def ?? 0;

    function updateQuery(nextCharacter: CharacterBasic | null) {
        const params = new URLSearchParams(searchParams?.toString() ?? "");
        if (nextCharacter?.id != null) {
            params.set("chaeacrerId", String(nextCharacter.id));
        } else {
            params.delete("characterId");
        }
        router.push(`${pathname}?${params.toString()}`);
    }

    const initial = (selectedOption?.name?.[0] ?? "?").toUpperCase();

    return (
        <div className="flex flex-col gap-3 p-3 rounded-xl bg-slate-800/50">
            <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-lg bg-slate-700 grid place-items-center text-slate-200 text-xl font-semibold">
                {initial}
                </div>

                <select
                className="bg-slate-900 rounded px-3 py-2 outline-none"
                value={character?.id ?? ""}
                onChange={(e) => {
                    const val = e.target.value;
                    const next = options.find(o => String(o.id) === val) ?? null;
                    setCharacter(next ? { id: next.id, name: next.name } : null);
                    updateQuery(next);
                }}
                >
                <option value="">Select character…</option>
                {options.map(o => (
                    <option key={o.id} value={o.id}>{o.name}</option>
                ))}
                </select>

                <div className="ml-auto text-xs text-slate-300">
                {character ? `HP ${Math.round(hp)}  ATK ${Math.round(atk)}  DEF ${Math.round(def)}` : ""}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <label className="text-sm text-slate-300">Level</label>
                <input
                type="range"
                min={1}
                max={90}
                value={level}
                onChange={(e) => setLevel(parseInt(e.target.value))}
                className="flex-1"
                />
                <span className="w-10 text-right text-slate-200">{level}</span>

                <label className="ml-6 text-sm text-slate-300">Asc.</label>
                <select
                className="bg-slate-900 rounded px-2 py-1"
                value={ascension}
                onChange={(e) => setAscension(parseInt(e.target.value))}
                >
                {[0,1,2,3,4,5,6].map(a => <option key={a} value={a}>{a}</option>)}
                </select>
            </div>
        </div>
    );
}