import apiFetch from './api';

export const categoryService = {
    async getAllCategories() {
        return apiFetch('/categories', {
            method: 'GET',
        });
    },

    async getCategoryById(id: number | string) {
        return apiFetch(`/categories/${id}`, {
            method: 'GET',
        });
    },

    async createCategory(data: any) {
        return apiFetch('/categories', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    async updateCategory(id: number | string, data: any) {
        return apiFetch(`/categories/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    async deleteCategory(id: number | string) {
        return apiFetch(`/categories/${id}`, {
            method: 'DELETE',
        });
    }
};
