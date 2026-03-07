import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'success' | 'warning' | 'error' | 'info';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'info',
    size = 'md',
    className = ''
}) => {
    const variants = {
        success: 'bg-success/10 text-success border-success/20',
        warning: 'bg-warning/10 text-warning border-warning/20',
        error: 'bg-error/10 text-error border-error/20',
        info: 'bg-primary/10 text-primary border-primary/20'
    };

    const sizes = {
        sm: 'px-2 py-0.5 text-[8px]',
        md: 'px-4 py-1.5 text-[10px]',
        lg: 'px-6 py-2 text-xs'
    };

    return (
        <span className={`inline-flex items-center rounded-full font-black border uppercase tracking-widest ${variants[variant]} ${sizes[size]} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;
