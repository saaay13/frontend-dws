import React from 'react';
import { useSales } from '../../hooks/useSales';
import { Tabla, CabeceraPaginaAdmin } from '../../components/molecules';
import { Badge, Button } from '../../components/atoms';
import { PlantillaAdmin } from '../../components/templates';
import ModalEstadoVenta from '../../components/organisms/ModalEstadoVenta/ModalEstadoVenta';

const AdminSales: React.FC = () => {
    const { sales, loading, updateSale } = useSales();
    const [selectedSale, setSelectedSale] = React.useState<any>(null);

    const totalSales = sales.reduce((acc, s) => acc + Number(s.total || 0), 0);
    const deliveredSales = sales.filter(s => s.state_sale === 'entregado').length;
    const pendingSales = sales.filter(s => s.state_sale === 'pendiente').length;

    const columns = [
        {
            header: 'Venta / Cliente',
            accessor: 'client',
            render: (s: any) => (
                <div className="flex items-center gap-4 group/sale">
                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center font-black text-xs transition-all duration-500 glass-card border-none shadow-inner ${s.state_sale === 'entregado' ? 'bg-success/20 text-success' : 'bg-primary/20 text-primary'}`}>
                        #V
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest mb-0.5">V-{s.id}</span>
                        <span className="text-sm font-black text-foreground group-hover/sale:text-primary transition-colors">
                            {s.client?.user?.name || 'Venta Local'}
                        </span>
                        <span className="text-[9px] text-muted-foreground font-bold italic">
                            {s.client?.address || 'Tienda física'}
                        </span>
                    </div>
                </div>
            )
        },
        {
            header: 'Productos / Detalles',
            accessor: 'detalles',
            render: (s: any) => (
                <div className="flex flex-wrap gap-1.5 max-w-[300px]">
                    {s.detalles?.map((d: any, idx: number) => (
                        <div key={idx} className="flex items-center bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-xl border border-white/5 transition-all cursor-default">
                            <span className="text-[9px] font-black text-primary-300 truncate max-w-[120px]">{d.product?.name || 'Producto'}</span>
                            <span className="mx-1 opacity-30 text-[8px]">|</span>
                            <span className="text-[9px] font-black text-foreground">x{d.cantidad}</span>
                        </div>
                    ))}
                    {!s.detalles?.length && <span className="text-[10px] text-muted-foreground italic font-medium">Sin detalles de productos</span>}
                </div>
            )
        },
        {
            header: 'Pago / Total',
            accessor: 'total',
            render: (s: any) => (
                <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{s.metodo_pago}</span>
                        <Badge variant={s.state_payment === 'pagado' ? 'success' : s.state_payment === 'cancelado' ? 'error' : 'warning'} size="sm" className="h-4 px-1.5">
                            {s.state_payment}
                        </Badge>
                    </div>
                    <span className="text-xl font-black font-mono text-primary drop-shadow-sm">${Number(s.total).toFixed(2)}</span>
                </div>
            )
        },
        {
            header: 'Logística',
            accessor: 'state_sale',
            render: (s: any) => (
                <div className="space-y-2">
                    <Badge variant={s.state_sale === 'entregado' ? 'success' : s.state_sale === 'cancelado' ? 'error' : 'warning'} className="w-full justify-center py-1 font-black">
                        {s.state_sale.toUpperCase()}
                    </Badge>
                    <div className="flex flex-col items-center">
                        <span className="text-[9px] font-bold text-muted-foreground uppercase opacity-50">Fecha</span>
                        <span className="text-[10px] font-black text-foreground bg-primary/5 px-2 py-0.5 rounded-full">{s.fecha}</span>
                    </div>
                </div>
            )
        },
        {
            header: 'Visibilidad',
            accessor: 'state',
            render: (s: any) => (
                <div className="flex flex-col items-center gap-2">
                    <div className={`h-2 w-2 rounded-full animate-pulse ${s.state === 'activo' ? 'bg-success shadow-lg shadow-success/50' : 'bg-error shadow-lg shadow-error/50'}`} />
                    <span className={`text-[8px] font-black uppercase tracking-widest ${s.state === 'activo' ? 'text-success' : 'text-error'}`}>
                        {s.state === 'activo' ? 'Activa' : 'Oculta'}
                    </span>
                </div>
            )
        },
        {
            header: '',
            accessor: 'actions',
            render: (s: any) => (
                <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-2xl font-black text-[9px] h-10 px-4 hover:scale-110 active:scale-95 transition-all bg-white shadow-xl shadow-primary/5 border-primary/10 hover:border-primary text-primary"
                    onClick={() => setSelectedSale(s)}
                >
                    GESTIONAR
                </Button>
            )
        }
    ];

    return (
        <PlantillaAdmin
            cabecera={
                <CabeceraPaginaAdmin
                    title="Historial de Ventas"
                    category="Reportes"
                    subtitle="Registro detallado de transacciones, métodos de pago y estados de entrega."
                />
            }
            contenido={
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom duration-1000 relative">
                    {/* Blobs decorativos */}
                    <div className="absolute -top-20 -left-20 h-64 w-64 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />
                    <div className="absolute top-40 -right-20 h-64 w-64 bg-secondary/10 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />

                    {/* Tarjetas de Resumen */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="glass-card p-8 rounded-[2.5rem] border border-white/20 shadow-2xl relative overflow-hidden group">
                            <div className="absolute -right-4 -top-4 text-8xl opacity-5 group-hover:scale-125 transition-transform duration-700">💰</div>
                            <span className="text-[10px] font-black text-primary-300 uppercase tracking-widest block mb-2">Ingresos Totales</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-black font-mono text-foreground">${totalSales.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                <Badge variant="success" size="sm" className="bg-success/20 text-success border-none">+12%</Badge>
                            </div>
                        </div>

                        <div className="glass-card p-8 rounded-[2.5rem] border border-white/20 shadow-2xl relative overflow-hidden group">
                            <div className="absolute -right-4 -top-4 text-8xl opacity-5 group-hover:scale-125 transition-transform duration-700">📦</div>
                            <span className="text-[10px] font-black text-success uppercase tracking-widest block mb-2">Entregas Completadas</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-black text-foreground">{deliveredSales}</span>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Paquetes</span>
                            </div>
                        </div>

                        <div className="glass-card p-8 rounded-[2.5rem] border border-white/20 shadow-2xl relative overflow-hidden group">
                            <div className="absolute -right-4 -top-4 text-8xl opacity-5 group-hover:scale-125 transition-transform duration-700">⏳</div>
                            <span className="text-[10px] font-black text-warning uppercase tracking-widest block mb-2">Pedidos en Espera</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-black text-foreground">{pendingSales}</span>
                                <Badge variant="warning" size="sm" className="bg-warning/20 text-warning border-none">PRIORIDAD</Badge>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card rounded-[2.5rem] p-2 border border-white/10 shadow-2xl overflow-hidden">
                        <Tabla columns={columns} data={sales} loading={loading} />
                    </div>
                    
                    {selectedSale && (
                        <ModalEstadoVenta
                            sale={selectedSale}
                            isSubmitting={loading}
                            onClose={() => setSelectedSale(null)}
                            onSave={async (id, data) => {
                                await updateSale(id, data);
                                setSelectedSale(null);
                            }}
                        />
                    )}
                </div>
            }
        />
    );
};

export default AdminSales;
