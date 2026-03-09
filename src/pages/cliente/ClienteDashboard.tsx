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
                    onClick={() => navigate('/store')}
                    className="px-6 py-3 rounded-xl bg-primary text-white font-black text-md shadow-xl shadow-primary/20 hover:scale-[1.05] active:scale-95 transition-all"
                >
                    Explorar Tienda
                </button>
            </header>

            <div className="max-w-4xl mx-auto">
                {/* Historial */}
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
                                            <p className="font-bold text-neutral-900">Tu Orden</p>
                                            <p className="text-xs text-neutral-500 font-medium">Comprado el {new Date(sale.created_at).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black text-lg text-neutral-900">Bs {parseFloat(sale.total).toFixed(2)}</p>
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
            </div>
        </div>
    );
};

export default ClienteDashboard;
