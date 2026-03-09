import React from 'react';
import { CardEstado } from '../../molecules';
import FlujoActividad from '../FlujoActividad/FlujoActividad';

interface BentoDashboardProps {
    stats: any;
}

const BentoDashboard: React.FC<BentoDashboardProps> = ({ stats }) => {
    const activities = stats?.recent_activity?.map((sale: any) => ({
        id: sale.id,
        title: `Orden #${sale.id}`,
        subtitle: sale.seller?.user?.name || 'Sistema',
        amount: sale.total,
        initial: sale.client?.user?.name?.[0] || 'C'
    })) || [];

    return (
        <div className="grid grid-cols-12 gap-6 pb-12">
            <div className="col-span-12 lg:col-span-8">
                <CardEstado
                    label="Ingresos de Hoy"
                    value={`Bs ${stats?.revenue_today?.toLocaleString() || '0.00'}`}
                    trend={`Total acumulado: Bs ${stats?.total_sales?.toLocaleString() || '0'}`}
                    size="lg"
                    variant="primary"
                />
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <CardEstado
                    label="Ventas Hoy"
                    value={stats?.sales_today || 0}
                    icon="🛒"
                    variant="success"
                    trend="Órdenes procesadas"
                />
            </div>

            {/* Stock critico */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <CardEstado
                    label="Alerta Stock"
                    value={stats?.low_stock || 0}
                    icon="⚠️"
                    variant="error"
                    trend="Productos por reponer"
                />
            </div>

            {/* Clientes */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <CardEstado
                    label="Base de Clientes"
                    value={stats?.total_clients || 0}
                    icon="👥"
                    variant="primary"
                    trend="Clientes registrados"
                />
            </div>

            {/* Vendedores */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <CardEstado
                    label="Equipo de Ventas"
                    value={stats?.total_sellers || 0}
                    icon="👔"
                    variant="primary"
                    trend="Vendedores activos"
                />
            </div>

            {/* Actividad */}
            <div className="col-span-12 lg:col-span-7">
                <div className="bg-white p-6 rounded-[2rem] border border-neutral-100 shadow-sm h-full flex flex-col">
                    <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        Ventas en Tiempo Real
                    </h3>
                    <FlujoActividad activities={activities} />
                </div>
            </div>

            {/* Banner */}
            <div className="col-span-12 lg:col-span-5">
                <div className="h-full w-full rounded-[2rem] overflow-hidden border border-neutral-100 shadow-sm group">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu34StWQz-dRL7tXgNtWgPvpcYhQdetbDynA&s"
                        alt="Estrategia DWS"
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                </div>
            </div>
        </div>
    );
};

export default BentoDashboard;
