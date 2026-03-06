import React, { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { usePOS } from '../../hooks/usePOS';
import { Button, Input, Card } from '../../components/atoms';

const POSPage: React.FC = () => {
    const { products, loading: productsLoading } = useProducts();
    const { cart, addToCart, removeFromCart, calculateTotal, processSale, loading: posLoading } = usePOS();
    const [searchTerm, setSearchTerm] = useState('');

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
        try {
            await processSale();
            alert('Venta realizada con éxito');
        } catch (err) {
            alert('Error al procesar la venta');
        }
    };

    return (
        <div className="min-h-screen mesh-gradient p-4 md:p-8 flex flex-col md:flex-row gap-6">
            {/* Productos */}
            <div className="flex-grow space-y-6">
                <header className="space-y-2">
                    <h1 className="text-3xl font-black text-foreground">Punto de <span className="text-primary-400">Venta</span></h1>
                    <div className="relative">
                        <Input
                            placeholder="Buscar productos..."
                            value={searchTerm}
                            onChange={(e: any) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30">🔍</span>
                    </div>
                </header>

                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto max-h-[calc(100vh-250px)] premium-scroll pr-2">
                    {filteredProducts.map(product => {
                        const stock = product.lots?.reduce((acc: number, l: any) => acc + l.stock_disponible, 0) || 0;
                        return (
                            <Card
                                key={product.id}
                                onClick={() => stock > 0 && addToCart(product)}
                                className={`p-4 cursor-pointer hover:border-primary/50 transition-all ${stock === 0 ? 'opacity-50 grayscale' : 'hover:scale-105'}`}
                            >
                                <div className="space-y-2">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-sm leading-tight text-primary-200">{product.name}</h3>
                                        <span className="text-[10px] bg-primary/10 px-1 rounded text-primary-400 font-bold uppercase">
                                            {product.category?.name}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <span className="text-lg font-black font-mono text-foreground">
                                            ${product.lots?.[0]?.precio_venta || '0.00'}
                                        </span>
                                        <span className={`text-[10px] font-bold ${stock < 10 ? 'text-error' : 'text-success'}`}>
                                            Stock: {stock}
                                        </span>
                                    </div>
                                </div>
                            </Card>
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
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground font-bold uppercase tracking-widest text-xs">Total a Pagar</span>
                        <span className="text-3xl font-black font-mono text-primary-400">
                            ${calculateTotal().toFixed(2)}
                        </span>
                    </div>
                    <Button
                        onClick={handleCheckout}
                        className="w-full py-4 text-lg font-black shadow-xl shadow-primary/20"
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
