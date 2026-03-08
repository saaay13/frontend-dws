import React, { useState } from 'react';
import { useCart } from '../../../context/CartContext';
import { posService } from '../../../services/posService';
import { Button } from '../../atoms';

const CartDrawer: React.FC = () => {
    const { 
        cart, 
        removeFromCart, 
        updateQuantity, 
        total, 
        isCartOpen, 
        setIsCartOpen, 
        clearCart 
    } = useCart();
    
    const [loading, setLoading] = useState(false);
    const [direccionEntrega, setDireccionEntrega] = useState('');
    const [metodoPago, setMetodoPago] = useState('Transferencia / QR');

    const handleCheckout = async () => {
        if (cart.length === 0) return;
        if (!direccionEntrega) {
            alert('Por favor, ingresa una dirección de entrega.');
            return;
        }

        setLoading(true);
        try {
            const saleData = {
                seller_id: null, 
                client_id: null, 
                fecha: new Date().toISOString().split('T')[0],
                direccion_entrega: direccionEntrega,
                metodo_pago: metodoPago,
                productos: cart.map(item => ({
                    product_id: item.id,
                    cantidad: item.quantity
                }))
            };

            await posService.createSale(saleData as any);
            clearCart();
            setIsCartOpen(false);
            setDireccionEntrega('');
            alert('¡Pedido realizado con éxito!');
        } catch (error) {
            console.error('Error al pagar:', error);
            alert('Hubo un error al procesar tu pedido. Por favor intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Overlay */}
            <div 
                className="absolute inset-0 bg-background/40 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={() => setIsCartOpen(false)}
            />
            
            {/* Drawer */}
            <div className="relative w-full max-w-md bg-white/80 backdrop-blur-xl border-l border-white/40 shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
                <header className="p-6 border-b border-neutral-100 flex justify-between items-center bg-white/50">
                    <div>
                        <h2 className="text-2xl font-black text-foreground">Tu Carrito</h2>
                        <p className="text-sm text-muted-foreground mt-1">Listo para materializar tus proyectos.</p>
                    </div>
                    <button 
                        onClick={() => setIsCartOpen(false)}
                        className="h-10 w-10 rounded-xl bg-muted/20 flex items-center justify-center hover:bg-muted/30 transition-colors"
                    >
                        ✕
                    </button>
                </header>

                <div className="flex-grow overflow-y-auto p-6 space-y-6">
                    {/* Productos */}
                    <div className="space-y-4">
                        {cart.length === 0 ? (
                            <div className="h-40 flex flex-col items-center justify-center text-center opacity-40">
                                <p className="text-6xl mb-4">🛒</p>
                                <p className="text-lg italic">Tu carrito está vacío.</p>
                                <Button variant="outline" className="mt-4" onClick={() => setIsCartOpen(false)}>
                                    Volver a la tienda
                                </Button>
                            </div>
                        ) : (
                            cart.map((item) => (
                                <div key={item.id} className="p-4 rounded-2xl bg-white/50 border border-white shadow-sm flex items-center gap-4 group">
                                    <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
                                        📦
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="font-black text-sm group-hover:text-primary transition-colors">{item.name}</h4>
                                        <p className="text-primary font-bold text-lg">${item.price}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <button 
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="h-8 w-8 rounded-lg bg-muted/20 hover:bg-muted/30 flex items-center justify-center font-bold"
                                            >
                                                -
                                            </button>
                                            <span className="w-8 text-center font-black">{item.quantity}</span>
                                            <button 
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="h-8 w-8 rounded-lg bg-muted/20 hover:bg-muted/30 flex items-center justify-center font-bold"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => removeFromCart(item.id)}
                                        className="p-2 text-muted-foreground hover:text-error transition-colors"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {cart.length > 0 && (
                        <div className="space-y-6 pt-6 border-t border-neutral-100">
                            <div className="space-y-3">
                                <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground px-1">Detalles de Entrega</h3>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-muted-foreground ml-1 uppercase">Dirección de Envío</label>
                                    <input 
                                        type="text" 
                                        placeholder="Ej: Av. Las Américas 123"
                                        value={direccionEntrega}
                                        onChange={(e) => setDireccionEntrega(e.target.value)}
                                        className="w-full p-4 rounded-2xl bg-white/50 border border-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50 font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground px-1">Método de Pago</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {['Transferencia / QR', 'Efectivo'].map(metodo => (
                                        <button
                                            key={metodo}
                                            onClick={() => setMetodoPago(metodo)}
                                            className={`p-4 rounded-2xl border transition-all text-xs font-black ${
                                                metodoPago === metodo 
                                                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                                                : 'bg-white/50 border-white text-muted-foreground hover:bg-white hover:border-neutral-200'
                                            }`}
                                        >
                                            {metodo === 'Transferencia / QR' ? '💳 QR / Transf.' : '💵 Efectivo'}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {cart.length > 0 && (
                    <footer className="p-6 border-t border-neutral-100 bg-white shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] space-y-4">
                        <div className="flex justify-between items-end px-1">
                            <div>
                                <p className="text-muted-foreground font-bold text-xs uppercase tracking-tighter">Subtotal esperado</p>
                                <p className="text-muted-foreground text-[10px] italic leading-none mt-1">*Sujeto a disponibilidad de lotes</p>
                            </div>
                            <p className="text-3xl font-black text-primary">${total.toFixed(2)}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" onClick={clearCart} disabled={loading} className="rounded-2xl py-6 border-neutral-200 font-black">
                                VACIAR
                            </Button>
                            <Button 
                                variant="primary" 
                                onClick={handleCheckout}
                                disabled={loading}
                                className="rounded-2xl py-6 shadow-xl shadow-primary/20 font-black tracking-widest"
                            >
                                {loading ? 'PROCESANDO...' : 'CONFIRMAR'}
                            </Button>
                        </div>
                    </footer>
                )}
            </div>
        </div>
    );
};

export default CartDrawer;
