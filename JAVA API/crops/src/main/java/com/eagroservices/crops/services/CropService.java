package com.eagroservices.crops.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eagroservices.crops.dao.ICropRepository;
import com.eagroservices.crops.pojos.Crop;

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
    public Crop Insert(Crop crop) {
        return _repo.save(crop);
    }

    @Override
    public Crop Update(Crop crop) {
        return _repo.save(crop);
    }

    @Override
    public String Delete(int cropId) {
        String msg = "Deletion of crop failed!!!!!!!!!!!";
        if (_repo.existsById(cropId)) {
            _repo.deleteById(cropId);
            msg = "Crop deleted successfully , for  id :" + cropId;
        }
        return msg;
    }

}
