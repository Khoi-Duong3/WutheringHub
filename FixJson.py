import json

with open("echo.json", "r+", encoding="utf-8") as file:
    data = json.load(file)

    for item in data:
        urls = []
        for set in item.get("sets", []):
            stripped = set.replace(" ", "")
            urls.append(f"/sets/{stripped}.webp")
        
        item["setURL"] = urls
    
    file.seek(0)
    json.dump(data, file, indent=4, ensure_ascii=False)
    file.truncate()


"""
with open("echo.json", "r+", encoding="utf-8") as file:
    data = json.load(file)

    for i in range (len(data)):
        s = "/echoes/"
        for j in range(len(data[i]["name"])):
            if data[i]["name"][j] == "'":
                j += 2
                continue
            
            if data[i]["name"][j] == " " or data[i]["name"][j] == ":":
                j +=1
                continue

            s += data[i]["name"][j]

        s += ".webp"
        data[i]["portraitURL"] = s

    file.seek(0)
    json.dump(data, file, indent=4, ensure_ascii=False)
    file.truncate()



with open("weapons_portrait.json", "r+", encoding="utf-8") as file:
    data = json.load(file)

    for i in range(len(data)):
        s = "/" + data[i]["portraitURL"]
        data[i]["portraitURL"] = s
    
    file.seek(0)
    json.dump(data, file, indent=4, ensure_ascii=False)
    file.truncate()

    

with open("weapons_portrait.json", "r+", encoding="utf-8") as file:
    data = json.load(file)


    for i in range (len(data)):
        removed = False
        s = ""
        for char in data[i]["portraitURL"]:
            if char == "/" and (not removed):
                removed = True
                continue
            s += char
        
        data[i]["portraitURL"] = s

    file.seek(0)
    json.dump(data, file, indent=4, ensure_ascii=False)
    file.truncate()
"""






