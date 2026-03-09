import React, { useState } from 'react';
import { Tabla, VistaPreviaEntidad, ProgresoStock } from '../../molecules';
import { useAuth } from '../../../context/AuthContext';
import ModalLote from '../ModalLote/ModalLote';

interface GestorProductoProps {
    products: any[];
    loading: boolean;
    onEditProduct: (product: any) => void;
    onDeleteProduct: (id: number | string) => void;
    onRefresh: () => void;
}

const GestorProducto: React.FC<GestorProductoProps> = ({
    products,
    loading,
    onEditProduct,
    onDeleteProduct,
    onRefresh
}) => {
    const { user } = useAuth();
    const [showLotModal, setShowLotModal] = useState<any>(null);

    const columns = [
        {
            header: 'Info',
            accessor: 'id',
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
            header: 'Descripción',
            accessor: 'description',
            render: (p: any) => (
                <span className="text-xs text-muted-foreground line-clamp-1 max-w-[200px] font-medium italic">
                    {p.description || 'Sin descripción...'}
                </span>
            )
        },
        {
            header: 'Inventario',
            accessor: 'total_stock',
            render: (p: any) => {
                const stock = p.lots?.reduce((acc: number, lot: any) => acc + (lot.stock_disponible || 0), 0) || 0;
                return <ProgresoStock current={stock} />;
            }
        },
        {
            header: 'Acciones',
            accessor: 'actions',
            render: (p: any) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowLotModal(p)}
                        className="px-4 py-2 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-xl transition-all text-[10px] font-black uppercase tracking-widest border border-primary/20"
                    >
                        Lotes
                    </button>
                    {user?.rol === 'administrador' && (
                        <>
                            <button
                                onClick={() => onEditProduct(p)}
                                className="h-9 w-9 flex items-center justify-center bg-primary/5 hover:bg-primary text-primary hover:text-white rounded-xl transition-all border border-primary/10"
                            >
                                ✎
                            </button>
                            <button
                                onClick={() => onDeleteProduct(p.id)}
                                className="h-9 w-9 flex items-center justify-center bg-error/5 hover:bg-error text-error hover:text-white rounded-xl transition-all border border-error/10"
                            >
                                ✕
                            </button>
                        </>
                    )}
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <Tabla columns={columns} data={products} loading={loading} />

            {showLotModal && (
                <ModalLote
                    product={showLotModal}
                    onClose={() => setShowLotModal(null)}
                    onStockUpdate={onRefresh}
                />
            )}
        </div>
    );
};

export default GestorProducto;
