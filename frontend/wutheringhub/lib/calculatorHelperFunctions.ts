import { Echo } from "@/app/components/EchoCard";
import { EchoStat } from "@/lib/types";
import { AttackType, ElementType } from "@/lib/types";

export function calculateTotalAttack( baseAtk: number, echoStats: Record<EchoStat, number>) : number {
    const atkPercent = echoStats["atk%"] ?? 0;
    const flatAtk = echoStats["atk"] ?? 0;
    return Math.round(baseAtk * (1 + (atkPercent / 100)) + flatAtk);
}

export function calculateTotalDefense(baseDef: number, echoStats: Record<EchoStat, number>) : number {
    const defPercent = echoStats["def%"] ?? 0;
    const flatDef = echoStats["atk"] ?? 0;
    return Math.round(baseDef * (1 + (defPercent / 100)) + flatDef);
}

export function calculateTotalHP(baseHP: number, echoStats: Record<EchoStat, number>) : number {
    const hpPercent = echoStats["hp%"] ?? 0;
    const flatHp = echoStats["hp"] ?? 0;
    return Math.round(baseHP * (1 + (hpPercent / 100)) + flatHp);
}

export function calculateTotalBonus(attackType: AttackType, elementType: ElementType, echoStats: Record<EchoStat, number>) : number {
    const typeKey = `${attackType}DmgBonus` as EchoStat;
    const elementKey = `${elementType}DmgBonus` as EchoStat;

    const typeBonus = (echoStats[typeKey] ?? 0) / 100;
    const elementBonus = (echoStats[elementKey] ?? 0 ) / 100;

    return 1 + typeBonus + elementBonus
}