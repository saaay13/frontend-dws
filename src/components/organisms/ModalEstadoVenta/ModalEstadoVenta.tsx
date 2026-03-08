import React, { useState } from 'react';
import { Button } from '../../atoms';

interface ModalEstadoVentaProps {
    sale: any;
    onClose: () => void;
    onSave: (id: number | string, data: any) => Promise<void>;
    isSubmitting: boolean;
}

const ModalEstadoVenta: React.FC<ModalEstadoVentaProps> = ({ sale, onClose, onSave, isSubmitting }) => {
    const [stateSale, setStateSale] = useState(sale.state_sale);
    const [statePayment, setStatePayment] = useState(sale.state_payment);
    const [state, setState] = useState(sale.state);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updateData = {
            ...sale,
            state_sale: stateSale,
            state_payment: statePayment,
            state: state
        };
        await onSave(sale.id, updateData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl animate-in fade-in duration-300">
            <div className="glass-card w-full max-w-2xl p-8 rounded-[2.5rem] border border-white/20 shadow-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 h-10 w-10 flex items-center justify-center rounded-full hover:bg-error/10 text-muted-foreground hover:text-error transition-all"
                >
                    ✕
                </button>

                <div className="mb-8 space-y-1">
                    <h2 className="text-3xl font-black text-foreground tracking-tighter">Gestionar <span className="text-primary-400">Venta</span></h2>
                    <p className="text-muted-foreground font-medium">Actualiza el progreso y visibilidad de la Orden #V-{sale.id}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in zoom-in duration-300">
                    <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Estado de la Venta */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-primary-300 uppercase tracking-widest pl-1">Estado de Logística</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['pendiente', 'enviado', 'entregado', 'cancelado'].map((status) => (
                                        <button
                                            key={status}
                                            type="button"
                                            onClick={() => setStateSale(status)}
                                            className={`h-11 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${stateSale === status
                                                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-[1.02]'
                                                    : 'bg-white/50 text-muted-foreground border-neutral-200 hover:border-primary/50'
                                                }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Estado del Pago */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-success uppercase tracking-widest pl-1">Estado del Pago</label>
                                <div className="grid grid-cols-1 gap-2">
                                    {['pendiente', 'pagado', 'cancelado'].map((status) => (
                                        <button
                                            key={status}
                                            type="button"
                                            onClick={() => setStatePayment(status)}
                                            className={`h-10 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all flex items-center justify-between px-4 ${statePayment === status
                                                    ? 'bg-success text-white border-success shadow-lg shadow-success/20 scale-[1.02]'
                                                    : 'bg-white/50 text-muted-foreground border-neutral-200 hover:border-success/50'
                                                }`}
                                        >
                                            {status}
                                            {statePayment === status && <span className="text-[10px]">✓</span>}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Estado del Registro */}
                        <div className="space-y-2 pt-4 border-t border-primary/10">
                            <label className="text-xs font-black text-primary-300 uppercase tracking-widest pl-1">Visibilidad del Registro</label>
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { id: 'activo', label: 'Habilitado', color: 'primary' },
                                    { id: 'inactivo', label: 'Oculto', color: 'warning' },
                                    { id: 'eliminado', label: 'Eliminar', color: 'error' }
                                ].map((s) => (
                                    <button
                                        key={s.id}
                                        type="button"
                                        onClick={() => {
                                            if (s.id === 'eliminado') {
                                                if (confirm('¿ESTÁS SEGURO?\nEsta acción marcará la venta como eliminada.')) {
                                                    setState(s.id);
                                                }
                                            } else {
                                                setState(s.id);
                                            }
                                        }}
                                        className={`h-10 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${state === s.id
                                                ? `bg-${s.color} text-white border-${s.color} shadow-lg scale-[1.02]`
                                                : 'bg-white/50 text-muted-foreground border-neutral-200 hover:border-neutral-300'
                                            }`}
                                    >
                                        {s.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Button
                            type="submit"
                            className="flex-grow h-12 font-black text-lg shadow-xl shadow-primary/20"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'GUARDANDO...' : 'ACTUALIZAR VENTA'}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="h-12 px-8 font-bold border-neutral-200 hover:bg-neutral-50"
                        >
                            Cancelar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalEstadoVenta;
