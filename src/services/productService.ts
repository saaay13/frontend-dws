import apiFetch from './api';

export const productService = {
    async getAllProducts() {
        return apiFetch('/products', {
            method: 'GET',
        });
    },

    async getProductById(id: number | string) {
        return apiFetch(`/products/${id}`, {
            method: 'GET',
        });
    },

    async createProduct(data: any) {
        return apiFetch('/products', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    async updateProduct(id: number | string, data: any) {
        return apiFetch(`/products/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    async deleteProduct(id: number | string) {
        return apiFetch(`/products/${id}`, {
            method: 'DELETE',
        });
    }
};
