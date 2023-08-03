package com.eagroservices.crops.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name="crops")
public class Crop {

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer Id;
	private String Title;
    @Column(name = "imageurl")
	private String ImageUrl;
	private Double Rate;
    
}
