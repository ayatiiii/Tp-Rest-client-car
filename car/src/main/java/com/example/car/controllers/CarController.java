package com.example.car.controllers;

import com.example.car.entities.Car;
import com.example.car.models.CarResponse;
import com.example.car.services.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/car")
public class CarController {

    @Autowired
    private CarService carService;

    // Create a new car with optional client assignment
    @PostMapping
    public ResponseEntity<CarResponse> createCar(@RequestBody Car car) {
        try {
            CarResponse createdCar = carService.createCarWithClient(car);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdCar);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    // Get all cars with client details
    @GetMapping
    public ResponseEntity<List<CarResponse>> getAllCars() {
        List<CarResponse> carResponses = carService.getAllCarsWithClientDetails();
        return ResponseEntity.ok(carResponses);
    }

    // Get a specific car by ID with client details
    @GetMapping("/{id}")
    public ResponseEntity<CarResponse> getCarById(@PathVariable Long id) {
        try {
            CarResponse carResponse = carService.getCarResponseById(id);
            return ResponseEntity.ok(carResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
