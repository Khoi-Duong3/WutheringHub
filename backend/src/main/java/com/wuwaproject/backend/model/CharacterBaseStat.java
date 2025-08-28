package com.wuwaproject.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "character_stats")
public class CharacterBaseStat {
    @EmbeddedId
    private CharacterBaseStatId id;

    @Column(name = "name")
    private String name;

    @Column(name = "hp")  
    private BigDecimal hp;

    @Column(name = "atk") 
    private BigDecimal atk;

    @Column(name = "def") 
    private BigDecimal def;

    public CharacterBaseStatId getId() { 
        return id; 
    }
    public String getName() { 
        return name; 
    }

    public BigDecimal getHp() { 
        return hp; 
    
    }

    public BigDecimal getAtk() { 
        return atk; 
    }

    public BigDecimal getDef() { 
        return def; 
    }
}
