import React from 'react';
import { useProducts } from '../../hooks/useProducts';
import { Table, AdminPageHeader } from '../../components/molecules';
import { InventoryStats } from '../../components/organisms';

const AdminInventory: React.FC = () => {
    const { products, loading: productsLoading } = useProducts();

    const skus = products.length;
    const alerts = products.filter(p => (p.lots?.reduce((acc: any, l: any) => acc + l.stock_disponible, 0) || 0) < 10).length;
    const totalUnits = products.reduce((acc, p) => acc + (p.lots?.reduce((lAcc: any, l: any) => lAcc + l.stock_disponible, 0) || 0), 0);

    const columns = [
        {
            header: 'Producto',
            accessor: 'name',
            render: (p: any) => (
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-inner">
                        {p.image_url ? (
                            <img src={p.image_url} alt={p.name} className="h-full w-full object-cover" />
                        ) : (
                            <span className="text-primary-300 font-bold text-xs uppercase">DS</span>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="font-black text-foreground tracking-tight leading-tight">{p.name}</span>
                        <span className="text-[10px] text-primary font-bold uppercase tracking-wider">{p.category?.name || 'General'}</span>
                    </div>
                </div>
            )
        },
        {
            header: 'Lotes Activos',
            accessor: 'lots_count',
            render: (p: any) => (
                <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">{p.lots?.length || 0}</span>
                    <span className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.15em]">Lotes</span>
                </div>
            )
        },
        {
            header: 'Stock Disponible',
            accessor: 'total_stock',
            render: (p: any) => {
                const stock = p.lots?.reduce((acc: number, lot: any) => acc + (lot.stock_disponible || 0), 0) || 0;
                return (
                    <div className="flex flex-col min-w-[120px]">
                        <span className={`text-sm font-black ${stock > 20 ? 'text-success-dark' : stock > 0 ? 'text-warning-dark' : 'text-error-dark'}`}>
                            {stock} <span className="text-[10px] opacity-70">UNIDADES</span>
                        </span>
                        <div className="w-full h-1.5 bg-white/5 rounded-full mt-1.5 overflow-hidden border border-white/5 shadow-inner">
                            <div
                                className={`h-full transition-all duration-1000 ease-out ${stock > 20 ? 'bg-success' : stock > 0 ? 'bg-warning' : 'bg-error'}`}
                                style={{ width: `${Math.min((stock / 100) * 100, 100)}%` }}
                            />
                        </div>
                    </div>
                );
            }
        },
        {
            header: 'Estado de Alerta',
            accessor: 'status',
            render: (p: any) => {
                const stock = p.lots?.reduce((acc: number, lot: any) => acc + (lot.stock_disponible || 0), 0) || 0;
                if (stock === 0) return (
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black bg-error/10 text-error border border-error/20 uppercase tracking-widest animate-pulse">
                        Agotado
                    </span>
                );
                if (stock < 10) return (
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black bg-warning/10 text-warning border border-warning/20 uppercase tracking-widest">
                        Reabastecer
                    </span>
                );
                return (
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black bg-success/10 text-success border border-success/20 uppercase tracking-widest">
                        Óptimo
                    </span>
                );
            }
        }
    ];

    return (
        <div className="min-h-screen mesh-gradient p-6 md:p-12 relative overflow-hidden">
            <div className="blob top-0 right-0 w-[1000px] h-[1000px] opacity-20" />

            <div className="max-w-7xl mx-auto space-y-16 relative z-10">
                <AdminPageHeader
                    title="Master Stock"
                    category="Logística"
                    subtitle="Control centralizado de existencias, lotes y estados críticos de reabastecimiento."
                    action={
                        <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/10 shadow-2xl">
                            <div className="h-2 w-2 rounded-full bg-success animate-ping" />
                            <span className="text-xs font-black text-foreground uppercase tracking-widest">En tiempo real</span>
                        </div>
                    }
                />

                <InventoryStats skus={skus} alerts={alerts} totalUnits={totalUnits} />

                <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-700 delay-300">
                    <div className="flex items-center gap-6">
                        <h2 className="text-4xl font-black text-foreground tracking-tighter">Inventario Detallado</h2>
                        <div className="h-[1px] flex-grow bg-white/10 rounded-full" />
                    </div>
                    <Table columns={columns} data={products} loading={productsLoading} />
                </div>
            </div>
        </div>
    );
};

export default AdminInventory;
