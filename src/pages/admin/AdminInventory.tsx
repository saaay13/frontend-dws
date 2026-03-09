import React from 'react';
import { useProducts } from '../../hooks/useProducts';
import { Tabla, CabeceraPaginaAdmin, VistaPreviaEntidad, ProgresoStock } from '../../components/molecules';
import { Badge } from '../../components/atoms';
import { EstadisticasInventario } from '../../components/organisms';
import { PlantillaAdmin } from '../../components/templates';

const AdminInventory: React.FC = () => {
    const { products, loading: productsLoading } = useProducts();

    const skus = products.length;
    const alerts = products.filter(p => (p.lots?.reduce((acc: any, l: any) => acc + l.stock_disponible, 0) || 0) < 10).length;
    const totalUnits = products.reduce((acc, p) => acc + (p.lots?.reduce((lAcc: any, l: any) => lAcc + l.stock_disponible, 0) || 0), 0);

    const columns = [
        {
            header: 'Producto', accessor: 'name',
            render: (p: any) => (
                <VistaPreviaEntidad
                    name={p.name}
                    subtext={p.category?.name || 'General'}
                    imageUrl={p.image_url}
                    fallback="DS"
                />
            )
        },
        {
            header: 'Lotes Activos', accessor: 'lots_count',
            render: (p: any) => (
                <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">{p.lots?.length || 0}</span>
                    <span className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.15em]">Lotes</span>
                </div>
            )
        },
        {
            header: 'Stock Disponible', accessor: 'total_stock',
            render: (p: any) => {
                const stock = p.lots?.reduce((acc: number, lot: any) => acc + (lot.stock_disponible || 0), 0) || 0;
                return <ProgresoStock current={stock} />;
            }
        },
        {
            header: 'Estado de Alerta', accessor: 'status',
            render: (p: any) => {
                const stock = p.lots?.reduce((acc: number, lot: any) => acc + (lot.stock_disponible || 0), 0) || 0;
                if (stock === 0) return <Badge variant="error" className="animate-pulse">Agotado</Badge>;
                if (stock < 10) return <Badge variant="warning">Reabastecer</Badge>;
                return <Badge variant="success">Óptimo</Badge>;
            }
        }
    ];

    return (
        <PlantillaAdmin
            cabecera={
                <CabeceraPaginaAdmin
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
            }
            contenido={
                <div className="space-y-16">
                    <EstadisticasInventario skus={skus} alerts={alerts} totalUnits={totalUnits} />
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-700 delay-300">
                        <div className="flex items-center gap-6">
                            <h2 className="text-4xl font-black text-foreground tracking-tighter">Inventario Detallado</h2>
                            <div className="h-[1px] flex-grow bg-white/10 rounded-full" />
                        </div>
                        <Tabla columns={columns} data={products} loading={productsLoading} />
                    </div>
                </div>
            }
        />
    );
};

export default AdminInventory;
