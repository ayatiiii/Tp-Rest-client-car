import axios from 'axios';

const API_URL = 'http://localhost:8888/SERVICE-CLIENT/api/client';

export const getAllClients = () => {
  return axios.get(API_URL, { withCredentials: true }); // Ensure withCredentials is set if needed
};

export const getClientById = (id) => {
  return axios.get(`${API_URL}/${id}`, { withCredentials: true });
};

export const addClient = (client) => {
  return axios.post('http://localhost:8888/SERVICE-CLIENT/api/client', client, { withCredentials: true })
  // Ensure withCredentials is set if needed
};
