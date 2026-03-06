import apiFetch from './api';

export const posService = {
    async createSale(data: { client_id: number | null, items: any[], total: number }) {
        return apiFetch('/sales', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    async getHistory() {
        return apiFetch('/sales', {
            method: 'GET',
        });
    }
};
