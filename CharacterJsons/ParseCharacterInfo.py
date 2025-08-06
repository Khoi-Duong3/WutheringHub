import json
import csv
from pathlib import Path

def process_single_json(json_path: Path) -> dict:
    with json_path.open("r", encoding="utf-8") as f:
        data = json.load(f)

    characterInfo = {
        "name":        data.get("Name"),
        "rarity":      data.get("Rarity"),
        "element":     data.get("Element"),
        "weaponType":  data.get("Weapon"),
        "Description": data.get("Desc"),
        "Birth": data["CharaInfo"].get("Birth"),
        "Sex": data["CharaInfo"].get("Sex"),
        "Country": data["CharaInfo"].get("Country"),
        "Region": data["CharaInfo"].get("Influence"),
        "CVNameCN": data["CharaInfo"].get("CVNameCn"),
        "CVNameJP": data["CharaInfo"].get("CVNameJp"),
        "CVNameKR": data["CharaInfo"].get("CVNameKo"),
        "CVNameEN": data["CharaInfo"].get("CVNameEn")
        }
    
    return characterInfo

def process_all_jsons(folder: str, resonators):
    folder_path = Path(folder)
    for json_file in sorted(folder_path.glob("*.json")):
        resonators.append(process_single_json(json_file))

def write_csv(resonators, outpath):
    base_fields = ["name", "rarity", "element", "weaponType", "Description"]

    seen = set(base_fields)
    other_fields = []
    for char in resonators:
        for k in char.keys():
            if k not in seen:
                seen.add(k)
                other_fields.append(k)

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