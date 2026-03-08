import apiFetch from './api';

export const clientService = {
    async getAllClients() {
        return apiFetch('/clients', {
            method: 'GET',
        });
    },

    async getClientById(id: number | string) {
        return apiFetch(`/clients/${id}`, {
            method: 'GET',
        });
    },

    async createClient(data: any) {
        return apiFetch('/clients', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
};
