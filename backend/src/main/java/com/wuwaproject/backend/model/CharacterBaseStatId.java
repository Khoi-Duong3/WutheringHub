package com.wuwaproject.backend.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class CharacterBaseStatId implements Serializable{
    @Column(name = "character_id")
    private Integer characterId;

    @Column(name = "ascension")
    private Integer ascension;

    @Column(name = "level")
    private Integer level;

    public CharacterBaseStatId() {}

    public CharacterBaseStatId(Integer characterId, Integer ascension, Integer level) {
        this.characterId = characterId; this.ascension = ascension; this.level = level;
    }

    public Integer getCharacterId() {
        return characterId;
    }

    public Integer getCharacterAscension(){
        return ascension;
    }

    public Integer getCharacterLevel(){
        return level;
    }

     @Override public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (!(o instanceof CharacterBaseStatId that)) {
            return false;
        }
        return Objects.equals(characterId, that.characterId) && Objects.equals(ascension, that.ascension) && Objects.equals(level, that.level);

     }
     @Override public int hashCode() { return Objects.hash(characterId, ascension, level); }
}
