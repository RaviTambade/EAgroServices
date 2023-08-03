package com.eagroservices.crops.services;

import java.util.List;
import java.util.Optional;

import com.eagroservices.crops.pojos.Crop;
import com.eagroservices.crops.pojos.CropNameIdDetails;

public interface ICropService {

    List<Crop> GetAll();
    List<String> GetCropNames();
    List<CropNameIdDetails> GetCropNamesWithId();
    Optional<Crop> GetById(int cropId);
    Boolean Insert(Crop crop);
    Boolean Update(Crop crop);
    Boolean Delete(int cropId);
    
}
  