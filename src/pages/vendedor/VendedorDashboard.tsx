import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../../hooks/useDashboard';

const VendedorDashboard: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { stats, loading } = useDashboard('seller');

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-muted-foreground font-medium animate-pulse">Preparando tu panel personalizado...</p>
        </div>
    );

    return (
        <div className="p-4 md:p-8 space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-primary/10 pb-6">
                <div>
                    <h1 className="text-4xl font-black text-foreground tracking-tighter italic">Panel de <span className="text-primary-500">Ventas</span></h1>
                    <p className="text-muted-foreground font-medium uppercase text-[10px] tracking-[0.2em] mt-1">Control de operaciones y estadísticas en tiempo real</p>
                </div>
                <button
                    onClick={() => navigate('/pos')}
                    className="px-8 py-3.5 rounded-2xl bg-primary text-white font-black text-md shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3"
                >
                    <span className="text-xl">🛒</span> INICIAR VENTA
                </button>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    {
                        title: 'Ventas Totales',
                        value: `$${stats?.my_sales_total?.toLocaleString() || '0'}`,
                        icon: '💰',
                        color: 'emerald',
                        desc: 'Historial acumulado hoy'
                    },
                    {
                        title: 'Ventas de Hoy',
                        value: stats?.today_sales?.length || 0,
                        icon: '📈',
                        color: 'indigo',
                        desc: 'Órdenes procesadas hoy'
                    },
                    {
                        title: 'Inventario Crítico',
                        value: stats?.inventory_overview?.filter((p: any) => p.stock < 5).length || 0,
                        icon: '⚠️',
                        color: 'amber',
                        desc: 'Productos con stock bajo'
                    }
                ].map((stat, i) => (
                    <div
                        key={i}
                        className={`glass-card group p-8 rounded-[2rem] border border-${stat.color}-500/10 bg-${stat.color}-50/5 hover:bg-${stat.color}-50/10 transition-all hover:shadow-2xl hover:shadow-${stat.color}-500/5`}
                    >
                        <div className={`h-14 w-14 bg-${stat.color}-500 rounded-[1.25rem] flex items-center justify-center text-2xl text-white mb-6 shadow-lg shadow-${stat.color}-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                            {stat.icon}
                        </div>
                        <h3 className="font-bold text-muted-foreground uppercase tracking-widest text-xs">{stat.title}</h3>
                        <p className={`text-4xl font-black text-${stat.color}-700 mt-2 tracking-tighter`}>{stat.value}</p>
                        <p className="text-xs text-muted-foreground mt-2 font-medium">{stat.desc}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass-card rounded-[2.5rem] overflow-hidden border-white/40 shadow-xl shadow-primary/5">
                    <div className="p-8 border-b border-primary/5 flex items-center justify-between bg-primary/5">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">⚡</div>
                            <h2 className="text-2xl font-black tracking-tight italic">Ventas de Hoy</h2>
                        </div>
                        <button
                            onClick={() => navigate('/admin/sales')}
                            className="text-xs font-black text-primary hover:underline underline-offset-4 uppercase tracking-widest"
                        >
                            Ver Todas →
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 border-b border-primary/5">
                                    <th className="px-8 py-5 text-left">Cliente / Orden</th>
                                    <th className="px-8 py-5 text-center">Estado</th>
                                    <th className="px-8 py-5 text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-primary/5">
                                {stats?.today_sales?.length > 0 ? (
                                    stats.today_sales.map((sale: any) => (
                                        <tr key={sale.id} className="group hover:bg-primary/5 transition-all cursor-pointer">
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col">
                                                    <span className="font-black text-foreground group-hover:text-primary transition-colors">
                                                        {sale.client?.user?.name || 'Cliente de Mostrador'}
                                                    </span>
                                                    <span className="text-[10px] font-bold text-muted-foreground uppercase">#V-{sale.id} • {new Date(sale.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex justify-center">
                                                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${sale.state_payment === 'pagado'
                                                        ? 'bg-success/10 text-success border border-success/20'
                                                        : 'bg-amber-100 text-amber-700 border border-amber-200'
                                                        }`}>
                                                        {sale.state_payment}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <span className="font-black text-lg text-primary">${Number(sale.total).toLocaleString()}</span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="px-8 py-16 text-center">
                                            <div className="flex flex-col items-center gap-3 text-muted-foreground">
                                                <span className="text-4xl grayscale opacity-50">📭</span>
                                                <p className="text-sm font-medium italic">Sin ventas registradas hoy todavía.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="glass-card p-8 rounded-[2.5rem] border-amber-500/10 bg-amber-50/5 shadow-xl shadow-amber-500/5">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-black tracking-tight italic">Inventario Local</h3>
                            <button onClick={() => navigate('/products')} className="text-[10px] font-black text-amber-600 hover:underline uppercase tracking-widest">Stock →</button>
                        </div>
                        <div className="space-y-4">
                            {stats?.inventory_overview?.slice(0, 5).map((prod: any) => (
                                <div key={prod.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/40 border border-white/60 hover:border-amber-200 transition-all">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-foreground truncate max-w-[140px]">{prod.nombre}</span>
                                        <span className={`text-[9px] font-black uppercase ${prod.stock < 5 ? 'text-error' : 'text-success'}`}>
                                            {prod.stock < 5 ? 'Reponer Pronto' : 'Stock Saludable'}
                                        </span>
                                    </div>
                                    <span className={`text-sm font-black ${prod.stock < 5 ? 'text-error animate-pulse' : 'text-foreground'}`}>
                                        {prod.stock}u
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-card p-8 rounded-[2.5rem] bg-indigo-600 text-white shadow-xl shadow-indigo-500/20">
                        <div className="h-10 w-10 bg-white/20 rounded-xl flex items-center justify-center text-xl mb-6">💡</div>
                        <h4 className="text-lg font-black mb-2">Consejo del Día</h4>
                        <p className="text-indigo-50/80 text-sm font-medium leading-relaxed">
                            Asegúrate de verificar el stock del lote antes de confirmar ventas grandes para evitar esperas al cliente.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendedorDashboard;
