package com.eagroservices.crops.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.eagroservices.crops.pojos.Crop;
import com.eagroservices.crops.pojos.CropNameIdDetails;
@Repository
public interface ICropRepository extends JpaRepository<Crop,Integer> {
    @Query("SELECT c.title FROM Crop c")
    List<String> GetCropNames();

    @Query("SELECT new com.eagroservices.crops.pojos.CropNameIdDetails(c.id,c.title) FROM Crop c")
    List<CropNameIdDetails> GetCropNamesWithId();


}
