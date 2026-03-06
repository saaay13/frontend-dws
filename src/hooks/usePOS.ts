import { useState } from 'react';
import { posService } from '../services/posService';

export const usePOS = () => {
    const [cart, setCart] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const addToCart = (product: any, quantity: number = 1) => {
        // Encontrar lote con stock disponible
        const availableLot = product.lots?.find((l: any) => l.stock_disponible >= quantity);

        if (!availableLot) {
            alert('No hay stock disponible suficiente en ningún lote');
            return;
        }

        const existingItem = cart.find(item => item.product_id === product.id && item.lot_id === availableLot.id);

        if (existingItem) {
            if (existingItem.quantity + quantity > availableLot.stock_disponible) {
                alert('No hay más stock disponible en este lote');
                return;
            }
            setCart(cart.map(item =>
                item.product_id === product.id && item.lot_id === availableLot.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            ));
        } else {
            setCart([...cart, {
                product_id: product.id,
                name: product.name,
                lot_id: availableLot.id,
                lot_code: availableLot.codigo_lote,
                price: availableLot.precio_venta,
                quantity: quantity
            }]);
        }
    };

    const removeFromCart = (productId: number, lotId: number) => {
        setCart(cart.filter(item => !(item.product_id === productId && item.lot_id === lotId)));
    };

    const clearCart = () => setCart([]);

    const calculateTotal = () => {
        return cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    };

    const processSale = async (clientId: number | null = null) => {
        if (cart.length === 0) return;
        setLoading(true);
        setError(null);
        try {
            const data = {
                client_id: clientId,
                items: cart.map(item => ({
                    product_id: item.product_id,
                    lot_id: item.lot_id,
                    quantity: item.quantity,
                    price: item.price
                })),
                total: calculateTotal()
            };
            const result = await posService.createSale(data);
            clearCart();
            return result;
        } catch (err: any) {
            setError(err.message || 'Error al procesar la venta');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        cart,
        loading,
        error,
        addToCart,
        removeFromCart,
        clearCart,
        calculateTotal,
        processSale
    };
};
