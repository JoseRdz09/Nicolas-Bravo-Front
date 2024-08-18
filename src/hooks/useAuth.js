// useAuth.js
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import clienteAxios from '../config/axios';

export const useAuth = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Inicializa useNavigate
    const token = localStorage.getItem('AUTH_TOKEN');

    const { data: user, mutate } = useSWR(token ? '/api/user' : null, () =>
        clienteAxios('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.data)
        .catch(err => {
            setError(err?.response?.data?.errors);
            throw err;
        })
    );

    useEffect(() => {
        if (!token || error) {
            setLoading(false);
        } else if (user) {
            setLoading(false);
        }
    }, [user, error, token]);

    const isAdmin = () => user?.admin === 1;

    const login = async (datos, setErrores) => {
        try {
            const { data } = await clienteAxios.post('/api/login', datos);
            localStorage.setItem('AUTH_TOKEN', data.token);
            await mutate(); // Asegúrate de que mutate actualice los datos
            setErrores([]);
            
            // Redirige a /admin si el login es exitoso
            navigate('/admin');
        } catch (error) {
            setErrores(Object.values(error.response.data.errors));
        }
    };

    const registro = async (datos, setErrores) => {
        try {
            const { data } = await clienteAxios.post('/api/registro', datos);
            localStorage.setItem('AUTH_TOKEN', data.token);
            await mutate();
            setErrores([]);
            
            // Redirige a /admin después del registro exitoso
            navigate('/admin');
        } catch (error) {
            setErrores(Object.values(error.response.data.errors));
        }
    };

    const logout = async () => {
        try {
            await clienteAxios.post('/api/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            localStorage.removeItem('AUTH_TOKEN');
            await mutate(undefined);
            navigate('/auth/login'); // Redirige al login después de logout
        } catch (error) {
            setError(error?.response?.data?.errors);
        }
    };

    return {
        login,
        registro,
        logout,
        user,
        error,
        isAdmin,
        loading
    };
};
