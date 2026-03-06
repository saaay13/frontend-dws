import React from 'react';
import { StatCard } from '../../molecules';

interface InventoryStatsProps {
    skus: number;
    alerts: number;
    totalUnits: number;
}

const InventoryStats: React.FC<InventoryStatsProps> = ({ skus, alerts, totalUnits }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
                label="Referencias (SKUs)"
                value={skus}
                variant="primary"
                trend="↑ Activos"
            />
            <StatCard
                label="Alertas Stock"
                value={alerts}
                variant="error"
                trend="⚠ Crítico"
            />
            <StatCard
                label="Stock Total"
                value={totalUnits}
                variant="success"
                trend="✓ Unidades"
            />
        </div>
    );
};

export default InventoryStats;
