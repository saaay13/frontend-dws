import React, { useState } from 'react';
import { useLots } from '../../hooks/useLots';
import { useProducts } from '../../hooks/useProducts';
import { useAuth } from '../../context/AuthContext';
import { Tabla, CabeceraPaginaAdmin, VistaPreviaEntidad } from '../../components/molecules';
import { Badge } from '../../components/atoms';
import { PlantillaAdmin } from '../../components/templates';
import { ModalLote } from '../../components/organisms';

const AdminLots: React.FC = () => {
    const { user } = useAuth();
    const { lots, loading, fetchLots } = useLots();
    const { products } = useProducts();
    const [selectedLot, setSelectedLot] = useState<any>(null);

    const isReadOnly = user?.rol === 'vendedor';

    const columns = [
        {
            header: 'Código / Lote', accessor: 'codigo_lote',
            render: (l: any) => (
                <div className="flex flex-col">
                    <span className="text-xs font-black text-primary uppercase">{l.codigo_lote}</span>
                    <span className="text-[10px] text-muted-foreground font-bold">INGRESO: {l.fecha_ingreso}</span>
                </div>
            )
        },
        {
            header: 'Producto Relacionado', accessor: 'product',
            render: (l: any) => {
                const product = products.find(p => p.id === l.product_id);
                return (
                    <VistaPreviaEntidad
                        name={product?.name || 'Producto Desconocido'}
                        subtext={`ID: ${l.product_id}`}
                        imageUrl={product?.image_url}
                        fallback="P"
                    />
                );
            }
        },
        {
            header: 'Inversión / Venta', accessor: 'precio_compra',
            render: (l: any) => (
                <div className="flex flex-col">
                    <span className="text-[10px] font-black text-error">COMPRA: ${l.precio_compra}</span>
                    <span className="text-sm font-black text-success">VENTA: ${l.precio_venta}</span>
                </div>
            )
        },
        {
            header: 'Stock Actual', accessor: 'stock_disponible',
            render: (l: any) => (
                <div className="flex items-center gap-2">
                    <div className="flex flex-col">
                        <span className="text-lg font-black text-foreground">{l.stock_disponible}</span>
                        <span className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">Unidades</span>
                    </div>
                    {l.stock_disponible < 5 && <Badge variant="error" className="animate-pulse">BAJO</Badge>}
                </div>
            )
        },
        {
            header: 'Visibilidad', accessor: 'state',
            render: (l: any) => (
                <Badge variant={l.state === 'activo' ? 'success' : 'error'}>
                    {l.state === 'activo' ? 'Activo' : 'Inactivo'}
                </Badge>
            )
        },
        {
            header: 'Acciones', accessor: 'actions',
            render: (l: any) => (
                <button
                    onClick={() => setSelectedLot(l)}
                    className="h-9 w-9 flex items-center justify-center bg-primary/5 hover:bg-primary text-primary hover:text-white rounded-xl transition-all border border-primary/10"
                >
                    {isReadOnly ? '👁️' : '✎'}
                </button>
            )
        },
        {
            header: 'Fecha Compra', accessor: 'fecha_compra',
            render: (l: any) => (
                <span className="text-xs font-bold text-foreground">
                    {l.fecha_compra}
                </span>
            )
        }
    ];

    return (
        <PlantillaAdmin
            cabecera={
                <CabeceraPaginaAdmin
                    title="Control de Lotes"
                    category="Inventario"
                    subtitle="Gestión granular de entradas, precios y fechas de caducidad por cada lote específico."
                />
            }
            contenido={
                <div className="animate-in fade-in slide-in-from-bottom duration-700">
                    <Tabla columns={columns} data={lots} loading={loading} />

                    {selectedLot && (
                        <ModalLote
                            product={products.find(p => p.id === selectedLot.product_id) || { name: 'Cargando...', id: selectedLot.product_id }}
                            lotToEdit={selectedLot}
                            onClose={() => setSelectedLot(null)}
                            onStockUpdate={fetchLots}
                        />
                    )}
                </div>
            }
        />
    );
};

export default AdminLots;
