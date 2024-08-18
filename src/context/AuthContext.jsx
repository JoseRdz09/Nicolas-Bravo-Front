import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Verifica si hay un token en el almacenamiento local para establecer el estado de autenticación
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (credentials) => {
        try {
            const response = await api.post('/login', credentials);
            localStorage.setItem('token', response.data.token);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };
    

    const logout = async () => {
        try {
            await api.post('/logout');
            localStorage.removeItem('token');
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
