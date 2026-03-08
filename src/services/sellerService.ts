import apiFetch from './api';

export const sellerService = {
    async getAllSellers() {
        return apiFetch('/sellers', {
            method: 'GET',
        });
    }
};
