import csv
from collections import defaultdict

MAPPINGELEMENT = {
    "1": "Glacio",
    "2": "Fusion",
    "3": "Electro",
    "4": "Aero",
    "5": "Spectro",
    "6": "Havoc"
}

MAPPINGWEAPON = {
    "1": "Broadblade",
    "2": "Sword",
    "3": "Pistols",
    "4": "Gauntlets",
    "5": "Rectifier"
}

ELEMENT_BASE = {
    "Glacio": 1000,
    "Fusion": 2000,
    "Electro": 3000,
    "Aero": 4000,
    "Spectro": 5000,
    "Havoc": 6000,
}

with open("CharacterInfo.csv", newline="", encoding="utf-8") as file:
    rows = list(csv.DictReader(file))

    counts = defaultdict(int)

    for row in rows:
        element = (row.get("element") or "").strip()
        if element in ELEMENT_BASE and (row.get("character_id") or "").strip():
            counts[element] += 1

    for row in rows:
        elem = (row.get("element") or "").strip()
        base = ELEMENT_BASE.get(elem)
        if base is None:
            row["character_id"] = ""
        else:
            counts[elem] += 1
            row["character_id"] = str(base + counts[elem])
    
    existingHeaders = list(rows[0].keys())
    fieldnames = ["character_id"] + [header for header in existingHeaders if header != "character_id"]

    with open("CharacterInfoUpdated.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames, quoting=csv.QUOTE_MINIMAL)
        w.writeheader()
        w.writerows(rows)
