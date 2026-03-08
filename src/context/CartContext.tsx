import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    stock: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: any) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, delta: number) => void;
    clearCart: () => void;
    total: number;
    itemCount: number;
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem('dws_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('dws_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: any) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            const productPrice = typeof product.price === 'string' 
                ? parseFloat(product.price) 
                : (Number(product.price) || 0);

            if (existingItem) {
                if (existingItem.quantity < product.stock) {
                    return prevCart.map(item =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1, price: productPrice } // Update price too just in case
                            : item
                    );
                }
                return prevCart;
            }
            return [...prevCart, { 
                id: product.id, 
                name: product.name, 
                price: productPrice, 
                quantity: 1,
                stock: product.stock 
            }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (productId: number) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: number, delta: number) => {
        setCart(prevCart => prevCart.map(item => {
            if (item.id === productId) {
                const newQuantity = item.quantity + delta;
                if (newQuantity > 0 && newQuantity <= item.stock) {
                    return { ...item, quantity: newQuantity };
                }
            }
            return item;
        }));
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('dws_cart');
    };

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            total,
            itemCount,
            isCartOpen,
            setIsCartOpen
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
