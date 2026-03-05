import apiFetch from './api';

export const authService = {
    async login(credentials: any) {
        await fetch('http://localhost:8000/sanctum/csrf-cookie', {
            method: 'GET',
        });

        return apiFetch('/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    },

    async logout() {
        return apiFetch('/logout', {
            method: 'POST',
        });
    },

    async getCurrentUser() {
        return apiFetch('/user', {
            method: 'GET',
        });
    }
};
