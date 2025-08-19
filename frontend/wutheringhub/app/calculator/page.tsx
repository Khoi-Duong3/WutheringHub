'use client';

import { useMemo, useState } from 'react';
import LoadoutGrid, { WeaponData } from '../components/LoadoutGrid';
import type { EchoMeta, EchoPiece, EchoCost } from '../components/EchoBox';


import echoesJson from '@/data/echoes.json';


function makeEmptyPiece(slot: number): EchoPiece {
  return {
    id: `slot-${slot}`,
    level: 25,
    setName: '',
    cost: 1 as EchoCost,
    main: { stat: '', value: 0 },
    secondary: { stat: 'hp', value: 0 }, 
    substats: [],
    selectedEchoId: undefined,
  };
}



export default function Page() {
  const echoes = useMemo(() => echoesJson as unknown as EchoMeta[], []);

  const [pieces, setPieces] = useState<EchoPiece[]>(
    Array.from({ length: 5 }, (_, i) => makeEmptyPiece(i))
  );

  const [weapon, setWeapon] = useState<WeaponData | undefined>(undefined);

  const onChangePiece = (slot: number, next: EchoPiece) => {
    setPieces((prev) => {
      const arr = [...prev];
      arr[slot] = next;
      return arr;
    });
  };

  return (
    <main className="mx-auto max-w-[1600px] px-4 py-6">
      <h1 className="mb-4 text-lg font-semibold text-gray-100">Loadout</h1>

      <LoadoutGrid
        echoes={echoes}
        pieces={pieces}
        onChangePiece={onChangePiece}
        weapon={weapon}
        onChangeWeapon={(patch) => setWeapon((w) => ({ ...w, ...patch }))}
        compactScale={0.75} 
      />
    </main>
  );
}
