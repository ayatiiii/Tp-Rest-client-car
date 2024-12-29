// src/services/CarService.js
import axios from 'axios';

const API_URL = 'http://localhost:8888/SERVICE-CAR/api/car'; // Correct URL for your backend

// Fetch all cars
export const getAllCars = () => {
  return axios.get(API_URL);
};

// Fetch a specific car by ID
export const getCarById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// Add a new car (including the client_id)
export const addCar = (car) => {
  return axios.post(API_URL, car);  // POST request to create a car with client_id
};
