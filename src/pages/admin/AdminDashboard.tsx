import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from '../../hooks/useDashboard';
import { CabeceraPaginaAdmin } from '../../components/molecules';
import { BentoDashboard } from '../../components/organisms';
import { PlantillaAdmin } from '../../components/templates';

const AdminDashboard: React.FC = () => {
    const { user } = useAuth();
    const { stats, loading } = useDashboard('admin');

    if (loading) return (
        <div className="min-h-screen mesh-gradient flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="h-10 w-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <p className="text-primary font-black uppercase tracking-widest text-[10px] animate-pulse">Sincronizando...</p>
            </div>
        </div>
    );

    return (
        <PlantillaAdmin
            cabecera={
                <CabeceraPaginaAdmin
                    title="Administrador"
                    category="Panel de Control"
                    subtitle={`Bienvenido de nuevo, ${user?.name || 'Admin'}. Aquí tienes el resumen de hoy.`}
                />
            }
            contenido={<BentoDashboard stats={stats} />}
        />
    );
};

export default AdminDashboard;
