import csv, json

def to_json_array(values: list[str]) -> str:
    return json.dumps(values, ensure_ascii=False)

def is_json_array(s) -> bool:
    if not isinstance(s, str):
        return False
    try:
        return isinstance(json.loads(s), list)
    except Exception:
        return False

in_path  = "changli_motion_values.csv"
out_path = "changli_motion_values_updated.csv"

with open(in_path, newline="", encoding="utf-8") as f:
    rows = list(csv.DictReader(f))

for row in rows:
    skill_type  = (row.get("skill_type")  or "").strip()
    attack_name = (row.get("attack_name") or "").strip()

    if not is_json_array(row.get("damage_type", "")):
        if skill_type == "Normal Attack" and "Heavy" in attack_name:
            row["damage_type"] = to_json_array(["Heavy Attack Damage"])
        elif skill_type == "Normal Attack" and "DMG" in attack_name:
            row["damage_type"] = to_json_array(["Basic Attack Damage"])
        elif skill_type == "Resonance Skill" and "DMG" in attack_name:
            row["damage_type"] = to_json_array(["Skill Attack Damage"])
        elif skill_type == "Resonance Liberation" and "DMG" in attack_name:
            row["damage_type"] = to_json_array(["Liberation Damage"])
        elif skill_type == "Intro Skill" and "DMG" in attack_name:
            row["damage_type"] = to_json_array(["Intro Damage"])
        elif skill_type == "Forte Circuit" and "DMG" in attack_name:
            row["damage_type"] = to_json_array(["Skill Damage"])


fieldnames = list(rows[0].keys())
if "damage_type" not in fieldnames:
    fieldnames.append("damage_type")

with open(out_path, "w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=fieldnames, quoting=csv.QUOTE_MINIMAL)
    w.writeheader()
    w.writerows(rows)
