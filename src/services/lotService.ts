import apiFetch from './api';

export const lotService = {
    async getAllLots() {
        return apiFetch('/lots', {
            method: 'GET',
        });
    },

    async getLotById(id: number | string) {
        return apiFetch(`/lots/${id}`, {
            method: 'GET',
        });
    },

    async getLotsByProduct(productId: number | string) {
        return apiFetch(`/products/${productId}/lots`, {
            method: 'GET',
        });
    },

    async createLot(data: any) {
        return apiFetch('/lots', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    async updateLot(id: number | string, data: any) {
        return apiFetch(`/lots/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    async deleteLot(id: number | string) {
        return apiFetch(`/lots/${id}`, {
            method: 'DELETE',
        });
    }
};
