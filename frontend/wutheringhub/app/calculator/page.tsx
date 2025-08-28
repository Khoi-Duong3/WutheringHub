import { CalculatorProvider, type BaseRow, type CharacterBasic } from "../components/CalculatorProvider";
import LoadoutGridConnected from "../components/LoadoutGridConnected";
import type { EchoMeta } from "../components/EchoBox";

interface PageProps {
  	searchParams: Record<string, string | string[] | undefined>;
}

async function fetchRows(characterId: string): Promise<BaseRow[] | null> {

	const res = await fetch(`${process.env.API_BASE}/api/characters/${characterId}/stats/all`, {
		cache: "no-store",
	});
	if (!res.ok) return null;
	const data: { characterId: number; rows: BaseRow[] } = await res.json();
	return data.rows ?? null;
}

export default async function Page({ searchParams }: PageProps) {
	const characterId = typeof searchParams.characterId === "string" ? searchParams.characterId : undefined;

	const initialRows = characterId ? await fetchRows(characterId) : null;
	const initialCharacter: CharacterBasic | null = characterId
		? { id: Number(characterId), name: "Selected", portraitURL: undefined }
		: null;

  
  	const echoes: EchoMeta[] = []; 

	return (
		
		<CalculatorProvider
		key={characterId ?? "none"}
		initialRows={initialRows}
		initialCharacter={initialCharacter}
		initialLevel={1}
		initialAscension={0}
		>
		<LoadoutGridConnected echoes={echoes} />
		</CalculatorProvider>
	);
}
