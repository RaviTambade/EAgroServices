package com.eagroservices.crops.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eagroservices.crops.pojos.Crop;
import com.eagroservices.crops.services.ICropService;

@RestController
@RequestMapping("/api/crops")
public class CropController {

    @Autowired
    private ICropService _service;

    @GetMapping
    public List<Crop> GetAll() {
        return _service.GetAll();
    }

    @PostMapping
    public Crop Insert(@RequestBody Crop crop) {
        return _service.Insert(crop);
    }

    @DeleteMapping("/{cropId}")
    public String Delete(@PathVariable int cropId) {
        return _service.Delete(cropId);
    }

    @GetMapping("/{cropId}")
    public Optional<Crop> GetById(@PathVariable int cropId) {
        return _service.GetById(cropId);
    }

    @PutMapping
    public Crop Update(@RequestBody Crop crop) {
        return _service.Update(crop);
    }

}
