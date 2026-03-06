import { useState, useEffect } from 'react';
import { lotService } from '../services/lotService';

export const useLots = (productId?: number | string) => {
    const [lots, setLots] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchLots = async () => {
        if (!productId) return;
        setLoading(true);
        setError(null);
        try {
            const data = await lotService.getLotsByProduct(productId);
            setLots(data);
        } catch (err: any) {
            setError(err.message || 'Error al cargar lotes');
        } finally {
            setLoading(false);
        }
    };

    const addLot = async (lotData: any) => {
        setLoading(true);
        try {
            const newLot = await lotService.createLot({ ...lotData, product_id: productId });
            setLots([...lots, newLot]);
            return newLot;
        } catch (err: any) {
            setError(err.message || 'Error al crear lote');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateLot = async (id: number | string, lotData: any) => {
        setLoading(true);
        try {
            const updatedLot = await lotService.updateLot(id, lotData);
            setLots(lots.map(l => l.id === id ? updatedLot : l));
            return updatedLot;
        } catch (err: any) {
            setError(err.message || 'Error al actualizar lote');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteLot = async (id: number | string) => {
        setLoading(true);
        try {
            await lotService.deleteLot(id);
            setLots(lots.filter(l => l.id !== id));
        } catch (err: any) {
            setError(err.message || 'Error al eliminar lote');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (productId) {
            fetchLots();
        }
    }, [productId]);

    return {
        lots,
        loading,
        error,
        fetchLots,
        addLot,
        updateLot,
        deleteLot
    };
};
