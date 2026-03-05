import React from 'react';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from './admin/AdminDashboard';
import VendedorDashboard from './vendedor/VendedorDashboard';
import ClienteDashboard from './cliente/ClienteDashboard';

const DashboardPage: React.FC = () => {
    const { user } = useAuth();

    if (user?.rol === 'administrador') {
        return <AdminDashboard />;
    }

    if (user?.rol === 'vendedor') {
        return <VendedorDashboard />;
    }

    if (user?.rol === 'cliente') {
        return <ClienteDashboard />;
    }

    return (
        <div className="p-8 text-center">
            <h2 className="text-xl font-bold">Rol no reconocido</h2>
            <p className="text-muted-foreground">Por favor, contacta con soporte.</p>
        </div>
    );
};

export default DashboardPage;
