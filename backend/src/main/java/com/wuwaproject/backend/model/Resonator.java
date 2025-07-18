package com.wuwaproject.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "characters")
public class Resonator {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(name = "weapon_type", nullable = false)
    private String weaponType;

    @Column(nullable = false)
    private String element;

    @Column(name = "star_rating")
    private int star;

    @Column(name = "portrait_url")
    private String portraitURL;

    public Resonator(){}

    
    public Long getId(){
        return id;
    }

    public void setId(Long newId){
        this.id = newId;
    }

    public String getName(){
        return name;
    }

    public void setName(String newName){
        this.name = newName;
    }

    public String getWeaponType(){
        return weaponType;
    }

    public void setWeaponType(String newWeaponType){
        this.weaponType = newWeaponType;
    }

    public String getElement(){
        return element;
    }

    public void setElement(String newElement){
        this.element = newElement;
    }

    public int getStar(){
        return star;
    }

    public void setStar(int newStar){
        this.star = newStar;
    }

    public String getPortraitURL(){
        return portraitURL;
    }

    public void setPortraitURL(String newPortraitURL){
        this.portraitURL = newPortraitURL;
    }
}
