import React from 'react';

interface CardEstadoProps {
    label: string;
    value: string | number;
    icon?: string;
    trend?: string;
    variant?: 'primary' | 'error' | 'success' | 'warning';
    size?: 'sm' | 'md' | 'lg';
}

const CardEstado: React.FC<CardEstadoProps> = ({ label, value, icon, trend, variant = 'primary', size = 'md' }) => {
    const variantStyles = {
        primary: 'group-hover:bg-primary/5 border-white/10 text-primary',
        error: 'group-hover:bg-error/5 border-white/10 text-error',
        success: 'group-hover:bg-success/5 border-white/10 text-success',
        warning: 'group-hover:bg-warning/5 border-white/10 text-warning',
    };

    return (
        <div className={`glass-card p-6 rounded-[2rem] border shadow-xl group hover:scale-[1.02] transition-all duration-500 relative overflow-hidden ${variantStyles[variant]}`}>
            <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start">
                    <p className={`text-[10px] font-black uppercase tracking-widest ${variantStyles[variant].split(' ')[2]}`}>{label}</p>
                    {icon && <div className={`h-10 w-10 flex items-center justify-center rounded-2xl bg-white/5 border border-white/5`}>{icon}</div>}
                </div>
                <div className="mt-4">
                    <p className={`font-black tracking-tighter leading-none ${size === 'lg' ? 'text-7xl' : 'text-5xl'} text-foreground`}>{value}</p>
                    {trend && (
                        <div className={`mt-2 flex items-center gap-2 text-[10px] font-bold bg-white/5 w-fit px-2 py-0.5 rounded-full border border-white/5`}>
                            <span>{trend}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CardEstado;
