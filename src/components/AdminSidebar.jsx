import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { ClipLoader } from 'react-spinners';
import clienteAxios from '../config/axios';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function AdminSidebar() {
    const { user, logout, isLoading } = useAuth({ middleware: 'auth' });
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(false); // Nuevo estado para la carga de imagen
    const [logoutLoading, setLogoutLoading] = useState(false); // Nuevo estado para el cierre de sesión
    const [selectedImage, setSelectedImage] = useState(null);
    const [userState, setUserState] = useState(user);

    useEffect(() => {
        setUserState(user);
    }, [user]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader color="#000000" size={60} />
            </div>
        );
    }

    if (!userState) return null;

    const handlePasswordChange = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            setError('Todos los campos son requeridos');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (newPassword.length < 6) {
            setError('La nueva contraseña debe tener al menos 6 caracteres');
            return;
        }

        setLoading(true);
        try {
            await clienteAxios.post('/api/change-password', {
                current_password: currentPassword,
                new_password: newPassword,
                new_password_confirmation: confirmPassword
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`
                }
            });

            setSuccess('Contraseña cambiada con éxito');
            setError('');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setModalIsOpen(false);
        } catch (err) {
            if (err.response && err.response.data.errors) {
                setError(err.response.data.errors[0]);
            } else {
                setError('Error al cambiar la contraseña');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('image', file);

            setImageLoading(true); // Mostrar el spinner de carga

            clienteAxios.post('/api/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`
                }
            })
            .then(response => {
                setUserState(prevUser => ({
                    ...prevUser,
                    image: response.data.image
                }));
                setSelectedImage(null);
            })
            .catch(error => {
                console.error('Error al subir o actualizar la imagen:', error);
                console.error('Detalles del error:', error.response?.data);
            })
            .finally(() => {
                setImageLoading(false); // Ocultar el spinner de carga
            });
        }
    };

    const handleLogout = async () => {
        setLogoutLoading(true); // Mostrar el spinner de carga para el cierre de sesión
        try {
            await logout();
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        } finally {
            setLogoutLoading(false); // Ocultar el spinner de carga para el cierre de sesión
        }
    };

    const imageUrl = userState.image ? `${import.meta.env.VITE_API_URL}storage/${userState.image}` : '../img/user.jpg';

    return (
        <>
            <div className="md:hidden fixed top-4 left-4 z-50">
                <button
                    className="text-persian-blue-950 md:hidden flex items-center p-2 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>

            <aside
                className={`fixed inset-y-0 left-0 transform ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300 ease-in-out bg-gray-100 p-4 w-64 z-40 md:relative md:transform-none md:w-64 md:h-screen`}
            >
                <div className="flex flex-col items-center p-4 space-y-6 md:space-y-4">
                    <div className="relative w-24 h-24">
                        <img
                            src={imageUrl}
                            alt="imagen del usuario"
                            className="w-full h-full rounded-full"
                        />
                        {imageLoading && (
                            <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 rounded-full">
                                <ClipLoader color="#000000" size={30} />
                            </div>
                        )}
                    </div>
                    <input
                        type="file"
                        id="imageInput"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                    <button
                        type="button"
                        className="bg-blue-500 hover:bg-blue-700 text-white rounded-full p-2 mt-2"
                        onClick={() => document.getElementById('imageInput').click()}
                    >
                        Cambiar Imagen
                    </button>
                    <p className="text-lg font-semibold">{userState.name}</p>
                    <p className="text-sm text-gray-600">{userState.email}</p>
                    <p className="text-sm text-gray-600">Matricula: 2200314533</p>
                    <p className="text-sm text-gray-600">Contraseña: ****</p>
                </div>

                <div className="my-5 px-5 space-y-4 md:space-y-2">
                    <button
                        type="button"
                        className="text-center bg-blue-500 hover:bg-blue-700 text-white w-full rounded-2xl p-3 uppercase font-bold"
                        onClick={() => setModalIsOpen(true)}
                    >
                        Cambiar Contraseña
                    </button>
                    <button
                        type="button"
                        className="text-center bg-red-500 hover:bg-red-700 text-white w-full rounded-2xl p-3 uppercase font-bold"
                        onClick={handleLogout}
                    >
                        {logoutLoading ? (
                            <div className="flex justify-center items-center">
                                <ClipLoader color="#ffffff" size={24} /> {/* Spinner de carga para cierre de sesión */}
                            </div>
                        ) : (
                            'Cerrar Sesión'
                        )}
                    </button>
                </div>
            </aside>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Cambiar Contraseña"
                className="fixed inset-0 flex items-center justify-center p-4 z-50"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
            >
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-xl font-semibold mb-4">Cambiar Contraseña</h2>
                    <input
                        type="password"
                        placeholder="Contraseña actual"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full mb-4 p-2 border rounded"
                    />
                    <input
                        type="password"
                        placeholder="Nueva contraseña"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full mb-4 p-2 border rounded"
                    />
                    <input
                        type="password"
                        placeholder="Confirmar nueva contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full mb-4 p-2 border rounded"
                    />
                    {loading && (
                        <div className="flex justify-center mb-4">
                            <ClipLoader color="#000000" size={30} />
                        </div>
                    )}
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {success && <p className="text-green-500 mb-4">{success}</p>}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            className="bg-gray-300 hover:bg-gray-500 text-white p-2 rounded"
                            onClick={() => setModalIsOpen(false)}
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded"
                            onClick={handlePasswordChange}
                        >
                            Cambiar
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
