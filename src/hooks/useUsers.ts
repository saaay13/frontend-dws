import { useState, useEffect } from 'react';
import { userService } from '../services/userService';

export const useUsers = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await userService.getAllUsers();
            setUsers(data);
        } catch (err: any) {
            setError(err.message || 'Error al cargar usuarios');
        } finally {
            setLoading(false);
        }
    };

    const addUser = async (userData: any) => {
        setLoading(true);
        try {
            const response = await userService.createUser(userData);
            const newUser = response.user;
            setUsers(prev => [...prev, newUser]);
            return newUser;
        } catch (err: any) {
            setError(err.message || 'Error al crear usuario');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateUser = async (id: number | string, userData: any) => {
        setLoading(true);
        try {
            const response = await userService.updateUser(id, userData);
            const updatedUser = response.user;
            setUsers(prev => prev.map(u => u.id === id ? updatedUser : u));
            return updatedUser;
        } catch (err: any) {
            setError(err.message || 'Error al actualizar usuario');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id: number | string) => {
        setLoading(true);
        try {
            await userService.deleteUser(id);
            setUsers(prev => prev.filter(u => u.id !== id));
        } catch (err: any) {
            setError(err.message || 'Error al eliminar usuario');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return {
        users,
        loading,
        error,
        fetchUsers,
        addUser,
        updateUser,
        deleteUser
    };
};
