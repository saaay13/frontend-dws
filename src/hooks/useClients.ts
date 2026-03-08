import { useState, useEffect } from 'react';
import { clientService } from '../services/clientService';

export const useClients = () => {
    const [clients, setClients] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchClients = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await clientService.getAllClients();
            setClients(data);
        } catch (err: any) {
            setError(err.message || 'Error al cargar clientes');
        } finally {
            setLoading(false);
        }
    };

    const addClient = async (clientData: any) => {
        setLoading(true);
        try {
            const response = await clientService.createClient(clientData);
            const newClient = response.client;
            setClients([...clients, newClient]);
            return newClient;
        } catch (err: any) {
            setError(err.message || 'Error al crear cliente');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    return {
        clients,
        loading,
        error,
        fetchClients,
        addClient
    };
};
