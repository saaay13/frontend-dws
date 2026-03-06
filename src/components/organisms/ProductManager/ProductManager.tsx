import React, { useState } from 'react';
import { useProducts } from '../../../hooks/useProducts';
import { Table } from '../../molecules';
import LotModal from '../LotModal/LotModal';

const ProductManager: React.FC = () => {
    const { products, loading, deleteProduct, fetchProducts } = useProducts();
    const [showLotModal, setShowLotModal] = useState<any>(null);

    const columns = [
        {
            header: 'Info',
            accessor: 'id',
            render: (p: any) => (
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-inner">
                        {p.image_url ? (
                            <img src={p.image_url} alt={p.name} className="h-full w-full object-cover" />
                        ) : (
                            <span className="text-primary-300 font-bold text-xs">DS</span>
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
                return (
                    <div className="flex flex-col">
                        <span className={`text-sm font-black ${stock > 0 ? 'text-success-dark' : 'text-error-dark'}`}>
                            {stock} <span className="text-[10px] opacity-70">UDS</span>
                        </span>
                        <div className="w-16 h-1 bg-white/5 rounded-full mt-1 overflow-hidden">
                            <div
                                className={`h-full ${stock > 10 ? 'bg-success' : stock > 0 ? 'bg-warning' : 'bg-error'}`}
                                style={{ width: `${Math.min(stock, 100)}%` }}
                            />
                        </div>
                    </div>
                );
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
                    <button
                        onClick={() => deleteProduct(p.id)}
                        className="h-9 w-9 flex items-center justify-center bg-error/5 hover:bg-error text-error hover:text-white rounded-xl transition-all border border-error/10"
                    >
                        ✕
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <Table columns={columns} data={products} loading={loading} />

            {showLotModal && (
                <LotModal
                    product={showLotModal}
                    onClose={() => setShowLotModal(null)}
                    onStockUpdate={fetchProducts}
                />
            )}
        </div>
    );
};

export default ProductManager;
