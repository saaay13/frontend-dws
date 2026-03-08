import { useState, useEffect } from 'react';
import { saleService } from '../services/saleService';

export const useSales = () => {
    const [sales, setSales] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSales = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await saleService.getAllSales();
            setSales(data);
        } catch (err: any) {
            setError(err.message || 'Error al cargar el historial de ventas');
        } finally {
            setLoading(false);
        }
    };

    const updateSale = async (id: number | string, saleData: any) => {
        setLoading(true);
        try {
            const response = await saleService.updateSale(id, saleData);
            const updatedSale = response.sale;
            
            // Si el estado es eliminado, quitar de la lista
            if (updatedSale.state === 'eliminado') {
                setSales(sales.filter(s => s.id != id));
            } else {
                setSales(sales.map(s => s.id == id ? updatedSale : s));
            }
            
            return updatedSale;
        } catch (err: any) {
            setError(err.message || 'Error al actualizar la venta');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteSale = async (id: number | string) => {
        setLoading(true);
        try {
            await saleService.deleteSale(id);
            setSales(sales.filter(s => s.id != id));
        } catch (err: any) {
            setError(err.message || 'Error al eliminar la venta');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSales();
    }, []);

    return {
        sales,
        loading,
        error,
        fetchSales,
        updateSale,
        deleteSale
    };
};
