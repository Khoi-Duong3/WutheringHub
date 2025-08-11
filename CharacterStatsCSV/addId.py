import csv

in_path = "CharacterStats.csv"
out_path = "CharacterStatsUpdated.csv"

MAPPING = {
    "Sanhua": 1001,
    "Baizhi": 1002,
    "Lingyang": 1003,
    "Zhezhi": 1004,
    "Youhu": 1005,
    "Carlotta": 1006,
    "Chixia": 2001,
    "Mortefi": 2002,
    "Changli": 2003,
    "Brant": 2004,
    "Lupa": 2005,
    "Calcharo": 3001,
    "Yinlin": 3002,
    "Yuanwu": 3003,
    "Jinhsi": 5001,
    "Xiangli Yao": 3004,
    "Yangyang": 4001,
    "Aalto": 4002,
    "Jiyan": 4003,
    "Jianxin": 4004,
    "Rover: Aero": 4005,
    "Ciaccona": 4006,
    "Cartethyia": 4007,
    "Rover: Spectro": 5002,
    "Verina": 5003,
    "Lumi": 3005,
    "Shorekeeper": 5004,
    "Phoebe": 5005,
    "Zani": 5006,
    "Taoqi": 6001,
    "Danjin": 6002,
    "Camellya": 6003,
    "Rover: Havoc": 6004,
    "Roccia": 6005,
    "Cantarella": 6006
}

with open(in_path, newline="",encoding="utf-8") as file:
    rows = list(csv.DictReader(file))

    for row in rows:
        name = (row.get("name") or "").strip()
        id = MAPPING.get(name)

        if id is None:
            row["character_id"] = ""
        else:
            row["character_id"] = str(MAPPING[name])

    existingHeaders = list(rows[0].keys())
    fieldnames = ["character_id"] + [header for header in existingHeaders if header != "character_id"]

    with open(out_path, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames, quoting=csv.QUOTE_MINIMAL)
        w.writeheader()
        w.writerows(rows)
