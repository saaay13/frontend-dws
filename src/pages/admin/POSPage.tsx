import React, { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { usePOS } from '../../hooks/usePOS';
import { useAuth } from '../../context/AuthContext';
import { Button, Input, Badge } from '../../components/atoms';
import { CabeceraPaginaAdmin } from '../../components/molecules';

const POSPage: React.FC = () => {
    const { user } = useAuth();
    const { products, loading: productsLoading, fetchProducts } = useProducts();
    const { cart, addToCart, removeFromCart, calculateTotal, processSale, loading: posLoading, error } = usePOS();
    const [searchTerm, setSearchTerm] = useState('');
    const [direccion, setDireccion] = useState('Tienda Central');
    const [metodoPago, setMetodoPago] = useState('Efectivo');
    const [clientId] = useState<number | null>(null);

    if (productsLoading) return (
        <div className="min-h-screen mesh-gradient flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="h-10 w-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <p className="text-primary font-black uppercase tracking-widest text-[10px] animate-pulse">Cargando catálogo...</p>
            </div>
        </div>
    );

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCheckout = async () => {
        if (!user || !user.id) {
            alert('Debes estar autenticado para realizar una venta');
            return;
        }

        try {
            await processSale({
                clientId,
                sellerId: user.id,
                direccion,
                metodoPago
            });
            alert('¡Venta realizada con éxito! El stock ha sido actualizado.');
            fetchProducts(); // Recargar productos para ver el nuevo stock
        } catch (err: any) {
            alert('Error al procesar la venta: ' + (err.response?.data?.mensaje || err.message));
        }
    };

    return (
        <div className="min-h-screen mesh-gradient p-4 md:p-8 flex flex-col md:flex-row gap-6">
            {/* Productos */}
            <div className="flex-grow space-y-6">
                <CabeceraPaginaAdmin
                    title="Punto de"
                    category="Ventas"
                    subtitle="Registra salidas de productos y genera ventas al instante."
                />

                <div className="relative">
                    <Input
                        placeholder="Buscar productos..."
                        value={searchTerm}
                        onChange={(e: any) => setSearchTerm(e.target.value)}
                        className="pl-12 h-14 text-lg rounded-2xl"
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl opacity-40">🔍</span>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto max-h-[calc(100vh-250px)] premium-scroll pr-2">
                    {filteredProducts.map(product => {
                        const stock = product.lots?.reduce((acc: number, l: any) => acc + l.stock_disponible, 0) || 0;
                        return (
                            <div
                                key={product.id}
                                onClick={() => stock > 0 && addToCart(product)}
                                className={`glass-card p-6 rounded-[2rem] border border-white/10 cursor-pointer transition-all duration-300 relative overflow-hidden group ${stock === 0 ? 'opacity-40 grayscale pointer-events-none' : 'hover:scale-[1.03] hover:border-primary/30'}`}
                            >
                                <div className="absolute top-0 right-0 h-24 w-24 bg-primary/5 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-primary/10 transition-colors" />

                                <div className="relative z-10 space-y-4">
                                    <div className="flex justify-between items-start gap-2">
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black text-primary uppercase tracking-widest">{product.category?.name || 'General'}</p>
                                            <h3 className="font-bold text-foreground leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center pt-2 border-t border-white/5">
                                        <div className="flex flex-col">
                                            <span className="text-lg font-black font-mono text-foreground">${product.lots?.[0]?.precio_venta || '0.00'}</span>
                                        </div>
                                        <Badge variant={stock < 10 ? 'error' : 'success'} size="sm">
                                            {stock} disp.
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Carrito */}
            <aside className="w-full md:w-96 flex flex-col glass-card p-6 rounded-3xl border border-border/50 sticky top-24 self-start max-h-[calc(100vh-100px)]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        🛒 Carrito <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">{cart.length}</span>
                    </h2>
                </div>

                <div className="flex-grow overflow-y-auto space-y-4 mb-6 premium-scroll pr-2">
                    {cart.map(item => (
                        <div key={`${item.product_id}-${item.lot_id}`} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/10 group">
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-primary-100">{item.name}</span>
                                <span className="text-[10px] text-muted-foreground uppercase">Lote: {item.lot_code}</span>
                                <span className="text-xs font-mono">${item.price} x {item.quantity}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-sm mx-2">${(item.price * item.quantity).toFixed(2)}</span>
                                <button
                                    onClick={() => removeFromCart(item.product_id, item.lot_id)}
                                    className="text-error-dark opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-error/10 rounded-lg"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    ))}
                    {cart.length === 0 && (
                        <div className="text-center py-20 opacity-30 italic text-sm">El carrito está vacío</div>
                    )}
                </div>

                <div className="border-t border-border/50 pt-6 space-y-4">
                    <div className="space-y-3">
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Dirección de Entrega</label>
                            <Input
                                value={direccion}
                                onChange={(e: any) => setDireccion(e.target.value)}
                                className="h-9 text-xs"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Método de Pago</label>
                            <select
                                value={metodoPago}
                                onChange={(e: any) => setMetodoPago(e.target.value)}
                                className="flex h-9 w-full rounded-xl border border-input bg-background/50 backdrop-blur-sm px-3 py-1 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="Efectivo">Efectivo</option>
                                <option value="Tarjeta">Tarjeta de Crédito/Débito</option>
                                <option value="Transferencia">Transferencia QR</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-between items-center py-2">
                        <span className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">Total a Pagar</span>
                        <span className="text-3xl font-black font-mono text-primary-400">
                            ${calculateTotal().toFixed(2)}
                        </span>
                    </div>

                    {error && (
                        <div className="p-3 rounded-xl bg-error/10 border border-error/20 text-error text-[10px] font-bold">
                            ⚠️ {error}
                        </div>
                    )}

                    <Button
                        onClick={handleCheckout}
                        className="w-full py-4 text-lg font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        disabled={cart.length === 0 || posLoading}
                    >
                        {posLoading ? 'Procesando...' : 'Finalizar Venta'}
                    </Button>
                </div>
            </aside>
        </div>
    );
};

export default POSPage;
