import EchoBox, { EchoMeta, EchoPiece, EchoCost } from "./EchoBox";
import { Plus } from "lucide-react";
import { useMemo } from "react";

export interface WeaponData {
    id?: number | string;
    name?: string;
    iconURL?: string;
}

export interface LoadoutGridProps {
    echoes: EchoMeta[];
    pieces: EchoPiece[];                              
    onChangePiece: (slot: number, next: EchoPiece) => void;

    weapon?: WeaponData;                              
    onChangeWeapon?: (patch: Partial<WeaponData>) => void;

    className?: string;
    compactScale?: number;                            
}

function makeEmptyPiece(slot: number): EchoPiece {
    return {
        id: `slot-${slot}`,
        level: 25,
        setName: "",
        cost: 1 as EchoCost,
        main: { stat: "", value: 0 },
        secondary: { stat: "hp", value: 0 },          
        substats: [],
        selectedEchoId: undefined,
    };
}

function Shrink({
    children,
    scale = 0.8,
}: {
    children: React.ReactNode;
    scale?: number;
}) {
    return (
        <div
        className="origin-top-left [transform:translateZ(0)]"
        style={{ transform: `scale(${scale})` }}
        >
        <div className="max-w-[520px]">{children}</div>
        </div>
    );
}

function WeaponCard({
    weapon,
    onChange,
}: {
  weapon?: WeaponData;
  onChange?: (patch: Partial<WeaponData>) => void;
}) {
  const pickWeapon = () => onChange?.({ id: 0 });

  return (
    <div className="flex min-h-[180px] items-center justify-center rounded-2xl border border-gray-800 bg-gray-950/70 p-4 shadow-lg">
      {weapon?.iconURL ? (
        <div className="flex items-center gap-3">
          <img src={weapon.iconURL} alt={weapon.name ?? "Weapon"} className="h-12 w-12 rounded-md" />
          <div className="min-w-0">
            <div className="truncate text-sm text-gray-100">{weapon.name ?? "Weapon"}</div>
            <button
              className="mt-1 rounded-md border border-gray-700 px-2 py-1 text-xs text-gray-300 hover:bg-gray-800"
              onClick={pickWeapon}
            >
              Change
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={pickWeapon}
          className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-gray-700 px-6 py-8 text-gray-300 hover:border-gray-500 hover:bg-gray-800/40"
        >
          <Plus className="h-6 w-6" />
          <span className="text-xs">Select Weapon</span>
        </button>
      )}
    </div>
  );
}

export default function LoadoutGrid({
    echoes,
    pieces,
    onChangePiece,
    weapon,
    onChangeWeapon,
    className,
    compactScale = 0.8,
}: LoadoutGridProps) {
  const slots = useMemo(() => {
    const arr = Array.from({ length: 5 }, (_, i) => pieces[i] ?? makeEmptyPiece(i));
    return arr as EchoPiece[];
  }, [pieces]);

  return (
    <section className={`mx-auto w-fit ${className ?? ""}`}>
    
    <div className="grid grid-flow-col auto-cols-[356px] gap-x-4">
      <div className="min-w-0">
        <EchoBox
            echoes={echoes}
            value={slots[0]}
            onChange={(next) => onChangePiece(0, next)}
            title="Echo 1"
        />
      </div>

      <div className="min-w-0">
        <EchoBox
            echoes={echoes}
            value={slots[1]}
            onChange={(next) => onChangePiece(1, next)}
            title="Echo 2"
        />
      </div>

      <div className="min-w-0">
        <EchoBox
            echoes={echoes}
            value={slots[2]}
            onChange={(next) => onChangePiece(2, next)}
            title="Echo 3"
        />

      </div>

      <div className="min-w-0">
          <EchoBox
            echoes={echoes}
            value={slots[3]}
            onChange={(next) => onChangePiece(3, next)}
            title="Echo 4"
        />
      </div>

      <div className="min-w-0">
          <EchoBox
            echoes={echoes}
            value={slots[4]}
            onChange={(next) => onChangePiece(4, next)}
            title="Echo 5"
        />
      </div>
    </div>
  </section>
  );
}
