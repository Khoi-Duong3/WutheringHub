package com.wuwaproject.backend.model;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "character_stats")
public class ResonatorStats {

    @EmbeddedId
    @JsonUnwrapped
    private ResonatorStatsId id;

    @Column(name = "hp")
    private BigDecimal hp;

    @Column(name = "atk")
    private BigDecimal atk;

    @Column(name = "def")
    private BigDecimal def;

    public BigDecimal getHp(){
        return hp;
    }

    public void setHp(BigDecimal hp){
        this.hp = hp;
    }

    public BigDecimal getAtk(){
        return atk;
    }

    public void setAtk(BigDecimal atk){
        this.atk = atk;
    }

    public BigDecimal getDef(){
        return def;
    }

    public void setDef(BigDecimal def){
        this.def = def;
    }
}
