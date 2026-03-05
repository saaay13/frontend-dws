import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../../hooks/useDashboard';

const ClienteDashboard: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { stats, loading } = useDashboard('client');

    if (loading) return <div className="p-8 animate-pulse text-muted-foreground italic text-center">Cargando tu historial de compras...</div>;

    const profile = stats?.profile || user;

    return (
        <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-foreground">Mi Espacio</h1>
                    <p className="text-muted-foreground mt-1">¡Hola de nuevo, <span className="text-primary font-bold">{profile?.name}</span>!</p>
                </div>
                <button
                    onClick={() => navigate('/products')}
                    className="px-6 py-3 rounded-xl bg-primary text-white font-black text-md shadow-xl shadow-primary/20 hover:scale-[1.05] active:scale-95 transition-all"
                >
                    Explorar Tienda
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Orders History */}
                <div className="glass-card p-8 border-white/40">
                    <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                        <span>📦</span> Mis Últimas Compras (Real)
                    </h2>
                    <div className="space-y-4">
                        {stats?.order_history?.length > 0 ? (
                            stats.order_history.map((sale: any) => (
                                <div key={sale.id} className="p-4 rounded-2xl bg-muted/20 border border-muted/10 flex items-center justify-between hover:bg-muted/30 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center shadow-sm border text-xl">
                                            📄
                                        </div>
                                        <div>
                                            <p className="font-bold">Orden #{sale.id}</p>
                                            <p className="text-xs text-muted-foreground">Comprado el {new Date(sale.created_at).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black text-lg">${sale.total}</p>
                                        <span className={`text-[10px] font-black italic uppercase tracking-widest ${sale.state_sale === 'completado' ? 'text-primary' : 'text-amber-600'}`}>
                                            {sale.state_sale || 'PENDIENTE'}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10 opacity-60">
                                <p className="text-4xl mb-2">🛒</p>
                                <p className="text-sm italic">Aún no has realizado ninguna compra.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Profile Card */}
                <div className="glass-card p-8 bg-gradient-to-br from-primary-600 to-primary-800 text-white relative overflow-hidden shadow-2xl shadow-primary/20">
                    <div className="absolute top-[-20%] right-[-10%] h-64 w-64 bg-white/10 rounded-full blur-3xl opacity-30"></div>

                    <div className="flex justify-between items-start mb-6 relative z-10">
                        <h2 className="text-xl font-black">Mi Perfil Digital</h2>
                        <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl border border-white/20 text-center">
                            <p className="text-[10px] font-bold uppercase tracking-tighter text-primary-100">Puntos Disponibles</p>
                            <p className="text-2xl font-black leading-none mt-1">{stats?.points || 0}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 relative z-10">
                        <div className="h-20 w-20 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 p-1">
                            <img src={`https://i.pravatar.cc/100?u=${profile?.id}`} className="h-full w-full rounded-xl object-cover" alt="avatar" />
                        </div>
                        <div>
                            <p className="text-2xl font-black leading-tight">{profile?.name} {profile?.apellidos}</p>
                            <p className="text-primary-100/70 text-sm font-medium">{profile?.email}</p>
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                        <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                            <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Identificación</p>
                            <p className="font-bold text-lg">{profile?.ci || 'No registrado'}</p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                            <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Contacto</p>
                            <p className="font-bold text-lg">{profile?.telefono || 'No registrado'}</p>
                        </div>
                    </div>

                    <button className="mt-8 w-full py-4 bg-white text-primary font-black rounded-2xl hover:bg-neutral-50 hover:scale-[1.02] active:scale-95 transition-all shadow-lg relative z-10">
                        Actualizar mis Datos
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClienteDashboard;
