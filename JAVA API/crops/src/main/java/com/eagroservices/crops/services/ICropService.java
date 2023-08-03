package com.eagroservices.crops.services;

import java.util.List;
import java.util.Optional;

import com.eagroservices.crops.pojos.Crop;

public interface ICropService {

    List<Crop> GetAll();
    // List<string> GetCropNames();
    // List<CropNameIdDetails> GetCropNamesWithId();
    Optional<Crop> GetById(int cropId);
    Crop Insert(Crop crop);
    Crop Update(Crop crop);
    String Delete(int cropId);
    
}
  