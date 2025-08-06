import json
import csv
from pathlib import Path

HERE = Path(__file__).parent
JSON_DIR = HERE.parent / "CharacterJsons"

def process_all_jsons(tags: dict):
    for json_path in sorted(JSON_DIR.glob("*.json")):
        with json_path.open("r", encoding="utf-8") as f:
            data = json.load(f)
        for tag_id, tag_info in data["Tag"].items():
            if tag_id not in tags:
                tags[tag_id] = tag_info
    
    sortedDict = sorted(tags.items(), key=lambda kv: int(kv[0]))
    return dict(sortedDict)

def writecsv(tags: dict, outpath: Path):
    fieldnames = ["tagId", "tagName", "tagDescription"]
    with outpath.open("w", newline="", encoding="utf-8") as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for tag_id, tag_info in tags.items():
            writer.writerow({
                "tagId": tag_id,
                "tagName": tag_info.get("Name"),
                "tagDescription": tag_info.get("Desc")
            })

if __name__ == "__main__":
    tags = {}
    tags = process_all_jsons(tags)
    writecsv(tags, HERE / "Tags.csv")
