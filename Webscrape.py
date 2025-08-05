import requests

# 1. URL of the character JSON
URL = "https://api.hakush.in/ww/data/en/weapon/21050066.json"

# 2. Fetch the JSON
resp = requests.get(URL)
resp.raise_for_status()  # will raise an error if the download failed

# 3. Write it out to disk
output_path = "weapon_Lethean_Elegy.json"
with open(output_path, "w", encoding="utf-8") as f:
    f.write(resp.text)

print(f"✅ Downloaded JSON to {output_path}")