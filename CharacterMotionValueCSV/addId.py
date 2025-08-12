import pandas as pd
from pathlib import Path

MAPPING = {
    "Sanhua": 1001,
    "Baizhi": 1002,
    "Lingyang": 1003,
    "Zhezhi": 1004,
    "Youhu": 1005,
    "Carlotta": 1006,
    "Chixia": 2001,
    "Mortefi": 2002,
    "Changli": 2003,
    "Brant": 2004,
    "Lupa": 2005,
    "Calcharo": 3001,
    "Yinlin": 3002,
    "Yuanwu": 3003,
    "Jinhsi": 5001,
    "Xiangli Yao": 3004,
    "Yangyang": 4001,
    "Aalto": 4002,
    "Jiyan": 4003,
    "Jianxin": 4004,
    "Rover: Aero": 4005,
    "Ciaccona": 4006,
    "Cartethyia": 4007,
    "Rover: Spectro": 5002,
    "Verina": 5003,
    "Lumi": 3005,
    "Shorekeeper": 5004,
    "Phoebe": 5005,
    "Zani": 5006,
    "Taoqi": 6001,
    "Danjin": 6002,
    "Camellya": 6003,
    "Rover: Havoc": 6004,
    "Roccia": 6005,
    "Cantarella": 6006
}

BASE = Path(__file__).resolve().parent
IN  = BASE / "merged_upto_level10.csv"
OUT = BASE / "merged_mapped.csv"


df = pd.read_csv(IN, low_memory=False)
df.insert(0, "name", df["character_id"])
df["character_id"] = df["name"].map(MAPPING).astype("Int64")

unmapped = df[df["character_id"].isna()]["name"].unique().tolist()
if unmapped:
    raise ValueError(f"Unmapped names found: {unmapped}")

df.to_csv(OUT, index=False)