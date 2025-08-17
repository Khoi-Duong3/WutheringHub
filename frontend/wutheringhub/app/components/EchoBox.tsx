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
	critDmg: [12.6, 13.8, 15.0, 16.2, 17.4, 18.6, 19.8, 21.0],
	energyRegen: [6.8, 7.6, 8.4, 9.2, 10.0, 10.8, 11.6, 12.4],
	basicDmgBonus: [6.4, 7.1, 7.9, 8.6, 9.4, 10.1, 10.9, 11.6],
	heavyDmgBonus: [6.4, 7.1, 7.9, 8.6, 9.4, 10.1, 10.9, 11.6],
	skillDmgBonus: [6.4, 7.1, 7.9, 8.6, 9.4, 10.1, 10.9, 11.6],
	liberationDmgBonus: [6.4, 7.1, 7.9, 8.6, 9.4, 10.1, 10.9, 11.6],
	hp: [320.0, 360.0, 430.0, 470.0, 510.0, 540.0, 580.0],
	"hp%": [6.4, 7.1, 7.9, 8.6, 9.4, 10.1, 10.9, 11.6],
	"atk%": [6.4, 7.1, 7.9, 8.6, 9.4, 10.1, 10.9, 11.6],
	"def%": [8.1, 9.0, 10.0, 10.9, 11.8, 12.8, 13.8, 14.7],
	atk: [30.0, 40.0, 50.0, 60.0],
	def: [40.0, 50.0, 60.0, 70.0]
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

const dmgBonusesFromMain = MAIN_STATS.filter(
  (s): s is EchoStat => s !== "" && (s as string).endsWith("DmgBonus")
);
const PERCENT_BASICS: EchoStat[] = ["atk%", "hp%", "def%"];

const allowedMainStatsByCost = (cost: EchoCost): StatKey[] => {
  switch (cost) {
    case 1:
      // 1-cost → only % basics
      return ["", ...PERCENT_BASICS];
    case 4:
      // 4-cost → % basics + crits
      return ["", "critRate", "critDmg", ...PERCENT_BASICS];
    case 3:
    default:
      // 3-cost → % basics + energyRegen + all elemental damage bonuses
      return ["", "energyRegen", ...PERCENT_BASICS, ...dmgBonusesFromMain];
  }
};

export interface EchoBoxProps {
	echoes: EchoMeta[];
	value: EchoPiece;
	onChange: (next: EchoPiece) => void;
	title?: string;
	secondaryScaler?: (level: number, cost: EchoCost) => number;
}

export default function EchoBox({echoes,value,onChange,title = "Echo Slot", secondaryScaler = (level, cost) => {
	const base = cost === 1 ? 140 : 260;
    const per = cost === 1 ? 3.2 : 5.5;
    return Math.round((base + level * per) * 10) / 10;
  },
}: EchoBoxProps) {

	const update = useCallback(
		(patch: Partial<EchoPiece>) => onChange({ ...value, ...patch}),
		[onchange, value]
	);

	const subStats = useMemo(() => {
		const subs = [...value.substats];
		while (subs.length < 5) subs.push({ stat: "", value: 0});
		return subs.slice(0,5);
	}, [value.substats])

	const selectedEcho = useMemo(
		() => echoes.find((e) => e.id === value.selectedEchoId),
		[echoes, value.selectedEchoId]
	);

	const effectiveCost: EchoCost = selectedEcho?.cost ?? value.cost;
	const secondaryType = secondaryStatType(effectiveCost);
	const secondaryValue = useMemo(
		() => secondaryScaler(value.level, effectiveCost),
		[value.level, effectiveCost, secondaryScaler]
	);

	useEffect(() => {
		if (value.secondary.stat !== secondaryType || value.secondary.value !== secondaryValue){
			update({ secondary: {stat: secondaryType, value: secondaryValue}});
		}
	}, [secondaryType, secondaryValue, value.secondary.stat, value.secondary.value, update])

	const setOptions = selectedEcho?.sets ?? [];

	return (
		<div className="rounded-2xl border border-gray-800 bg-gray-950/70 p-4 shadow-lg">
			<div className="mb-4 flex items-center justify-between">
				<h3 className="text-sm font-semibold text-gray-200">{title}</h3>
				<span className="rounded-md bg-gray-800 px-2 py-1 text-xs text-gray-300">Cost {effectiveCost}</span>
			</div>

			<div className="mb-3 flex items-center gap-3"> 
				{selectedEcho ? (
					<Image src={selectedEcho.portraitURL} alt={selectedEcho.name} width={56} height={56} className="rounded-full border border-gray-700" />
				) : (
					<div className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-700">
						<Plus className="h-6 w-6 text-gray-300" />
					</div>
				)}

				<div className="flex items-center gap-3">
					<EchoPicker 
						echoes={echoes}
						onPick={(e) => 
							update({ selectedEchoId: e.id, cost: e.cost, setName: e.sets[0] ?? ""})
						}
					/>
					<div className="min-w-0">
						<div className="truncate text-sm text-gray-100">{selectedEcho ? selectedEcho.name : "Pick an Echo"}</div>
						<div className="truncate text-xs text-gray-400">{selectedEcho ? selectedEcho.sets.join(" · ") : "—"}</div>
					</div>
				</div>
			</div>

			<div className="mb-3">
				<div className="mb-1 text-xs text-gray-400">Level {value.level}</div>
				<input 
					type="range"
					min={0}
					max={25}
					value={value.level}
					onChange={(e) => update({ level: Number(e.target.value)})}
					className="w-full"
				/>
			</div>

			<label className="mb-1 block text-xs text-gray-400">Set</label>
			<select
				className="mb-3 w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
				value={value.setName}
				onChange={(e) => update ({ setName: e.target.value})}
				disabled={!selectedEcho}
			>
				{!selectedEcho && <option value="">Pick an Echo</option>}
				{setOptions.map((s) => (
					<option key={s} value={s}>{s}</option>
				))}
			</select>

			<div className="grid grid-cols-2 gap-2">
				<div>
					<label className="mb-1 block text-xs text-gray-400">Main Stat</label>
					<StatSelect value={value.main.stat} onChange={(stat) => update({ main: { ...value.main, stat } })} options={MAIN_STATS} />
				</div>
				<div>
					<label className="mb-1 block text-xs text-gray-400">Main Value</label>
					<ValueField stat={value.main.stat} value={value.main.value} onChange={(num) => update({ main: { ...value.main, value: num } })} />
				</div>
			</div>

			<div className="mt-3 grid grid-cols-2 gap-2">
				<div>
					<label className="mb-1 block text-xs text-gray-400">Secondary Stat</label>
					<div className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-300">
						{secondaryType.toUpperCase()}
					</div>
				</div>
				<div>
					<label className="mb-1 block text-xs text-gray-400">Secondary Value</label>
					<div className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-300">
            			{format(secondaryType, secondaryValue)}
          			</div>
				</div>
			</div>

			<div className="mt-4">
				<div className="mb-1 text-xs text-gray-400">Substats (5/5)</div>
				<div className="space-y-2">
					{subStats.map((ss,index) => (
						<div key={index} className="grid grid-cols-12 items-center gap-2">
							<div className="col-span-7">
								<StatSelect 
									value={ss.stat}
									onChange={(stat) => {
										const next = [...value.substats];
										next[index] = { ...next[index], stat};
										update({ substats: next});
									}}
									options={SUB_STATS}
								/>
							</div>
							<div className="col-span-5">
								<ValueField 
									stat={ss.stat}
									value={ss.value}
									onChange={(num) => {
										const next = [...value.substats];
										next[index] = { ...next[index], value: num};
										update({ substats: next});
									}}
								/>
							</div>
						</div>
					))}
				</div>
			</div>	
		</div>
	);
}