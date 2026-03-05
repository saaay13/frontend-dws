const BASE_URL = 'http://127.0.0.1:8000/api';

const getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return undefined;
};

const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;

    const token = localStorage.getItem('token');
    const csrfToken = getCookie('XSRF-TOKEN');

    const defaultHeaders: Record<string, string> = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    };

    if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    if (csrfToken) {
        defaultHeaders['X-XSRF-TOKEN'] = decodeURIComponent(csrfToken);
    }

    const config = {
        ...options,
        credentials: 'include' as RequestCredentials,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };

    const response = await fetch(url, config);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw {
            status: response.status,
            message: errorData.message || 'Error en la petición',
            errors: errorData.errors || {}
        };
    }

    if (response.status === 204) return null;

    return response.json();
};

export default apiFetch;
