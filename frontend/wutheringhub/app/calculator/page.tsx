import { CalculatorProvider, type BaseRow, type CharacterBasic } from "../components/CalculatorProvider";
import LoadoutGridConnected from "../components/LoadoutGridConnected";
import type { EchoMeta } from "../components/EchoBox";
import CharacterSlot, {type CharacterOption} from "../components/CharacterSlot";


export interface PageProps {
  	searchParams: Record<string, string | string[] | undefined>;
}

interface FetchRowsArgs { 
	characterId: string 
}

async function fetchRows({ characterId }: FetchRowsArgs): Promise<BaseRow[] | null> {
	const res = await fetch(`${process.env.API_BASE}/api/characters/${characterId}/stats/all`, { cache: "no-store" });
	if (!res.ok) return null;
	const data: { characterId: number; rows: BaseRow[] } = await res.json();
	return data.rows ?? null;
}

async function fetchCharacters(): Promise<CharacterOption[]> {
	const res = await fetch(`${process.env.API_BASE}/api/characters`, { cache: "no-store" });
	if (!res.ok) return [];
	return await res.json();
}

async function fetchEchoMeta(): Promise<EchoMeta[]> {
  	return []; 
}

export default async function Page({ searchParams }: PageProps) {
	const characterId = typeof searchParams.characterId === "string" ? searchParams.characterId : undefined;

	const [characters, echoes] = await Promise.all([fetchCharacters(), fetchEchoMeta()]);
	const initialRows = characterId ? await fetchRows({ characterId }) : null;

	const found = characterId
		? characters.find(c => String(c.id) === String(characterId)) ?? null
		: null;

	const initialCharacter: CharacterBasic | null = found
		? { id: found.id, name: found.name }
		: null;

	return (
		<CalculatorProvider
		key={characterId ?? "none"}
		initialRows={initialRows}
		initialCharacter={initialCharacter}
		initialLevel={1}
		initialAscension={0}
		>
		<div className="flex flex-col gap-4">
			<CharacterSlot options={characters} />
			<LoadoutGridConnected echoes={echoes} />
		</div>
		</CalculatorProvider>
	);
}
