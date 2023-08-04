package com.eagroservices.crops.pojos;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CropNameIdDetails {
    public Integer id ;
    public String name ;
    
    public CropNameIdDetails(Integer id, String name) {
        this.id = id;
        this.name = name;
    }
}
