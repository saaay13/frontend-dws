import { useState, useEffect } from 'react';
import { dashboardService } from '../services/dashboardService';

export const useDashboard = (role: 'admin' | 'seller' | 'client') => {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStats = async () => {
        setLoading(true);
        setError(null);
        try {
            let data;
            if (role === 'admin') {
                data = await dashboardService.getAdminStats();
            } else if (role === 'seller') {
                data = await dashboardService.getSellerStats();
            } else {
                data = await dashboardService.getClientStats();
            }
            setStats(data);
        } catch (err: any) {
            console.error(`Error fetching ${role} stats:`, err);
            setError(err.message || 'Error al cargar los datos del servidor.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (role) {
            fetchStats();
        }
    }, [role]);

    return {
        stats,
        loading,
        error,
        refresh: fetchStats
    };
};
