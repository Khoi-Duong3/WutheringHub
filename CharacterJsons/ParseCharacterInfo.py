import json
import csv
from pathlib import Path

def process_single_json(json_path: Path) -> dict:
    with json_path.open("r", encoding="utf-8") as f:
        data = json.load(f)

    characterInfo = {
        "characterId": data.get("Id"),
        "name":        data.get("Name"),
        "rarity":      data.get("Rarity"),
        "element":     data.get("Element"),
        "weaponType":  data.get("Weapon"),
        "Description": data.get("Desc")
        }
    for key in data["CharaInfo"]:
        characterInfo[key] = data["CharaInfo"][key]

    return characterInfo

def process_all_jsons(folder: str, resonators):
    folder_path = Path(folder)
    for json_file in sorted(folder_path.glob("*.json")):
        resonators.append(process_single_json(json_file))

def write_csv(resonators, outpath):
    all_keys = set()
    for char in resonators:
        all_keys.update(char.keys())
    
    base_fields = ["characterId", "name", "rarity", "element", "weaponType", "Description"]
    other_fields = sorted(k for k in all_keys if k not in base_fields)

    fieldnames = base_fields + other_fields

    with outpath.open("w", newline="", encoding="utf-8") as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for char in resonators:
            writer.writerow(char)

if __name__ == "__main__":
    resonators = []
    process_all_jsons("./CharacterJsons", resonators)
    write_csv(resonators, Path("./CharacterInfo.csv"))