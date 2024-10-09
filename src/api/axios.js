import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api', // Cambia esto por la URL de tu API
});

export default instance;
