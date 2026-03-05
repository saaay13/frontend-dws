import apiFetch from './api';

export const authService = {
    async login(credentials: any) {
        await fetch('http://127.0.0.1:8000/sanctum/csrf-cookie', {
            method: 'GET',
            credentials: 'include',
        });


        return apiFetch('http://127.0.0.1:8000/login', {
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
