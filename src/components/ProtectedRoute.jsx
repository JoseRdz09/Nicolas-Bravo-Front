// ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Ajusta la ruta según la ubicación de tu hook
import { ClipLoader } from 'react-spinners'; // Importa el spinner

const ProtectedRoute = ({ children }) => {
    const { user, isAdmin, error, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader color="#000000" size={60} /> {/* Usa ClipLoader */}
            </div>
        ); // Spinner de carga
    }

    if (error || !user) {
        // Manejar errores y redirigir si el usuario no está logueado o hay un error
        return <Navigate to="/auth/login" />;
    }

    if (!isAdmin()) {
        // Usuario no tiene permiso de administrador
        return <Navigate to="/unauthorized" />;
    }

    // Usuario autenticado y con permisos adecuados
    return children;
};

export default ProtectedRoute;
