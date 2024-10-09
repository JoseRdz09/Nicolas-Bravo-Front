// src/router.js
import { createBrowserRouter } from 'react-router-dom';
import Layout from './layouts/Layout';
import Authlayout from './layouts/Authlayout';
import Login from './views/Login';
import Home from './views/Home';
import Adminlayout from './layouts/Adminlayout';
import Alumnos from './views/Alumnos';
import About from './views/About';
import Registro from './views/Registro';
import ProtectedRoute from './components/ProtectedRoute'; // Ajusta la ruta según tu estructura de archivos

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/home/alumnos',
                element: <Alumnos />
            },
            {
                path: '/home/conocenos',
                element: <About />
            }
        ]
    },
    {
        path: '/auth',
        element: <Authlayout />,
        children: [
            { 
                path: '/auth/login',
                element: <Login />
            },
            { 
                path: '/auth/registro',
                element: <Registro />
            }
        ]
    },
    {
        path: '/admin',
        element: (
            <ProtectedRoute>
                <Adminlayout />
            </ProtectedRoute>
        ),
    }
]);

export default router;
