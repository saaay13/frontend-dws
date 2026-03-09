import apiFetch from './api';

export const userService = {
    async getAllUsers() {
        return apiFetch('/users', {
            method: 'GET',
        });
    },

    async getUserById(id: number | string) {
        return apiFetch(`/users/${id}`, {
            method: 'GET',
        });
    },

    async createUser(data: any) {
        return apiFetch('/users', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    async updateUser(id: number | string, data: any) {
        return apiFetch(`/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    async deleteUser(id: number | string) {
        return apiFetch(`/users/${id}`, {
            method: 'DELETE',
        });
    }
};
