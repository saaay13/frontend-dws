import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../../hooks/useDashboard';
import { Button } from '../../components/atoms';

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
                        <span>📦</span> Mis Últimas Compras
                    </h2>
                    <div className="space-y-4">
                        {stats?.order_history?.length > 0 ? (
                            stats.order_history.map((sale: any) => (
                                <div key={sale.id} className="p-4 rounded-2xl bg-white border border-neutral-100 flex items-center justify-between hover:border-primary/30 transition-all shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-xl bg-neutral-50 flex items-center justify-center border border-neutral-100 text-xl">
                                            📄
                                        </div>
                                        <div>
                                            <p className="font-bold text-neutral-900">Orden #{sale.id}</p>
                                            <p className="text-xs text-neutral-500 font-medium">Comprado el {new Date(sale.created_at).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black text-lg text-neutral-900">${parseFloat(sale.total).toFixed(2)}</p>
                                        <span className={`text-[10px] font-black italic uppercase tracking-widest ${sale.state_sale === 'completado' || sale.state_sale === 'entregado' ? 'text-primary' : 'text-amber-600'}`}>
                                            {sale.state_sale || 'PENDIENTE'}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10 opacity-60">
                                <p className="text-4xl mb-2">🛒</p>
                                <p className="text-sm italic">Aún no has realizado ninguna compra.</p>
                                <Button variant="outline" size="sm" className="mt-4" onClick={() => navigate('/store')}>
                                    Ir a la tienda
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Profile Card */}
                <div className="relative p-8 bg-gradient-to-br from-primary-600 to-primary-800 text-white rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 flex flex-col justify-between">
                    <div className="absolute top-0 right-0 h-full w-1/2 bg-primary/20 blur-3xl rounded-full translate-x-1/2 -z-0"></div>
                    
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-8">
                            <h2 className="text-xl font-black text-white">Perfil del Cliente</h2>
                            <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/20">
                                <p className="text-[10px] font-bold uppercase tracking-tighter text-white/60">Puntos DWS</p>
                                <p className="text-2xl font-black leading-none mt-1 text-white">{stats?.points || 0}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 mb-10">
                            <div className="h-20 w-20 rounded-2xl bg-white/10 border border-white/20 p-1 shrink-0">
                                <img src={`https://i.pravatar.cc/100?u=${profile?.id}`} className="h-full w-full rounded-xl object-cover" alt="avatar" />
                            </div>
                            <div>
                                <p className="text-2xl font-black leading-tight text-white">{profile?.name} {profile?.apellidos}</p>
                                <p className="text-white/60 text-sm font-medium">{profile?.email}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">CI / Identificación</p>
                                <p className="font-bold text-lg text-white">{profile?.ci || 'No registrado'}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Teléfono / WhatsApp</p>
                                <p className="font-bold text-lg text-white">{profile?.telefono || 'No registrado'}</p>
                            </div>
                        </div>
                    </div>

                    <button className="mt-8 w-full py-4 bg-primary text-white font-black rounded-2xl hover:bg-primary/90 hover:scale-[1.02] active:scale-95 transition-all shadow-lg relative z-10">
                        Actualizar Perfil
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClienteDashboard;
