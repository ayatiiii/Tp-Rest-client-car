import React, { useState, useEffect } from 'react';
import { getAllClients, addClient } from './ClientService';
import 'bootstrap/dist/css/bootstrap.min.css';

function ClientComponent() {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    nom: '',
    age: '',
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
        setNewClient({ nom: '', age: '' });
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
        <button
          type="submit"
          className="btn"
          style={{
            backgroundColor: '#89CFF0', // Baby blue background
            color: 'white', // White text
            border: 'none',
          }}
        >
          Add Client
        </button>
      </form>

      {/* Table displaying all clients */}
      <h3>Client List</h3>
      <table
        className="table"
        style={{
          borderCollapse: 'separate', // Separate borders for cells
          borderSpacing: '5px', // Spacing between cells
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                border: '2px solid #89CFF0',
                padding: '10px',
                backgroundColor: '#E3F2FD', // Light blue background for header
              }}
            >
              ID
            </th>
            <th
              style={{
                border: '2px solid #89CFF0',
                padding: '10px',
                backgroundColor: '#E3F2FD',
              }}
            >
              Nom
            </th>
            <th
              style={{
                border: '2px solid #89CFF0',
                padding: '10px',
                backgroundColor: '#E3F2FD',
              }}
            >
              Age
            </th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td
                style={{
                  border: '2px solid #89CFF0',
                  padding: '10px',
                }}
              >
                {client.id} {/* Displaying the ID of each client */}
              </td>
              <td
                style={{
                  border: '2px solid #89CFF0',
                  padding: '10px',
                }}
              >
                {client.nom}
              </td>
              <td
                style={{
                  border: '2px solid #89CFF0',
                  padding: '10px',
                }}
              >
                {client.age}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientComponent;
