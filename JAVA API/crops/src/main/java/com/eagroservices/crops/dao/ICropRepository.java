package com.eagroservices.crops.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eagroservices.crops.pojos.Crop;
@Repository
public interface ICropRepository extends JpaRepository<Crop,Integer> {
    
}
