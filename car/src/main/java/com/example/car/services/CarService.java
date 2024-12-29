package com.example.car.services;

import com.example.car.entities.Car;
import com.example.car.entities.Client;
import com.example.car.models.CarResponse;
import com.example.car.repositories.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class CarService {
    @Autowired
    private CarRepository carRepository;

    @Autowired
    private RestTemplate restTemplate;

    // Get all cars with client details
    public List<CarResponse> getAllCarsWithClientDetails() {
        List<Car> cars = carRepository.findAll();
        List<CarResponse> responses = new ArrayList<>();

        for (Car car : cars) {
            Client client = fetchClientById(car.getClient_id());
            responses.add(CarResponse.builder()
                    .id(car.getId())
                    .brand(car.getBrand())
                    .model(car.getModel())
                    .matricule(car.getMatricule())
                    .client(client)
                    .build());
        }

        return responses;
    }

    // Get a single car by ID with client details
    public CarResponse getCarResponseById(Long id) throws Exception {
        Car car = carRepository.findById(id).orElseThrow(() -> new Exception("Car not found"));

        Client client = fetchClientById(car.getClient_id());

        return CarResponse.builder()
                .id(car.getId())
                .brand(car.getBrand())
                .model(car.getModel())
                .matricule(car.getMatricule())
                .client(client)
                .build();
    }

    // Fetch client details by ID from the client microservice
    private Client fetchClientById(Long clientId) {
        if (clientId == null) {
            return null;
        }

        String clientServiceUrl = "http://localhost:8888/SERVICE-CLIENT/api/client/" + clientId;
        try {
            ResponseEntity<Client> responseEntity = restTemplate.exchange(clientServiceUrl, HttpMethod.GET, null, Client.class);
            if (responseEntity.getStatusCode() == HttpStatus.OK) {
                return responseEntity.getBody();
            } else {
                System.err.println("Failed to fetch client, received status: " + responseEntity.getStatusCode());
                return null;
            }
        } catch (Exception e) {
            System.err.println("Failed to fetch client details for ID: " + clientId + " - " + e.getMessage());
            return null;
        }
    }

    // Create a new car and optionally assign a client
    public CarResponse createCarWithClient(Car car) throws Exception {
        Car savedCar = carRepository.save(car);

        Client client = fetchClientById(car.getClient_id());

        return CarResponse.builder()
                .id(savedCar.getId())
                .brand(savedCar.getBrand())
                .model(savedCar.getModel())
                .matricule(savedCar.getMatricule())
                .client(client)
                .build();
    }
}
