import React from 'react';
import { CardEstado } from '../../molecules';

interface EstadisticasInventarioProps {
    skus: number;
    alerts: number;
    totalUnits: number;
}

const EstadisticasInventario: React.FC<EstadisticasInventarioProps> = ({ skus, alerts, totalUnits }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CardEstado
                label="Referencias (SKUs)"
                value={skus}
                variant="primary"
                trend="↑ Activos"
            />
            <CardEstado
                label="Alertas Stock"
                value={alerts}
                variant="error"
                trend="⚠ Crítico"
            />
            <CardEstado
                label="Stock Total"
                value={totalUnits}
                variant="success"
                trend="✓ Unidades"
            />
        </div>
    );
};

export default EstadisticasInventario;
