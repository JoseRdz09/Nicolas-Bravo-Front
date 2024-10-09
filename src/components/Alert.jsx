// components/Alert.js
import React from 'react';

const Alert = ({ message, type, onClose }) => {
    // Determina el color de fondo según el tipo de alerta
    const backgroundColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

    return (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${backgroundColor} text-white z-50`}>
            <p>{message}</p>
            <button onClick={onClose} className="absolute top-2 right-2 text-white">&times;</button>
        </div>
    );
};

export default Alert;
