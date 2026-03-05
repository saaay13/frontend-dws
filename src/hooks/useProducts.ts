import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/productService';

export const useProducts = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await productService.getAllProducts();
            setProducts(data);
        } catch (err: any) {
            console.error('Error fetching products:', err);
            setError(err.message || 'No se pudieron cargar los productos');

            setProducts([
                { id: 1, name: 'Producto Demo 1', category: 'General', price: '$10.00', stock: 100 },
                { id: 2, name: 'Producto Demo 2', category: 'General', price: '$20.00', stock: 50 },
            ]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    return {
        products: filteredProducts,
        search,
        setSearch,
        loading,
        error,
        refreshProducts: fetchProducts
    };
};
