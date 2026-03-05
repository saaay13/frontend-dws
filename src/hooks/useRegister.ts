import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiFetch from '../services/api';

export const useRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        apellidos: '',
        ci: '',
        telefono: '',
        email: '',
        password: '',
        rol: 'cliente'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await fetch('http://127.0.0.1:8000/sanctum/csrf-cookie', {
                method: 'GET',
                credentials: 'include',
            });

            await apiFetch('/users', {
                method: 'POST',
                body: JSON.stringify(formData),
            });

            navigate('/login');
        } catch (err: any) {
            setError(err.message || 'Error al registrar usuario.');
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        handleChange,
        loading,
        error,
        handleRegister
    };
};
