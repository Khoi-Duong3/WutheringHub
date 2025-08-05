import json
import re
import csv 

pct_re = re.compile(r'^([\d.]+)%(?:\*(\d+))?$')

def makeMultiplier(item):
    total = 0.0
    for term in item.split('+'):
        m = pct_re.match(term.strip())
        if not m:
            continue
        pct = float(m.group(1)) / 100
        count = int(m.group(2) or 1)
        total += pct * count
    
    total = round(total, 6)

    return total

def writeCSV(MVDict, output_file = "roccia_motion_values.csv"):
    with open(output_file, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow([
            "character_id",
            "skill_name",
            "skill_type",
            "attack_name",
            "level",
            "raw_value",
            "total_motion_value"
        ])
        for (char_id, skill_name, skill_type, attack_name), cells in MVDict.items():
            for index, raw in enumerate(cells, start=1):
                mult = makeMultiplier(raw)
                writer.writerow([
                    char_id,
                    skill_name,
                    skill_type,
                    attack_name,
                    index,
                    raw,
                    mult
                ])
    
    return 

def processJson():
    json_file = input("Enter the file name: ")
    with open (json_file, "r", encoding="utf-8") as file:
        data = json.load(file)

    percentMV = {}
    resName = data["Name"]
    for node_id, node in data.get("SkillTrees", {}).items():
        skill = node.get("Skill", {})
        name = skill.get("Name")
        type = skill.get("Type")
        levels = skill.get("Level", {})

        if not name or not levels or type == "Inherent Skill":
            continue
        
        for lvl_key, lvl_info in levels.items():
            
            if lvl_key == "Format":
                continue
            
            atkName = lvl_info.get("Name")
            param = lvl_info.get("Param", [])
            
            percentMV[(resName, name, type, atkName)] = param[0]
    
    return percentMV
        

if __name__ == "__main__":
    mv = processJson()
    writeCSV(mv)
