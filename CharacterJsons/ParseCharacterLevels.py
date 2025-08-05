import json
import csv

def stats_to_csv(stats_dict, csv_path):
    with open(csv_path, "w", newline="", encoding="utf-8") as csvfile:
        fieldnames = ["Name","Ascension","Level","Hp","Atk","Def"]
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        name = stats_dict["Name"]
        for asc, levels in stats_dict["Stats"].items():
            for lvl, s in levels.items():
                writer.writerow({
                    "Name":      name,
                    "Ascension": asc,
                    "Level":     lvl,
                    "Hp":        s["Hp"],
                    "Atk":       s["Atk"],
                    "Def":       s["Def"],
                })

def processJson():
    json_file = input("Enter file name: ")
    with open(json_file, "r", encoding="utf-8") as f:
        data = json.load(f)

    # we’ll store Name + a nested dict under "Stats"
    out = {
        "Name": data["Name"],
        "Stats": {}
    }

    for ascension, levels in data["Stats"].items():
        out["Stats"][ascension] = {}
        for level, stats in levels.items():
            # initialize the dict for this (ascension, level)
            out["Stats"][ascension][level] = {
                "Hp":  stats.get("Life", 0),
                "Atk": stats.get("Atk",  0),
                "Def": stats.get("Def",  0),
            }

    return out

if __name__ == "__main__":
    characterLevelStatDict = processJson()
    stats_to_csv(characterLevelStatDict, "SpectroRover_stats.csv")
