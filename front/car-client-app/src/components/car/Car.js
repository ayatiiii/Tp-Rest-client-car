import React, { useState, useEffect } from 'react';
import { getAllCars, addCar } from './CarService';
import { getAllClients } from '../client/ClientService';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CarComponent.css';

function CarComponent() {
  const [cars, setCars] = useState([]);
  const [clients, setClients] = useState([]);
  const [newCar, setNewCar] = useState({
    brand: '',
    model: '',
    matricule: '',
    clientId: '',
  });

  // Fetching all cars and clients on component mount
  useEffect(() => {
    getAllCars()
      .then((response) => {
        console.log('Fetched Cars:', response.data); // Debug log to check response
        setCars(response.data);
      })
      .catch((error) => console.error('Error fetching cars:', error));

    getAllClients()
      .then((response) => {
        console.log('Fetched Clients:', response.data); // Debug log to check response
        setClients(response.data);
      })
      .catch((error) => console.error('Error fetching clients:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the car data with clientId
    const carToAdd = {
      brand: newCar.brand,
      model: newCar.model,
      matricule: newCar.matricule,
      client_id: newCar.clientId, // Sending client_id as expected by the backend
    };

    addCar(carToAdd)
      .then(() => {
        setCars([...cars, carToAdd]); // Adding the new car to the cars list
        setNewCar({ brand: '', model: '', matricule: '', clientId: '' }); // Resetting the form
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container mt-4">
      <h2>Cars</h2>

      {/* Form to add a new car */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="brand" className="form-label">Brand</label>
          <input
            type="text"
            id="brand"
            className="form-control"
            placeholder="Enter Brand"
            value={newCar.brand}
            onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="model" className="form-label">Model</label>
          <input
            type="text"
            id="model"
            className="form-control"
            placeholder="Enter Model"
            value={newCar.model}
            onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="matricule" className="form-label">Matricule</label>
          <input
            type="text"
            id="matricule"
            className="form-control"
            placeholder="Enter Matricule"
            value={newCar.matricule}
            onChange={(e) => setNewCar({ ...newCar, matricule: e.target.value })}
          />
        </div>

        {/* Dropdown to select car owner */}
        <div className="mb-3">
          <label htmlFor="clientId" className="form-label">Client (Owner)</label>
          <select
            id="clientId"
            className="form-select"
            value={newCar.clientId}
            onChange={(e) => setNewCar({ ...newCar, clientId: e.target.value })}
          >
            <option value="">Select Owner</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.nom}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-light-green">Add Car</button>

      </form>

      {/* Table displaying all cars */}
      <h3>Car List</h3>
      <table className="table table-striped table-bordered-green">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Brand</th>
            <th scope="col">Model</th>
            <th scope="col">Matricule</th>
            <th scope="col">Owner</th>
            <th scope="col">Owner Age</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car, index) => (
            <tr key={car.id}>
              <th scope="row">{index + 1}</th>
              <td>{car.brand}</td>
              <td>{car.model}</td>
              <td>{car.matricule}</td>
              <td>{car.client ? car.client.nom : 'No Owner'}</td>
              <td>{car.client ? car.client.age : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default CarComponent;
