import React from 'react';
import { StatCard, ActionTile } from '../../molecules';
import ActivityFeed from '../ActivityFeed/ActivityFeed';

interface DashboardBentoProps {
    stats: any;
}

const DashboardBento: React.FC<DashboardBentoProps> = ({ stats }) => {
    const activities = stats?.recent_activity?.map((sale: any) => ({
        id: sale.id,
        title: `Orden #${sale.id}`,
        subtitle: sale.seller?.user?.name || 'Sistema',
        amount: sale.total,
        initial: sale.client?.user?.name?.[0] || 'C'
    })) || [];

    return (
        <div className="grid grid-cols-12 gap-6 pb-12">
            {/* Bento: High Impact Revenue */}
            <div className="col-span-12 lg:col-span-8 row-span-2">
                <StatCard
                    label="Ingresos Consolidados"
                    value={`$${stats?.total_sales?.toLocaleString()}`}
                    trend="↑ 12% vs ayer"
                    size="lg"
                />
            </div>

            {/* Bento: Stock Critical */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <StatCard
                    label="Alerta Stock"
                    value={stats?.low_stock || 0}
                    icon="⚠️"
                    variant="error"
                    trend="Productos por reponer"
                />
            </div>

            {/* Bento: Users Mini */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <StatCard
                    label="Actividad"
                    value={stats?.active_users || 0}
                    icon="👥"
                    variant="primary"
                    trend="Usuarios hoy"
                />
            </div>

            {/* Bento: Recent Transitions */}
            <div className="col-span-12 lg:col-span-7">
                <ActivityFeed activities={activities} onViewAll={() => console.log('Ver todo')} />
            </div>

            {/* Bento: Power Actions */}
            <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-4">
                <ActionTile title="Reportes" icon="⚡" />
                <ActionTile title="Gestión" icon="📦" variant="highlight" />
                <ActionTile title="Auditoría" icon="🛡️" />
                <ActionTile title="Ajustes" icon="⚙️" />
            </div>
        </div>
    );
};

export default DashboardBento;
