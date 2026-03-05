import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../../hooks/useDashboard';

const VendedorDashboard: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { stats, loading } = useDashboard('seller');

    if (loading) return <div className="p-8 animate-pulse text-muted-foreground italic">Cargando tus ventas reales...</div>;

    return (
        <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-foreground">Panel de Ventas</h1>
                    <p className="text-muted-foreground mt-1">Vendedor: <span className="text-primary font-bold">{user?.name}</span></p>
                </div>
                <button
                    onClick={() => navigate('/products')}
                    className="px-6 py-3 rounded-xl bg-primary text-white font-black text-md shadow-xl shadow-primary/20 hover:scale-[1.05] active:scale-95 transition-all flex items-center gap-2"
                >
                    <span className="text-xl">🛒</span> Nueva Venta
                </button>
            </header>

            {/* Stats and Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 border-emerald-500/20 bg-emerald-50/20 group hover:shadow-emerald-500/10 cursor-pointer transition-all">
                    <div className="h-12 w-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:rotate-12 transition-transform">
                        📊
                    </div>
                    <h3 className="font-black text-lg">Ventas Totales</h3>
                    <p className="text-2xl font-black text-emerald-700 mt-1">${stats?.my_sales_total?.toLocaleString() || '0'}</p>
                    <p className="text-xs text-muted-foreground mt-1">Historial acumulado en el sistema.</p>
                </div>

                <div className="glass-card p-6 border-amber-500/20 bg-amber-50/20 group hover:shadow-amber-500/10 transition-all">
                    <div className="h-12 w-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:rotate-12 transition-transform">
                        📦
                    </div>
                    <h3 className="font-black text-lg">Inventario (Real)</h3>
                    <div className="mt-2 space-y-2">
                        {stats?.inventory_overview?.slice(0, 2).map((prod: any) => (
                            <div key={prod.id} className="flex justify-between items-center text-xs">
                                <span className="truncate max-w-[120px]">{prod.nombre}</span>
                                <span className="font-bold">{prod.stock} un.</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card p-6 border-indigo-500/20 bg-indigo-50/20 group hover:shadow-indigo-500/10 cursor-pointer transition-all">
                    <div className="h-12 w-12 bg-indigo-500 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:rotate-12 transition-transform">
                        📋
                    </div>
                    <h3 className="font-black text-lg">Gestión</h3>
                    <p className="text-sm text-muted-foreground mt-1">Acceder a cotizaciones y presupuestos.</p>
                </div>
            </div>

            {/* Today's Sales Table Preview */}
            <div className="glass-card overflow-hidden border-white/40">
                <div className="p-6 border-b border-muted/10 flex items-center justify-between">
                    <h2 className="text-xl font-black">Ventas Realizadas Hoy</h2>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold italic">
                        {stats?.today_sales?.length || 0} ventas hoy
                    </span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-muted/5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            <tr>
                                <th className="px-6 py-4">Cliente</th>
                                <th className="px-6 py-4">Monto</th>
                                <th className="px-6 py-4">Estado</th>
                                <th className="px-6 py-4">Fecha/Hora</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-muted/10 text-sm">
                            {stats?.today_sales?.length > 0 ? (
                                stats.today_sales.map((sale: any) => (
                                    <tr key={sale.id} className="hover:bg-muted/5 transition-colors">
                                        <td className="px-6 py-4 font-bold">{sale.client?.user?.name || 'Cliente Particular'}</td>
                                        <td className="px-6 py-4 font-black">${sale.total}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${sale.state_payment === 'pagado' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                                {sale.state_payment?.toUpperCase() || 'DESCONOCIDO'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">{new Date(sale.created_at).toLocaleString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground italic">No has realizado ventas hoy todavía.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default VendedorDashboard;
