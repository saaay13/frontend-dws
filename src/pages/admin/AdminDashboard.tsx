import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from '../../hooks/useDashboard';

const AdminDashboard: React.FC = () => {
    const { user } = useAuth();
    const { stats, loading } = useDashboard('admin');

    if (loading) return (
        <div className="min-h-screen mesh-gradient flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="h-10 w-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <p className="text-primary font-black uppercase tracking-widest text-[10px] animate-pulse">Sincronizando...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen mesh-gradient p-6 md:p-12 relative overflow-hidden">
            <div className="blob -top-20 -right-20 w-[800px] h-[800px] opacity-10" />

            <div className="max-w-7xl mx-auto space-y-10 relative z-10">
                <header className="flex justify-between items-end">
                    <div className="space-y-1">
                        <p className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">Panel de Administración</p>
                        <h1 className="text-5xl font-black text-foreground tracking-tighter">Admin<span className="text-primary-400">istrador</span></h1>
                    </div>
                </header>

                <div className="grid grid-cols-12 gap-6 pb-12">
                    <div className="col-span-12 lg:col-span-8 row-span-2 glass-card p-10 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 h-64 w-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <p className="text-xs font-black text-primary-300 uppercase tracking-widest mb-2">Ingresos Consolidados</p>
                                <h2 className="text-7xl font-black text-foreground tracking-tighter leading-none mb-6">
                                    ${stats?.total_sales?.toLocaleString()}
                                </h2>
                                <div className="flex gap-2">
                                </div>
                            </div>
                            <div className="mt-12 w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-[65%] shadow-[0_0_15px_rgba(255,107,0,0.5)]" />
                            </div>
                        </div>
                    </div>

                    {/* Bento: Stock Critical */}
                    <div className="col-span-12 md:col-span-6 lg:col-span-4 glass-card p-8 rounded-[2.5rem] border border-white/10 shadow-xl flex flex-col justify-between group hover:bg-error/5 transition-colors">
                        <div className="flex justify-between items-start">
                            <span className="text-[10px] font-black text-error uppercase tracking-widest">Alerta Stock</span>
                            <div className="h-10 w-10 flex items-center justify-center rounded-2xl bg-error/10 text-error">⚠️</div>
                        </div>
                        <div>
                            <p className="text-5xl font-black text-foreground tracking-tighter">{stats?.low_stock}</p>
                            <p className="text-xs font-bold text-muted-foreground uppercase mt-1">Productos por reponer</p>
                        </div>
                    </div>

                    {/* Bento: Users Mini */}
                    <div className="col-span-12 md:col-span-6 lg:col-span-4 glass-card p-8 rounded-[2.5rem] border border-white/10 shadow-xl flex flex-col justify-between group hover:bg-primary/5 transition-colors">
                        <div className="flex justify-between items-start">
                            <span className="text-[10px] font-black text-primary uppercase tracking-widest">Actividad</span>
                            <div className="h-10 w-10 flex items-center justify-center rounded-2xl bg-primary/10 text-primary">👥</div>
                        </div>
                        <div>
                            <p className="text-5xl font-black text-foreground tracking-tighter">{stats?.active_users}</p>
                            <p className="text-xs font-bold text-muted-foreground uppercase mt-1">Usuarios hoy</p>
                        </div>
                    </div>

                    {/* Bento: Recent Transitions (Feed Style) */}
                    <div className="col-span-12 lg:col-span-7 glass-card p-10 rounded-[3rem] border border-white/10 shadow-2xl space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-black text-foreground tracking-tight">Movimientos</h3>
                            <button className="text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:opacity-70">Ver todo →</button>
                        </div>
                        <div className="space-y-2">
                            {stats?.recent_activity?.map((sale: any) => (
                                <div key={sale.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary border border-primary/10">
                                            {sale.client?.user?.name?.[0] || 'C'}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-foreground leading-none mb-1">Orden #{sale.id}</p>
                                            <p className="text-[9px] text-muted-foreground font-bold uppercase">{sale.seller?.user?.name || 'Sistema'}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm font-black text-success-dark">${sale.total}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bento: Power Actions (Tiles) */}
                    <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-4">
                        <button className="glass-card p-6 rounded-[2rem] border border-white/10 flex flex-col justify-center items-center gap-3 hover:scale-105 transition-all text-center">
                            <span className="text-2xl">⚡</span>
                            <span className="text-[10px] font-black uppercase tracking-widest">Reportes</span>
                        </button>
                        <button className="glass-card p-6 rounded-[2rem] border border-white/10 flex flex-col justify-center items-center gap-3 hover:scale-105 transition-all text-center bg-primary/5 border-primary/20">
                            <span className="text-2xl">📦</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Gestión</span>
                        </button>
                        <button className="glass-card p-6 rounded-[2rem] border border-white/10 flex flex-col justify-center items-center gap-3 hover:scale-105 transition-all text-center">
                            <span className="text-2xl">🛡️</span>
                            <span className="text-[10px] font-black uppercase tracking-widest">Auditoría</span>
                        </button>
                        <button className="glass-card p-6 rounded-[2rem] border border-white/10 flex flex-col justify-center items-center gap-3 hover:scale-105 transition-all text-center">
                            <span className="text-2xl">⚙️</span>
                            <span className="text-[10px] font-black uppercase tracking-widest">Ajustes</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
