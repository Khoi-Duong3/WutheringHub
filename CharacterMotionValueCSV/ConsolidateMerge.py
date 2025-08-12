# merge_levels_simple.py
import pandas as pd
from pathlib import Path

BASE = Path(__file__).resolve().parent  
OUT  = BASE / "merged_upto_level10.csv"

dfs = []
for p in sorted(BASE.glob("*.csv")):
    df = pd.read_csv(p, encoding="utf-8-sig")  

    df["level"] = pd.to_numeric(df["level"], errors="coerce")
    df = df[df["level"].notna() & (df["level"] <= 10)]
    dfs.append(df)

merged = pd.concat(dfs, ignore_index=True)
merged.to_csv(OUT, index=False)
print(f"Wrote {OUT}  (rows: {len(merged)}, cols: {merged.shape[1]})")