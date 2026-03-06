import { useState, useEffect } from 'react';
import { categoryService } from '../services/categoryService';

export const useCategories = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchCategories = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await categoryService.getAllCategories();
            setCategories(data);
        } catch (err: any) {
            setError(err.message || 'Error al cargar categorías');
        } finally {
            setLoading(false);
        }
    };

    const addCategory = async (categoryData: any) => {
        setLoading(true);
        try {
            const newCategory = await categoryService.createCategory(categoryData);
            setCategories([...categories, newCategory]);
            return newCategory;
        } catch (err: any) {
            setError(err.message || 'Error al crear categoría');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateCategory = async (id: number | string, categoryData: any) => {
        setLoading(true);
        try {
            const updatedCategory = await categoryService.updateCategory(id, categoryData);
            setCategories(categories.map(cat => cat.id === id ? updatedCategory : cat));
            return updatedCategory;
        } catch (err: any) {
            setError(err.message || 'Error al actualizar categoría');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteCategory = async (id: number | string) => {
        setLoading(true);
        try {
            await categoryService.deleteCategory(id);
            setCategories(categories.filter(cat => cat.id !== id));
        } catch (err: any) {
            setError(err.message || 'Error al eliminar categoría');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return {
        categories,
        loading,
        error,
        fetchCategories,
        addCategory,
        updateCategory,
        deleteCategory
    };
};
