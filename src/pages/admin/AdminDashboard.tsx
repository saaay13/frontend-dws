import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from '../../hooks/useDashboard';

const AdminDashboard: React.FC = () => {
    const { user } = useAuth();
    const { stats, loading } = useDashboard('admin');

    if (loading) return <div className="p-8 animate-pulse text-muted-foreground italic">Cargando métricas reales...</div>;

    const cards = [
        { label: 'Ventas Totales', value: `$${stats?.total_sales?.toLocaleString() || '0'}`, icon: '💰', color: 'bg-emerald-500' },
        { label: 'Usuarios Activos', value: stats?.active_users || '0', icon: '👥', color: 'bg-indigo-500' },
        { label: 'Stock Crítico', value: stats?.low_stock || '0', icon: '⚠️', color: 'bg-rose-500' },
        { label: 'Nuevos Pedidos', value: stats?.recent_activity?.length || '0', icon: '📦', color: 'bg-amber-500' },
    ];

    return (
        <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-foreground">Panel Administrativo</h1>
                    <p className="text-muted-foreground mt-1">Súper usuario: <span className="text-primary font-bold">{user?.name}</span></p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 rounded-xl bg-white border font-bold text-sm shadow-sm hover:bg-neutral-50 transition-colors">Generar Reporte</button>
                    <button className="px-4 py-2 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">Nueva Gestión</button>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((stat, i) => (
                    <div key={i} className="glass-card p-6 flex items-center gap-4 border-white/40 hover:scale-[1.02] transition-transform cursor-default">
                        <div className={`h-12 w-12 ${stat.color} rounded-2xl flex items-center justify-center text-white text-xl shadow-lg`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                            <p className="text-2xl font-black text-foreground">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 glass-card p-8 border-white/40">
                    <h2 className="text-xl font-black mb-6">Actividad Reciente</h2>
                    <div className="space-y-6">
                        {stats?.recent_activity?.length > 0 ? (
                            stats.recent_activity.map((sale: any) => (
                                <div key={sale.id} className="flex items-center justify-between py-2 border-b border-muted/20 last:border-0">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                                            {sale.client?.user?.name?.[0] || 'C'}
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">Venta #{sale.id}</p>
                                            <p className="text-xs text-muted-foreground">
                                                Por {sale.seller?.user?.name || 'Sistema'} - {new Date(sale.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-sm font-black text-emerald-600">${sale.total}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground italic">No hay actividad reciente registrada.</p>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="glass-card p-8 border-white/40 bg-primary/5">
                    <h2 className="text-xl font-black mb-6">Accesos Rápidos</h2>
                    <div className="grid grid-cols-1 gap-3">
                        <button className="w-full p-4 rounded-xl bg-white border border-primary/10 flex items-center gap-3 hover:translate-x-1 transition-transform">
                            <span className="text-xl">🛠️</span>
                            <div className="text-left">
                                <p className="text-sm font-bold">Mantenimiento</p>
                                <p className="text-xs text-muted-foreground">Configuración global</p>
                            </div>
                        </button>
                        <button className="w-full p-4 rounded-xl bg-white border border-primary/10 flex items-center gap-3 hover:translate-x-1 transition-transform">
                            <span className="text-xl">📁</span>
                            <div className="text-left">
                                <p className="text-sm font-bold">Auditoría</p>
                                <p className="text-xs text-muted-foreground">Log de operaciones</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
