package com.wuwaproject.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "\"character_info\"") 
public class ResonatorInfo {

  @Id
  @Column(name = "\"character_id\"")   
  private Integer characterId;

  @Column(name = "\"name\"")
  private String name;

  private String element;

  private String weaponType;

  private Integer rarity;

  private String description;

    public ResonatorInfo() {} 

    public Integer getCharacterId() {
        return characterId;
    }

    public void setCharacterId(Integer characterId){
        this.characterId = characterId;
    }

    public String getCharacterName(){
        return name;
    }

    public void setCharacterName(String name){
        this.name = name;
    }

    public Integer getRarity(){
        return rarity;
    }

    public void setRarity(Integer rarity){
        this.rarity = rarity;
    }

    public String getElement(){
        return element;
    }

    public void setElement(String element){
        this.element = element;
    }

    public String getWeaponType(){
        return weaponType;
    }

    public void setWeaponType(String weaponType){
        this.weaponType = weaponType;
    }

    public String getDescription(){
        return description;
    }

    public void setDescription(String description){
        this.description = description;
    }

}
