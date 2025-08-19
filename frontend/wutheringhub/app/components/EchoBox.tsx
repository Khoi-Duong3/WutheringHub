import Image from "next/image";
import { Plus } from "lucide-react";
import { useMemo, useCallback, useEffect, useState, ReactElement, MouseEventHandler, cloneElement, useRef } from "react";
import { EchoStat } from "@/lib/types";

export type EchoCost = 1 | 3 | 4;
export type StatKey = EchoStat | "";

type SetOption = { value: string; label: string; icon?: string };

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

interface ValueFieldProps {
	stat: StatKey;
	value: number;
	onChange: (v: number) => void;
	id?: string;
	placeholder?: string;
}

function ValueField({ stat, value, onChange, id, placeholder }: ValueFieldProps) {
  if (!stat) {
    return (
      <div
        id={id}
        className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-400"
      >
        —
      </div>
    );
  }

  const tiers = ROLL_TIERS[stat as EchoStat];
  if (tiers?.length) {
    return (
		<div className="relative">
			<select
				id={id}
				className="w-full appearance-none rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 pr-8 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
				value={value}
				onChange={(e) => onChange(Number(e.target.value))}
				>
				<option value={0}>0%</option>
				{tiers.map((t) => (
					<option key={t} value={t}>
					{format(stat, t)}
					</option>
				))}
				</select>
				<svg
					width="16"
					height="16"
					viewBox="0 0 20 20"
					className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 opacity-70"
					>
					<path d="M5 7l5 6 5-6H5z" fill="currentColor" />
				</svg>
		</div>
    	);
	}

  return (
    <NumberInput id={id} value={value} onChange={onChange} placeholder={placeholder} />
  );
}


interface EchoPickerProps {
	echoes: EchoMeta[];
	onPick: (e: EchoMeta) => void;
	trigger?: ReactElement<{
		onClick?: MouseEventHandler;
		className?: string;
		title?: string;
		"aria-label"?: string;
	}>
}

function EchoPicker({ echoes, onPick, trigger }: EchoPickerProps) {
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

	const DefaultTrigger = (
		<button
			type="button"
			className="rounded-full border border-gray-600 p-3 text-gray-300 hover:text-white hover:border-gray-400"
			aria-label="Pick Echo"
			title="Pick Echo"
		>
			<Plus className="h-6 w-6" />
		</button>
	)

	const TriggerEl = trigger ?? DefaultTrigger;

	return (
		<div className="relative inline-block">
			{cloneElement(TriggerEl, {
				onClick: (e: any) => {
				TriggerEl.props?.onClick?.(e);
				setOpen((o) => !o);
				},
			})}

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
						onClick={() => {
						onPick(e);
						setOpen(false);
						}}
						className="flex items-center gap-3 rounded-lg border border-gray-800 bg-gray-900/70 p-2 text-left hover:bg-gray-800"
					>
						<Image
						src={e.portraitURL}
						alt={e.name}
						width={40}
						height={40}
						className="rounded-full"
						/>
						<div className="min-w-0">
						<div className="truncate text-sm text-gray-100">{e.name}</div>
						<div className="truncate text-xs text-gray-400">
							Cost {e.cost} · {e.sets.join(", ")}
						</div>
						</div>
					</button>
					))}
				</div>
				</div>
				)}
		</div>
	);
}

interface SetSelectWithIconProps {
	value: string;
	options: SetOption[];
	onChange: (v: string) => void;
	id?: string;
	className?: string;
	placeholder?: string;
	disabled?: boolean;
	
};

function SetSelectWithIcon({value, options, onChange, id, className, placeholder="-select-", disabled}: SetSelectWithIconProps) {
	const [open, setOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement | null>(null);
	const current = options.find(o => o.value === value);

	useEffect(() => {
		if (!open) return;
		const onDown = (e: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
		};
		const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
		document.addEventListener("mousedown", onDown);
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("mousedown", onDown);
			document.removeEventListener("keydown", onKey);
		};
	}, [open]);

	return(
		<div className="relative">
			<button
				type="button"
				id={id}
				className={`flex w-full items-center justify-between rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className ?? ""} ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
				onClick={() => !disabled && setOpen(o => !o)}
				aria-haspopup="listbox"
				aria-expanded={open}
				aria-disabled={disabled || undefined}
			>
				<span className="flex items-center gap-2 truncate">
				{current?.icon && <img src={current.icon} alt="" className="h-4 w-4 rounded-sm" />}
				<span className="truncate">{current?.label ?? placeholder}</span>
				</span>
				<svg width="16" height="16" viewBox="0 0 20 20" className="opacity-70">
					<path d="M5 7l5 6 5-6H5z" fill="currentColor" />
				</svg>
			</button>

			{open && (
				<div
				ref={menuRef}
				className="absolute z-20 mt-2 max-h-64 w-full overflow-auto rounded-lg border border-gray-800 bg-gray-950 p-1 shadow-xl"
				role="listbox"
				>
				{options.map(o => {
					const selected = o.value === value;
					return (
					<button
						key={o.value}
						className={`flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm hover:bg-gray-800 ${selected ? "bg-gray-800" : ""}`}
						onClick={() => { onChange(o.value); setOpen(false); }}
						role="option"
						aria-selected={selected}
					>
						{o.icon && <img src={o.icon} alt="" className="h-4 w-4 rounded-sm" />}
						{o.label}
					</button>
					);
				})}
				</div>
			)}
		</div>
  	)
}

const MAIN_STATS: StatKey[] = [
	"", "atk", "atk%", "hp", "hp%", "def", "def%",
	"critRate", "critDmg", "glacioDmgBonus", "fusionDmgBonus", "energyRegen",
	"electroDmgBonus", "aeroDmgBonus", "spectroDmgBonus", "havocDmgBonus", "healingBonus"
];

const SUB_STATS: StatKey[] = [
	"", "atk", "atk%", "hp", "hp%", "def", "def%", "critRate", "critDmg", 
	"heavyDmgBonus", "basicDmgBonus", "skillDmgBonus", "liberationDmgBonus", "energyRegen"
];

export const STAT_LABELS: Partial<Record<EchoStat, string>> = {
	atk: "ATK",
	"atk%": "ATK%",
	hp: "HP",
	"hp%": "HP%",
	def: "DEF",
	"def%": "DEF%",
	critRate: "Crit. Rate",
	critDmg: "Crit. DMG",
	energyRegen: "Energy Regen",
	glacioDmgBonus: "Glacio DMG",
	fusionDmgBonus: "Fusion DMG",
	electroDmgBonus: "Electro DMG",
	aeroDmgBonus: "Aero DMG",
	spectroDmgBonus: "Spectro DMG",
	havocDmgBonus: "Havoc DMG",
	basicDmgBonus: "Basic Attack DMG",
	heavyDmgBonus: "Heavy Attack DMG",
	skillDmgBonus: "Skill DMG",
	liberationDmgBonus: "Liberation DMG",
	healingBonus: "Healing Bonus",
} as const;



export const STAT_ICON_URL: Partial<Record<EchoStat, string>> = {
	critRate: "/statIcon/critRate.webp",
	critDmg: "/statIcon/critDmg.webp",
	"atk%": "/statIcon/atk.webp",
	"hp%": "/statIcon/hp.webp",
	"def%": "/statIcon/defense.webp",
	def: "/statIcon/defense.webp",
	atk: "/statIcon/atk.webp",
	hp: "/statIcon/hp.webp",
	energyRegen: "/statIcon/energyRegen.webp",
	healingBonus: "/statIcon/healingBonus.webp",
	basicDmgBonus: "/statIcon/basicDmgBonus.webp",
	heavyDmgBonus: "/statIcon/heavyDmgBonus.webp",
	skillDmgBonus: "/statIcon/skillDmgBonus.webp",
	liberationDmgBonus: "/statIcon/liberationDmgBonus.webp",
	glacioDmgBonus: "/statIcon/glacioDmgBonus.webp",
	fusionDmgBonus: "/statIcon/fusionDmgBonus.webp",
	spectroDmgBonus: "/statIcon/spectroDmgBonus.webp",
	aeroDmgBonus: "/statIcon/aeroDmgBonus.webp",
	electroDmgBonus: "/statIcon/electroDmgBonus.webp",
	havocDmgBonus: "/statIcon/havocDmgBonus.webp",
} as const;

interface StatSelectProps {
	value: StatKey;
	onChange: (val: StatKey) => void;
	id?: string;
	className?: string;
	options: StatKey[];
}

function StatSelect({ value, onChange, id, className, options }: StatSelectProps) {
	const [open, setOpen] = useState(false);
  	const menuRef = useRef<HTMLDivElement | null>(null);
  	const listboxId = id ? `${id}-listbox` : undefined;


 	const currentLabel = value === "" ? "-select-" : (STAT_LABELS[value] ?? (value as string));
  	const currentIcon = value === "" ? undefined : STAT_ICON_URL[value];

  
  	useEffect(() => {
    	if (!open) return;
    	const onDown = (e: MouseEvent) => {
      		if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    	};
    	const onKey = (e: KeyboardEvent) => {
      		if (e.key === "Escape") setOpen(false);
    	};
    	document.addEventListener("mousedown", onDown);
    	document.addEventListener("keydown", onKey);
    	return () => {
      	document.removeEventListener("mousedown", onDown);
      	document.removeEventListener("keydown", onKey);
    	};
  	}, [open]);

  	return (
    	<div className="relative">
      		{id && (
        	<input
          		id={id}
          		className="sr-only absolute"
          		onFocus={() => setOpen(true)}
          		value={currentLabel}
          		readOnly
        	/>
      		)}
			<button
				type="button"
				className={`flex w-full items-center justify-between rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className ?? ""}`}
				onClick={() => setOpen(o => !o)}
				aria-haspopup="listbox"
				aria-expanded={open}
				aria-controls={listboxId}
			>
				<span className="flex items-center gap-2 truncate">
					{currentIcon && <img src={currentIcon} alt="" className="h-4 w-4 rounded-sm" />}
					<span className="truncate">{currentLabel}</span>
				</span>
				<svg width="16" height="16" viewBox="0 0 20 20" className="opacity-70">
					<path d="M5 7l5 6 5-6H5z" fill="currentColor" />
				</svg>
      		</button>
			{open && (
				<div
				ref={menuRef}
				id={listboxId}
				className="absolute z-20 mt-2 max-h-64 w-full overflow-auto rounded-lg border border-gray-800 bg-gray-950 p-1 shadow-xl"
				role="listbox"
				>
				<button
					className={`flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm hover:bg-gray-800 ${value === "" ? "bg-gray-800" : ""}`}
					onClick={() => { onChange(""); setOpen(false); }}
					role="option"
					aria-selected={value === ""}
				>
					-select-
				</button>

				{options.filter((o): o is EchoStat => o !== "").map((o) => {
					const label = STAT_LABELS[o] ?? o;
					const icon = STAT_ICON_URL[o];
					const selected = value === o;
					return (
					<button
						key={o}
						className={`flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm hover:bg-gray-800 ${selected ? "bg-gray-800" : ""}`}
						onClick={() => { onChange(o); setOpen(false); }}
						role="option"
						aria-selected={selected}
					>
						{icon && <img src={icon} alt="" className="h-4 w-4 rounded-sm" />}
						{label}
					</button>
					);
				})}
				</div>
			)}
    </div>
  );
}

const dmgBonusesFromMain = MAIN_STATS.filter(
  (s): s is EchoStat => s !== "" && (s as string).endsWith("DmgBonus")
);
const PERCENT_BASICS: EchoStat[] = ["atk%", "hp%", "def%"];

const allowedMainStatsByCost = (cost: EchoCost): StatKey[] => {
  switch (cost) {
    case 1:
      return ["", ...PERCENT_BASICS];
    case 4:
      return ["", "critRate", "critDmg", "healingBonus", ...PERCENT_BASICS];
    case 3:
      return ["", "energyRegen", ...PERCENT_BASICS, ...dmgBonusesFromMain];
  }
};

const LEVEL_STEPS = [0, 5, 10, 15, 20, 25] as const;
type StepIndex = 0 | 1 | 2 | 3 | 4 | 5;

const snapLevel = (n: number) => {
	const clamped = Math.max(0, Math.min(25, Math.round(n)));
	return Math.round(clamped / 5) * 5;
};

const levelToIndex = (level: number): StepIndex => (snapLevel(level) / 5) as StepIndex;

type StepArray = readonly [number, number, number, number, number, number];

const MAIN_VALUE_TABLE: Record<EchoCost, Partial<Record<EchoStat, StepArray>>> = {
	1: {
		"atk%": [3.6, 6.5, 9.4, 12.2, 15.1, 18.0] as const,
		"hp%": [4.6, 8.2, 11.9, 15.5, 19.2, 22.8] as const,
		"def%": [3.6, 6.5, 9.4, 12.2, 15.1, 18.0] as const
	},
	3: {
		"atk%": [6, 10.8, 15.6, 20.4, 25.2, 30.0] as const,
		"hp%": [6, 10.8, 15.6, 20.4, 25.2, 30.0] as const,
		"def%": [7.6, 13.7, 19.8, 25.8, 31.9, 38.0] as const,
		"aeroDmgBonus": [6, 10.8, 15.6, 20.4, 25.2, 30.0] as const,
		"havocDmgBonus": [6, 10.8, 15.6, 20.4, 25.2, 30.0] as const,
		"electroDmgBonus": [6, 10.8, 15.6, 20.4, 25.2, 30.0] as const,
		"glacioDmgBonus": [6, 10.8, 15.6, 20.4, 25.2, 30.0] as const,
		"fusionDmgBonus": [6, 10.8, 15.6, 20.4, 25.2, 30.0] as const,
		"spectroDmgBonus": [6, 10.8, 15.6, 20.4, 25.2, 30.0] as const,
		"energyRegen": [6.4, 11.5, 16.6, 21.8, 26.9, 32.0] as const
	},
	4: {
		"atk%": [6.6, 11.9, 17.2, 22.4, 27.7, 33.0] as const,
		"hp%": [6.6, 11.9, 17.2, 22.4, 27.7, 33.0] as const,
		"def%": [8.4, 15.0, 21.7, 28.4, 35.1, 41.8] as const,
		"critDmg": [8.8, 15.8, 22.9, 29.9, 37.0, 44.0] as const,
		"critRate": [4.4, 7.9, 11.4, 15.0, 18.5, 22.0] as const, 
		"healingBonus": [5.3, 9.5, 13.7, 18.0, 22.2, 26.4] as const
	}
} as const;

function getMainValue(cost: EchoCost, stat: StatKey, level: number): number {
  if (!stat) return 0;
  const row = MAIN_VALUE_TABLE[cost][stat];
  return row ? row[levelToIndex(level)] : 0;
}

const secondaryStatType = (cost: EchoCost): EchoStat => (cost === 1 ? "hp" : "atk");
type FlatSecondary = "atk" | "hp";

const SECONDARY_VALUE_TABLE: Record<EchoCost, Partial<Record<FlatSecondary, StepArray>>> = {
	1: {
		hp: [456.0, 820.0, 1185.0, 1550.0, 1915.0, 2280.0] as const
	},

	3: {
		atk: [20.0, 36.0, 52.0, 68.0, 84.0, 100] as const
	},

	4: {
		atk: [30.0, 54.0, 78.0, 102.0, 126.0, 150.0] as const
	}
} as const;

function getSecondaryValue(cost: EchoCost, level: number, fallback?: (lvl:number, c:EchoCost)=>number) {
  const type: FlatSecondary = cost === 1 ? "hp" : "atk";
  const row = SECONDARY_VALUE_TABLE[cost]?.[type];
  if (row) return row[levelToIndex(level)] ?? 0;
  return fallback ? fallback(level, cost) : 0;
}

export interface EchoBoxProps {
	echoes: EchoMeta[];
	value: EchoPiece;
	onChange: (next: EchoPiece) => void;
	title?: string;
	secondaryScaler?: (level: number, cost: EchoCost) => number;
}

export default function EchoBox({echoes,value,onChange,title = "Echo Slot"}: EchoBoxProps) {

	const update = useCallback(
		(patch: Partial<EchoPiece>) => onChange({ ...value, ...patch}),
		[onChange, value]
	);

	useEffect(() => {
  		if (value.level == null || value.level === 0) {
    	update({ level: 25 });
  		}
	}, []);

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

	const allowedMainStats = useMemo(() => allowedMainStatsByCost(effectiveCost), [effectiveCost]);
	const mainValue = useMemo (() => getMainValue(effectiveCost, value.main.stat, value.level), [effectiveCost, value.main.stat, value.level])
	const secondaryType = secondaryStatType(effectiveCost);
	const secondaryValue = useMemo(
		() => getSecondaryValue(effectiveCost, value.level), [effectiveCost, value.level]
	);


	useEffect(() => {
		if (value.secondary.stat !== secondaryType || value.secondary.value !== secondaryValue){
			update({ secondary: {stat: secondaryType, value: secondaryValue}});
		}
	}, [secondaryType, secondaryValue, value.secondary.stat, value.secondary.value, update])

	useEffect(() => {
		if (!allowedMainStats.includes(value.main.stat)) {
			update({ main: {stat: "", value: 0}});
		}
	})

	useEffect(() => {
		if (value.main.stat && value.main.value !== mainValue) {
			update({ main: { ...value.main, value: mainValue}})
		}
	}, [mainValue, value.main.stat, value.main.value, update])

	const setOptions = useMemo<SetOption[]>(() => {
		if (!selectedEcho) return [];
		const urls = selectedEcho.setURL ?? [];
		return selectedEcho.sets.map((label, i) => ({
			value: label,
			label,
			icon: urls[i],
		}));
	}, [selectedEcho])

	return (
		<div className="rounded-2xl border border-gray-800 bg-gray-950/70 p-4 shadow-lg">
			<div className="mb-4 flex items-center justify-between">
				<h3 className="text-sm font-semibold text-gray-200">{title}</h3>
				<span className="rounded-md bg-gray-800 px-2 py-1 text-xs text-gray-300">Cost {effectiveCost}</span>
			</div>

			<div className="mb-3 flex items-center gap-3"> 
				<div className="flex items-center gap-3">
					<EchoPicker 
						echoes={echoes}
						onPick={(e) => 
							update({ selectedEchoId: e.id, cost: e.cost, setName: e.sets[0] ?? ""})
						}
						trigger={
							<button
								type="button"
								className="relative h-14 w-14 overflow-hidden rounded-full border border-gray-700 ring-0 hover:ring-2 hover:ring-indigo-500 focus:outline-none"
								title={selectedEcho ? "Change echo" : "Pick echo"}
								aria-label={selectedEcho ? "Change echo" : "Pick echo"}
							>
								{selectedEcho ? (
									<Image src={selectedEcho.portraitURL} alt={selectedEcho.name} fill sizes="56px" className="object-cover" />
								) : (
									<div className="flex h-full w-full items-center justify-center bg-gray-900">
										<Plus className="h-6 w-6 text-gray-300" />
									</div>
								)}
							</button>
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
					step={5}
					value={value.level}
					onChange={(e) => update({ level: snapLevel(Number(e.target.value)) })}
					className="w-full"
				/>
			</div>

			<label className="mb-1 block text-xs text-gray-400">Set</label>
			<SetSelectWithIcon 
				value={value.setName}
				options={setOptions}
				onChange={(v) => update({ setName: v})}
				disabled={!selectedEcho}
				className="mb-2"
			/>

			<div className="grid grid-cols-2 gap-2">
				<div>
					<label className="mb-1 block text-xs text-gray-400">Main Stat</label>
					<StatSelect value={value.main.stat} onChange={(stat) => update({ main: { ...value.main, stat } })} options={allowedMainStats} />
				</div>
				<div>
					<label className="mb-1 block text-xs text-gray-400">Main Value</label>
					<div className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-300">
    					{value.main.stat ? format(value.main.stat, mainValue) : "—"}
  					</div>
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