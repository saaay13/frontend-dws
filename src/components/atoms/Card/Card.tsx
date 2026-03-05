import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    subtitle?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', title, subtitle }) => {
    return (
        <div className={`glass-card p-6 rounded-xl ${className}`}>
            {(title || subtitle) && (
                <div className="mb-4">
                    {title && <h3 className="text-xl font-bold text-foreground leading-tight">{title}</h3>}
                    {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
                </div>
            )}
            <div className="relative">
                {children}
            </div>
        </div>
    );
};

export default Card;
