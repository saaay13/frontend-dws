import { useState, useEffect } from 'react';
import { productService } from '../services/productService';

export const useProducts = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await productService.getAllProducts();
            setProducts(data);
        } catch (err: any) {
            setError(err.message || 'Error al cargar productos');
        } finally {
            setLoading(false);
        }
    };

    const addProduct = async (productData: any) => {
        setLoading(true);
        try {
            const newProduct = await productService.createProduct(productData);
            setProducts([...products, newProduct]);
            return newProduct;
        } catch (err: any) {
            setError(err.message || 'Error al crear producto');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateProduct = async (id: number | string, productData: any) => {
        setLoading(true);
        try {
            const response = await productService.updateProduct(id, productData);
            const updatedProduct = response.product;
            setProducts(products.map(p => p.id == id ? updatedProduct : p));
            return updatedProduct;
        } catch (err: any) {
            setError(err.message || 'Error al actualizar producto');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id: number | string) => {
        setLoading(true);
        try {
            await productService.deleteProduct(id);
            setProducts(products.filter(p => p.id != id));
        } catch (err: any) {
            setError(err.message || 'Error al eliminar producto');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return {
        products,
        loading,
        error,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct
    };
};
