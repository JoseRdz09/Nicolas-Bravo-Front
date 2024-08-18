

import axios from 'axios';

// Configura la instancia de Axios
const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Reemplaza con tu URL base
});

// Configura un interceptor para agregar el token a las solicitudes
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
