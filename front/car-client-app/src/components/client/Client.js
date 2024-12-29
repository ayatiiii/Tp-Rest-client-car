import React, { useState, useEffect } from 'react';
import { getAllClients, addClient } from './ClientService'; // Correct path for ClientService.js
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

function ClientComponent() {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    nom: '',  // Change 'name' to 'nom' to match the backend
    age: '', // Keeping age as it is
  });

  // Fetching all clients on component mount
  useEffect(() => {
    getAllClients()
      .then((response) => setClients(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Handling form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    addClient(newClient)
      .then(() => {
        setClients([...clients, newClient]);
        setNewClient({ nom: '', age: '' }); // Resetting state after adding a client
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container mt-4">
      <h2>Clients</h2>

      {/* Form to add a new client */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="nom" className="form-label">Nom</label>
          <input
            type="text"
            id="nom"
            className="form-control"
            placeholder="Enter Nom"
            value={newClient.nom}
            onChange={(e) => setNewClient({ ...newClient, nom: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age</label>
          <input
            type="number"
            id="age"
            className="form-control"
            placeholder="Enter Age"
            value={newClient.age}
            onChange={(e) => setNewClient({ ...newClient, age: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Client</button>
      </form>

      {/* Table displaying all clients */}
      <h3>Client List</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nom</th>
            <th scope="col">Age</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={client.id}>
              <th scope="row">{index + 1}</th>
              <td>{client.nom}</td>
              <td>{client.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientComponent;
