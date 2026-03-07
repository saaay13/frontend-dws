import apiFetch from './api';

export const posService = {
    async createSale(data: {
        seller_id: number,
        client_id: number | null,
        fecha: string,
        direccion_entrega: string,
        metodo_pago: string,
        productos: { product_id: number, cantidad: number }[]
    }) {
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
