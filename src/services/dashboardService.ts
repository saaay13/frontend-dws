import apiFetch from './api';

export const dashboardService = {
    async getAdminStats() {
        return apiFetch('/dashboard/admin', { method: 'GET' });
    },

    async getSellerStats() {
        return apiFetch('/dashboard/seller', { method: 'GET' });
    },

    async getClientStats() {
        return apiFetch('/dashboard/client', { method: 'GET' });
    }
};
