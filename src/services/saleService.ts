import apiFetch from './api';

export const saleService = {
    async getAllSales() {
        return apiFetch('/sales', {
            method: 'GET',
        });
    },

    async getSaleById(id: number | string) {
        return apiFetch(`/sales/${id}`, {
            method: 'GET',
        });
    },

    async updateSale(id: number | string, data: any) {
        return apiFetch(`/sales/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    async deleteSale(id: number | string) {
        return apiFetch(`/sales/${id}`, {
            method: 'DELETE',
        });
    }
};
