import Image from "next/image";
import { Plus } from "lucide-react";
import { useMemo, useCallback, useEffect, useState } from "react";
import { EchoStat } from "@/lib/types";
import { Echo } from "./EchoCard";

export type EchoCost = 1 | 3 | 4;
export type StatKey = EchoStat | "";

export interface EchoMeta {
	id: number;
	name: string;
	cost: EchoCost;
	class: "Common" | "Elite" | "Overlord" | "Calamity";
	sets: string[];
	portraitURL: string;
	setURL: string[];
}

export interface EchoValue {
	stat: StatKey;
	value: number;
}

export interface EchoPiece {
	id: string;
	level: number; 
	setName: string;
	cost: EchoCost;
	main: EchoValue;
	secondary: { stat: EchoStat; value: number }; 
	substats: EchoValue[]; 
	selectedEchoId?: number;
}

const PERCENT_STATS = new Set<EchoStat>([
	"atk%", "hp%", "def%", "critRate", "critDmg",
	"basicDmgBonus", "skillDmgBonus", "heavyDmgBonus", "liberationDmgBonus",
	"glacioDmgBonus", "fusionDmgBonus", "electroDmgBonus", "aeroDmgBonus",
	"spectroDmgBonus", "havocDmgBonus", "energyRegen"
]);

const ROLL_TIERS: Partial<Record<EchoStat, number[]>> = {
	// TODO: Add all of the different tiers for each stat
	critRate: [6.3, 6.9, 7.5, 8.1, 8.7, 9.3, 9.9, 10.5],
};

function format(stat: StatKey, v: number) {
  return stat && PERCENT_STATS.has(stat as EchoStat) ? `${v}%` : `${v}`;
}


function secondaryStatType(cost: EchoCost): EchoStat {
  return cost === 1 ? "hp" : "atk";
}

interface NumberInputProps {
	value: number | undefined;
	onChange: (val: number) => void;
	id?: string;
	placeholder?: string;
	className?: string;
}

function NumberInput({ value, onChange, id, placeholder, className }: NumberInputProps){
	return (
		<input 
			id={id}
			type="number"
			step="0.1"
			className={`w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className ?? ""}`}
			value={Number.isFinite(value) ? value : ("" as any)}
			onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
      		placeholder={placeholder}
		/>
	);
}

interface StatSelectProps {
	value: StatKey;
	onChange: (val: StatKey) => void;
	id?: string;
	className?: string;
	options: StatKey[];
}

function StatSelect({ value, onChange, id, className, options }: StatSelectProps) {
	return (
		<select
			id={id}
			className={`w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className ?? ""}`}
			value={value}
			onChange={(e) => onChange(e.target.value as StatKey)}
		>
			{options.map((s) => (
				<option key={s} value={s}>{s === "" ? "-select-": s}</option>
			))}
		</select>
	);
}

interface ValueFieldProps {
	stat: StatKey;
	value: number;
	onChange: (v: number) => void;
	id?: string;
	placeholder?: string;
}

function ValueField({ stat, value, onChange, id, placeholder }: ValueFieldProps) {
	const tiers = stat ? ROLL_TIERS[stat as EchoStat] : undefined;
	if (tiers?.length) {
		return (
			<select
				id={id}
				className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
				value={value}
				onChange={(e) => onChange(Number(e.target.value))}
			>
				<option value={0}>— select —</option>
				{tiers.map((t) => (
					<option key={t} value={t}>{format(stat, t)}</option>
				))}
			</select>
		);
	}

	return <NumberInput id={id} value={value} onChange={onChange} placeholder={placeholder} />;
}


interface EchoPickerProps {
	echoes: EchoMeta[];
	onPick: (e: EchoMeta) => void;
}

function EchoPicker({ echoes, onPick }: EchoPickerProps) {
	const [open, setOpen] = useState(false);
	const [q, setQ] = useState("");

	const filtered = useMemo(() => {
		const t = q.trim().toLowerCase();
		if (!t) return echoes;
		return echoes.filter(
			(e) =>
				e.name.toLowerCase().includes(t) ||
				e.sets.some((s) => s.toLowerCase().includes(t)) ||
				String(e.cost) === t
		);
	}, [q, echoes]);

	return (
    <div className="relative">
      <button
        type="button"
        className="rounded-full border border-gray-600 p-3 text-gray-300 hover:text-white hover:border-gray-400"
        onClick={() => setOpen((o) => !o)}
        aria-label="Pick Echo"
      >
        <Plus className="h-6 w-6" />
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-[28rem] max-h-[24rem] overflow-auto rounded-xl border border-gray-800 bg-gray-950 p-3 shadow-xl">
          <input
            autoFocus
            className="mb-2 w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search echoes by name, set, or cost..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-2">
            {filtered.map((e) => (
              <button
                key={e.id}
                onClick={() => { onPick(e); setOpen(false); }}
                className="flex items-center gap-3 rounded-lg border border-gray-800 bg-gray-900/70 p-2 text-left hover:bg-gray-800"
              >
                <Image src={e.portraitURL} alt={e.name} width={40} height={40} className="rounded-full" />
                <div className="min-w-0">
                  <div className="truncate text-sm text-gray-100">{e.name}</div>
                  <div className="truncate text-xs text-gray-400">Cost {e.cost} · {e.sets.join(", ")}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const MAIN_STATS: StatKey[] = [
	"", "atk", "atk%", "hp", "hp%", "def", "def%",
	"critRate", "critDmg", "glacioDmgBonus", "fusionDmgBonus", "energyRegen",
	"electroDmgBonus", "aeroDmgBonus", "spectroDmgBonus", "havocDmgBonus",
];

const SUB_STATS: StatKey[] = [
	"", "atk", "atk%", "hp", "hp%", "def", "def%", "critRate", "critDmg", 
	"heavyDmgBonus", "basicDmgBonus", "skillDmgBonus", "liberationDmgBonus", "energyRegen"
];

export interface EchoBoxProps {
	echoes: EchoMeta[];
	value: EchoPiece;
	onChange: (next: EchoPiece) => void;
	title?: string;
	secondaryScaler?: (level: number, cost: EchoCost) => number;
}
