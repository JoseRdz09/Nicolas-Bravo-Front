import React, { useState, useEffect } from 'react';
import clienteAxios from '../config/axios';
import Alert from './Alert';
import ClipLoader from 'react-spinners/ClipLoader';

const Comunicados = ({ announcements, user, setAnnouncements }) => {
    const [newAnnouncement, setNewAnnouncement] = useState({
        title: '',
        date: '',
        content: '',
        logo: ''
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const isAdmin = user?.admin === 1;

    const fetchAnnouncements = async () => {
        try {
            setLoading(true);
            const response = await clienteAxios.get('/api/announcements');
            setAnnouncements(response.data);
        } catch (error) {
            console.error('Error fetching announcements:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const handleDelete = async (id) => {
        setDeletingId(id);
        try {
            await clienteAxios.delete(`/api/announcements/${id}`);
            await fetchAnnouncements();
            setAlert({ message: 'Comunicado eliminado con éxito', type: 'error' });
            setTimeout(() => setAlert(null), 3000);
        } catch (error) {
            console.error('Error eliminando el comunicado:', error);
            setAlert({ message: 'Error al eliminar el comunicado', type: 'error' });
            setTimeout(() => setAlert(null), 3000);
        } finally {
            setDeletingId(null);
        }
    };

    const handleAdd = async () => {
        if (!newAnnouncement.title || !newAnnouncement.date || !newAnnouncement.content || !newAnnouncement.logo) {
            setAlert({ message: 'Todos los campos son obligatorios', type: 'error' });
            setTimeout(() => setAlert(null), 3000);
            return;
        }

        setAdding(true);
        try {
            const response = await clienteAxios.post('/api/announcements', newAnnouncement);
            const createdAnnouncement = response.data;

            if (createdAnnouncement.id) {
                setAnnouncements((prevAnnouncements) => [...prevAnnouncements, createdAnnouncement]);
                setAlert({ message: 'Comunicado agregado con éxito', type: 'success' });
                setTimeout(() => setAlert(null), 3000);
            } else {
                console.error('El anuncio creado no tiene un id:', createdAnnouncement);
                setAlert({ message: 'Error al agregar el comunicado', type: 'error' });
                setTimeout(() => setAlert(null), 3000);
            }

            setNewAnnouncement({
                title: '',
                date: '',
                content: '',
                logo: ''
            });
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error agregando el comunicado:', error);
            setAlert({ message: 'Error al agregar el comunicado', type: 'error' });
            setTimeout(() => setAlert(null), 3000);
        } finally {
            setAdding(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAnnouncement({
            ...newAnnouncement,
            [name]: value
        });
    };

    const today = new Date().toISOString().split('T')[0]; // Obtiene la fecha actual en formato YYYY-MM-DD

    return (
        <section className="py-10 bg-white w-full">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
                    Comunicados Importantes
                </h2>
                {isAdmin && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
                    >
                        Agregar Comunicado
                    </button>
                )}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <ClipLoader color="#3498db" loading={loading} size={50} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {Array.isArray(announcements) && announcements.length > 0 ? (
                            announcements.map((announcement) => (
                                <div key={announcement.id} className="relative">
                                    <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
                                        <div className="flex items-center bg-persian-blue-950 text-white text-xl font-bold px-6 py-4">
                                            {announcement.logo && (
                                                <img
                                                    src={`/logos/${announcement.logo}`}
                                                    alt="Logo"
                                                    className="w-10 h-10 mr-4"
                                                />
                                            )}
                                            {announcement.title}
                                        </div>
                                        <div className="px-6 py-4">
                                            <div className="text-gray-600 text-sm mb-2">
                                                {announcement.date}
                                            </div>
                                            <p className="text-gray-800 mt-2">
                                                {announcement.content}
                                            </p>
                                        </div>
                                    </div>
                                    {isAdmin && (
                                        <button
                                            onClick={() => handleDelete(announcement.id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4 absolute bottom-4 right-4"
                                        >
                                            {deletingId === announcement.id ? (
                                                <ClipLoader color="#ffffff" loading={true} size={20} />
                                            ) : (
                                                'Eliminar'
                                            )}
                                        </button>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No hay comunicados disponibles.</p>
                        )}
                    </div>
                )}
            </div>
            <hr className="w-full border-t-8 border-persian-blue-950 mt-8" />

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
                    <div className="bg-white rounded-lg p-8">
                        <h3 className="text-2xl font-bold mb-4">Agregar Nuevo Comunicado</h3>
                        <div className="mb-4">
                            <label className="block text-gray-700">Título</label>
                            <input
                                type="text"
                                name="title"
                                value={newAnnouncement.title}
                                onChange={handleInputChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Fecha</label>
                            <input
                                type="date"
                                name="date"
                                value={newAnnouncement.date}
                                onChange={handleInputChange}
                                className="w-full border rounded px-3 py-2"
                                max={today} // Restringe la fecha a la fecha actual o futura
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Contenido</label>
                            <textarea
                                name="content"
                                value={newAnnouncement.content}
                                onChange={handleInputChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Logo</label>
                            <select
                                name="logo"
                                value={newAnnouncement.logo}
                                onChange={handleInputChange}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">Selecciona un logo</option>
                                <option value="task.png">Tarea</option>
                                <option value="megafono2.png">Alerta</option>
                                <option value="logo3.png">Logo 3</option>
                            </select>
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={handleAdd}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-4"
                            >
                                {adding ? (
                                    <ClipLoader color="#ffffff" loading={true} size={20} />
                                ) : (
                                    'Agregar'
                                )}
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {alert && (
                <Alert
                    message={alert.message}
                    type={alert.type}
                    onClose={() => setAlert(null)}
                />
            )}
        </section>
    );
};

export default Comunicados;
