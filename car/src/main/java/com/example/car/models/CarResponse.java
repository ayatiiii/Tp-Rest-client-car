package com.example.car.models;

import com.example.car.entities.Client;
import lombok.*;


@Builder

@Data


public class CarResponse {
    private Long id;
    private String brand;
    private String model;
    private String matricule;
    private Client client;

}
