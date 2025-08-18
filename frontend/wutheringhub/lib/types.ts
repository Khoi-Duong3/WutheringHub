export type EchoStat = | "atk" | "atk%" | "hp" | "hp%" 
                | "def" | "def%" | "critRate" | "critDmg" 
                | "basicDmgBonus" | "skillDmgBonus" | "heavyDmgBonus" | "liberationDmgBonus"
                | "glacioDmgBonus" | "fusionDmgBonus" | "electroDmgBonus" | "aeroDmgBonus"
                | "spectroDmgBonus" | "havocDmgBonus" | "energyRegen" | "healingBonus" | ""


export type AttackType =
  | "basic"       
  | "skill"       
  | "heavy"       
  | "liberation"
  | "echo"; 


export type ElementType =
  | "glacio"   
  | "fusion"   
  | "electro"  
  | "aero"     
  | "spectro"  
  | "havoc";   