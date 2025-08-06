import csv
from pathlib import Path

def merge_stats(input_folder: Path, output_file: Path):
    rows = []

    for stat_file in sorted(input_folder.glob("*.csv")):
        with stat_file.open(newline="", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for record in reader:

                rows.append({
                    "Name":      record["Name"],
                    "Ascension": record["Ascension"],
                    "Level":     record["Level"],
                    "Hp":        record["Hp"],
                    "Atk":       record["Atk"],
                    "Def":       record["Def"],
                })

    fieldnames = ["Name", "Ascension", "Level", "Hp", "Atk", "Def"]
    with output_file.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

if __name__ == "__main__":
    merge_stats(
        Path("./CharacterStatsCSV"),        
        Path("./CharacterStats.csv")     
    )
