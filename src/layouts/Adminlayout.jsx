import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from "../components/AdminSidebar";
import { useAuth } from '../hooks/useAuth';
import EventCarousel from '../components/EventCarousel';
import Comunicados from '../components/Comunicados'; // Importa el componente
import clienteAxios from '../config/axios'; // Asegúrate de importar correctamente el clienteAxios
import Cards from '../components/Cards';
import { ClipLoader } from 'react-spinners'; // Importa el spinner

export default function AdminLayout() {
    // Obtén el usuario con el hook useAuth
    const { user, isLoading: isAuthLoading } = useAuth({ middleware: 'admin' }); // Asegúrate de que useAuth devuelva `isLoading`

    // Estado para almacenar los anuncios y su estado de carga
    const [announcements, setAnnouncements] = React.useState([]);
    const [isAnnouncementsLoading, setIsAnnouncementsLoading] = React.useState(true);

    // Fetch anuncios al montar el componente
    React.useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await clienteAxios.get('/api/announcements');
                setAnnouncements(response.data);
            } catch (error) {
                console.error('Error fetching announcements:', error);
            } finally {
                setIsAnnouncementsLoading(false);
            }
        };

        fetchAnnouncements();
    }, []);

    // Mostrar el spinner mientras se cargan los datos
    if (isAuthLoading || isAnnouncementsLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader color="#000000" size={60} /> {/* Usa ClipLoader */}
            </div>
        );
    }

    return (
        <div className='md:flex'>
            <AdminSidebar />

            <main className='flex-1 h-screen overflow-y-scroll bg-gray-100 p-3'>
                {/* Important Announcements Section */}
                {user ? (
                    <Comunicados
                        announcements={Array.isArray(announcements) ? announcements : []}
                        user={user}
                        setAnnouncements={setAnnouncements} // Asegúrate de pasar esta función
                    />
                ) : (
                    <p>No se pudo cargar el usuario.</p> // O maneja el caso cuando no hay usuario
                )}

                <EventCarousel />

                <Cards />

                <div className='pt-24 w-full'>
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
