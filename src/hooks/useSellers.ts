import { useState, useEffect } from 'react';
import { sellerService } from '../services/sellerService';

export const useSellers = () => {
    const [sellers, setSellers] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSellers = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await sellerService.getAllSellers();
            setSellers(data);
        } catch (err: any) {
            setError(err.message || 'Error al cargar vendedores');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSellers();
    }, []);

    return {
        sellers,
        loading,
        error,
        fetchSellers
    };
};
