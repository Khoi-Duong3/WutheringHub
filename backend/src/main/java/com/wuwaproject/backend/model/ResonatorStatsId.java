package com.wuwaproject.backend.model;


import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ResonatorStatsId implements Serializable{
    @Column(name = "character_id")
    private Long characterId;

    @Column(name = "ascension")
    private Integer ascension;

    @Column(name = "level")
    private Integer level;

    public ResonatorStatsId(){}

    public ResonatorStatsId(Long characterId, Integer ascension, Integer level){
        this.characterId = characterId;
        this.ascension = ascension;
        this.level = level;
    }

    public Long getCharacterId(){
        return characterId;
    }

    public void setCharacterId(Long characterId){
        this.characterId = characterId;
    }

    public Integer getAscension(){
        return ascension;
    }

    public void setAscension(Integer ascension){
        this.ascension = ascension;
    }

    public Integer getLevel(){
        return level;
    }

    public void setLevel(Integer level){
        this.level = level;
    }

    @Override public boolean equals(Object o){
        if(this == o) return true;
        if(!(o instanceof ResonatorStatsId)) return false;
        ResonatorStatsId that = (ResonatorStatsId) o;
        return Objects.equals(characterId, that.characterId) && Objects.equals(ascension, that.ascension) && Objects.equals(level, that.level);
    }
    @Override
    public int hashCode(){
        return Objects.hash(characterId, ascension, level);
    }
}
