import React from 'react';

interface ProgresoStockProps {
    current: number;
    max?: number;
    showLabel?: boolean;
}

const ProgresoStock: React.FC<ProgresoStockProps> = ({ current, max = 100, showLabel = true }) => {
    const percentage = Math.min((current / max) * 100, 100);

    const colors = current > 20 ? 'bg-success' : current > 0 ? 'bg-warning' : 'bg-error';
    const textColors = current > 20 ? 'text-success-dark' : current > 0 ? 'text-warning-dark' : 'text-error-dark';

    return (
        <div className="flex flex-col min-w-[100px]">
            {showLabel && (
                <span className={`text-sm font-black ${textColors}`}>
                    {current} <span className="text-[10px] opacity-70">UDS</span>
                </span>
            )}
            <div className="w-full h-1.5 bg-white/5 rounded-full mt-1.5 overflow-hidden border border-white/5 shadow-inner">
                <div
                    className={`h-full transition-all duration-1000 ease-out ${colors}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};

export default ProgresoStock;
