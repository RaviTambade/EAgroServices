package com.eagroservices.crops.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eagroservices.crops.dao.ICropRepository;
import com.eagroservices.crops.pojos.Crop;
import com.eagroservices.crops.pojos.CropNameIdDetails;

@Service
public class CropService implements ICropService {
    @Autowired
    private ICropRepository _repo;

    @Override
    public List<Crop> GetAll() {
        return _repo.findAll();
    }

    @Override
    public Optional<Crop> GetById(int cropId) {
        return _repo.findById(cropId);
    }

    @Override
    public Boolean Insert(Crop crop) {
        return _repo.save(crop) != null;
    }

    @Override
    public Boolean Update(Crop crop) {
        return _repo.save(crop) != null;
    }

    @Override
    public Boolean Delete(int cropId) {
       boolean status= false;
        if (_repo.existsById(cropId)) {
            _repo.deleteById(cropId);
            status=true;
        }
        return status;
    }

    @Override
    public List<String> GetCropNames() {
        return _repo.GetCropNames();
    }

    @Override
    public List<CropNameIdDetails> GetCropNamesWithId() {
        return _repo.GetCropNamesWithId();
    }

}
