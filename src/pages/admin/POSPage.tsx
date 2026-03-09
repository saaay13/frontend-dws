import React, { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { usePOS } from '../../hooks/usePOS';
import { useAuth } from '../../context/AuthContext';
import { Button, Input, Badge } from '../../components/atoms';
import { CabeceraPaginaAdmin, SelectorCliente, SelectorVendedor } from '../../components/molecules';
import { PlantillaAdmin } from '../../components/templates';

const POSPage: React.FC = () => {
    const { user } = useAuth();
    const { products, loading: productsLoading, fetchProducts } = useProducts();
    const { cart, addToCart, removeFromCart, calculateTotal, processSale, loading: posLoading, error } = usePOS();
    const [searchTerm, setSearchTerm] = useState('');
    const [direccion, setDireccion] = useState('Tienda Central');
    const [metodoPago, setMetodoPago] = useState('Efectivo');
    const [clientId, setClientId] = useState<number | null>(null);
    const [selectedSellerId, setSelectedSellerId] = useState<number | null>(user?.seller?.id || null);

    React.useEffect(() => {
        if (user?.seller?.id && !selectedSellerId) {
            setSelectedSellerId(user.seller.id);
        }
    }, [user, selectedSellerId]);

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCheckout = async () => {
        const finalSellerId = user?.rol === 'administrador' ? selectedSellerId : user?.seller?.id;

        if (!finalSellerId) {
            alert('Error: Perfil de vendedor no encontrado.');
            return;
        }

        try {
            await processSale({
                clientId,
                sellerId: finalSellerId,
                direccion,
                metodoPago
            });
            alert('¡Venta realizada con éxito! El stock ha sido actualizado.');
            fetchProducts();
        } catch (err: any) {
            console.error(err);
        }
    };

    return (
        <PlantillaAdmin
            isLoading={productsLoading || posLoading}
            cabecera={
                <CabeceraPaginaAdmin
                    title="Punto de Venta"
                    subtitle="Registra salidas de productos y genera ventas al instante con gestión inteligente de stock."
                    action={
                        <div className="relative w-64 md:w-96 group">
                            <Input
                                placeholder="Buscar productos (Nombre o Categoría)..."
                                value={searchTerm}
                                onChange={(e: any) => setSearchTerm(e.target.value)}
                                className="pl-12 h-14 text-sm rounded-2xl bg-white/5 border-white/10 group-hover:border-primary/30 transition-all"
                            />
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl opacity-40 group-hover:opacity-100 transition-opacity">🔍</span>
                        </div>
                    }
                />
            }
            contenido={
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Catalogo de Productos */}
                    <div className="flex-grow grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom duration-700">
                        {filteredProducts.map(product => {
                            const stock = product.lots?.reduce((acc: number, l: any) => acc + (l.stock_disponible || 0), 0) || 0;
                            return (
                                <div
                                    key={product.id}
                                    onClick={() => stock > 0 && addToCart(product)}
                                    className={`glass-card p-6 rounded-[2.5rem] border border-white/10 cursor-pointer transition-all duration-500 relative overflow-hidden group ${stock === 0 ? 'opacity-40 grayscale pointer-events-none' : 'hover:scale-[1.05] hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10'}`}
                                >
                                    {/* Decoracion */}
                                    <div className="absolute -top-10 -right-10 h-32 w-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700" />

                                    <div className="relative z-10 space-y-5">
                                        <div className="space-y-1.5">
                                            <span className="text-[10px] font-black text-primary-400 uppercase tracking-widest">{product.category?.name || 'General'}</span>
                                            <h3 className="text-lg font-black text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2">{product.name}</h3>
                                        </div>

                                        <div className="flex justify-between items-end">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold text-muted-foreground uppercase">Precio</span>
                                                <span className="text-2xl font-black font-mono text-foreground">${product.lots?.[0]?.precio_venta || '0.00'}</span>
                                            </div>
                                            <Badge variant={stock < 10 ? (stock === 0 ? 'error' : 'warning') : 'success'} size="sm" className="rounded-xl px-3 font-black">
                                                {stock} PIEZAS
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Overlay de Hover */}
                                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <span className="bg-primary text-white p-3 rounded-full shadow-2xl scale-50 group-hover:scale-100 transition-all duration-500">
                                            ➕
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Resumen de Venta / Carrito */}
                    <aside className="w-full lg:w-[360px] animate-in fade-in slide-in-from-right duration-1000 delay-300">
                        <div className="glass-card p-4 rounded-[1.5rem] border border-white/10 shadow-2xl space-y-4 sticky top-32">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-black tracking-tighter">Resumen</h2>
                                <Badge variant="success" size="sm" className="rounded-xl px-3 py-1 font-black">{cart.length} ITEMS</Badge>
                            </div>

                            {/* Lista de Items */}
                            <div className="space-y-2 max-h-[160px] overflow-y-auto premium-scroll pr-2">
                                {cart.map(item => (
                                    <div key={`${item.product_id}-${item.lot_id}`} className="flex justify-between items-center group/item bg-white/5 hover:bg-white/10 p-2 rounded-xl border border-white/5 transition-all">
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-[11px] font-black text-foreground truncate">{item.name}</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[9px] font-mono text-primary-300 px-1 bg-primary/10 rounded">${item.price}</span>
                                                <span className="text-[9px] font-bold text-muted-foreground">x {item.quantity}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-black font-mono text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                                            <button
                                                onClick={() => removeFromCart(item.product_id, item.lot_id)}
                                                className="h-6 w-6 flex items-center justify-center bg-error/5 hover:bg-error text-error hover:text-white rounded-lg transition-all"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {cart.length === 0 && (
                                    <div className="flex flex-col items-center justify-center py-8 opacity-30 gap-2">
                                        <span className="text-4xl">🛒</span>
                                        <p className="font-bold uppercase tracking-widest text-[8px]">Vacío</p>
                                    </div>
                                )}
                            </div>

                            {/* Configuracion de Venta */}
                            <div className="space-y-3 pt-4 border-t border-white/10">
                                {user?.rol === 'administrador' && (
                                    <SelectorVendedor
                                        selectedId={selectedSellerId}
                                        onSelect={(id) => setSelectedSellerId(id)}
                                    />
                                )}
                                <SelectorCliente
                                    selectedId={clientId}
                                    onSelect={setClientId}
                                />

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Pago</label>
                                        <select
                                            value={metodoPago}
                                            onChange={(e: any) => setMetodoPago(e.target.value)}
                                            className="h-9 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-[10px] font-bold outline-none"
                                        >
                                            <option value="Efectivo" className="bg-slate-900">Efectivo</option>
                                            <option value="Tarjeta" className="bg-slate-900">Tarjeta</option>
                                            <option value="QR" className="bg-slate-900">QR / Transferencia</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Entrega</label>
                                        <select
                                            value={direccion === 'Tienda Central' ? 'Tienda' : 'Envio'}
                                            onChange={(e: any) => setDireccion(e.target.value === 'Tienda' ? 'Tienda Central' : 'Dirección de Envío')}
                                            className="h-9 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-[10px] font-bold outline-none"
                                        >
                                            <option value="Tienda" className="bg-slate-900">Tienda</option>
                                            <option value="Envio" className="bg-slate-900">Envío (Domicilio)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Totales y Accion */}
                            <div className="space-y-3 pt-4 border-t border-white/10">
                                {error && (
                                    <p className="text-[9px] font-bold text-error bg-error/10 p-2 rounded-lg leading-tight uppercase">
                                        ⚠️ {error}
                                    </p>
                                )}
                                <div className="flex justify-between items-center">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Total</span>
                                    <span className="text-2xl font-black font-mono text-primary">
                                        ${calculateTotal().toFixed(2)}
                                    </span>
                                </div>

                                <Button
                                    onClick={handleCheckout}
                                    className="w-full h-12 text-base font-black shadow-xl rounded-2xl"
                                    disabled={cart.length === 0 || posLoading}
                                >
                                    {posLoading ? '...' : 'CONFIRMAR'}
                                </Button>
                            </div>
                        </div>
                    </aside>
                </div>
            }
        />
    );
};

export default POSPage;
