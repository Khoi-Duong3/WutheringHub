import json
import csv
from pathlib import Path

HERE = Path(__file__).parent
JSON_DIR = HERE.parent / "CharacterJsons"

def process_all_jsons(tags: dict):
    for json_path in sorted(JSON_DIR.glob("*.json")):
        with json_path.open("r", encoding="utf-8") as f:
            data = json.load(f)
        charName = data["Name"]
        tags[charName] = []
        for tag_id in data["Tag"]:
            tags[charName].append(tag_id)
    
    return tags

def writecsv(tags: dict, outpath: Path):
    fieldnames = ["Name","tagId"]
    with outpath.open("w", newline="", encoding="utf-8") as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for id in tags:
            for tag_id in tags[id]:
                writer.writerow({
                    "Name": id,
                    "tagId": tag_id
                })

if __name__ == "__main__":
    resonatorTags = {}
    tags = process_all_jsons(resonatorTags)
    writecsv(tags, HERE / "CharacterTags.csv")