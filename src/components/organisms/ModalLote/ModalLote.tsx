import React, { useState } from 'react';
import { useLots } from '../../../hooks/useLots';
import { Tabla } from '../../molecules';
import { Button, Input, Badge } from '../../atoms';

interface ModalLoteProps {
    product: any;
    onClose: () => void;
    onStockUpdate: () => void;
}

const ModalLote: React.FC<ModalLoteProps> = ({ product, onClose, onStockUpdate }) => {
    const { lots, loading, addLot, deleteLot } = useLots(product.id);
    const [formData, setFormData] = useState({
        codigo_lote: '',
        proveedor: '',
        precio_compra: '',
        precio_venta: '',
        stock_disponible: '',
        fecha_ingreso: new Date().toISOString().split('T')[0],
        fecha_compra: new Date().toISOString().split('T')[0]
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addLot(formData);
            setFormData({
                codigo_lote: '',
                proveedor: '',
                precio_compra: '',
                precio_venta: '',
                stock_disponible: '',
                fecha_ingreso: new Date().toISOString().split('T')[0],
                fecha_compra: new Date().toISOString().split('T')[0]
            });
            onStockUpdate();
        } catch (err) {
            console.error(err);
        }
    };

    const columns = [
        { header: 'Código', accessor: 'codigo_lote' },
        {
            header: 'Stock',
            accessor: 'stock_disponible',
            render: (l: any) => (
                <Badge variant={l.stock_disponible > 10 ? 'success' : 'warning'}>
                    {l.stock_disponible}
                </Badge>
            )
        },
        { header: 'P. Venta', accessor: 'precio_venta', render: (l: any) => `$${l.precio_venta}` },
        {
            header: 'Acciones',
            accessor: 'actions',
            render: (lot: any) => (
                <button
                    onClick={() => { deleteLot(lot.id); onStockUpdate(); }}
                    className="text-error-dark hover:underline text-xs"
                >
                    Eliminar
                </button>
            )
        }
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="glass-card w-full max-w-4xl p-8 rounded-3xl border border-border shadow-2xl space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-primary-300">Gestionar Lotes</h2>
                        <p className="text-muted-foreground">Producto: <span className="text-foreground font-semibold">{product.name}</span></p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-muted-foreground">
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-primary/5 p-6 rounded-2xl border border-primary/10">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-primary-400 uppercase">Código Lote</label>
                        <Input
                            value={formData.codigo_lote}
                            onChange={(e: any) => setFormData({ ...formData, codigo_lote: e.target.value })}
                            placeholder="LOT-001"
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-primary-400 uppercase">Stock Inicial</label>
                        <Input
                            type="number"
                            value={formData.stock_disponible}
                            onChange={(e: any) => setFormData({ ...formData, stock_disponible: e.target.value })}
                            placeholder="100"
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-primary-400 uppercase">Precio Compra</label>
                        <Input
                            type="number"
                            value={formData.precio_compra}
                            onChange={(e: any) => setFormData({ ...formData, precio_compra: e.target.value })}
                            placeholder="10.00"
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-primary-400 uppercase">Precio Venta</label>
                        <Input
                            type="number"
                            value={formData.precio_venta}
                            onChange={(e: any) => setFormData({ ...formData, precio_venta: e.target.value })}
                            placeholder="15.00"
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-primary-400 uppercase">Proveedor</label>
                        <Input
                            value={formData.proveedor}
                            onChange={(e: any) => setFormData({ ...formData, proveedor: e.target.value })}
                            placeholder="Nombre Proveedor"
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-primary-400 uppercase">Fecha Ingreso</label>
                        <Input
                            type="date"
                            value={formData.fecha_ingreso}
                            onChange={(e: any) => setFormData({ ...formData, fecha_ingreso: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-primary-400 uppercase">Fecha Compra</label>
                        <Input
                            type="date"
                            value={formData.fecha_compra}
                            onChange={(e: any) => setFormData({ ...formData, fecha_compra: e.target.value })}
                            required
                        />
                    </div>
                    <div className="flex items-end lg:col-span-3">
                        <Button type="submit" className="w-full h-12 font-black text-lg">Agregar Lote</Button>
                    </div>
                </form>

                <div className="space-y-4">
                    <h3 className="font-bold text-foreground">Lotes Existentes</h3>
                    <div className="max-h-60 overflow-y-auto premium-scroll">
                        <Tabla columns={columns} data={lots} loading={loading} emptyMessage="No hay lotes registrados para este producto." />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalLote;
