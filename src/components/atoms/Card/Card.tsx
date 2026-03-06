import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', title, subtitle, ...props }) => {
    return (
        <div className={`glass-card p-6 rounded-xl ${className}`} {...props}>
            {(title || subtitle) && (
                <div className="mb-4 pointer-events-none">
                    {title && <h3 className="text-xl font-bold text-foreground leading-tight">{title}</h3>}
                    {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
                </div>
            )}
            <div className="relative pointer-events-none">
                {children}
            </div>
        </div>
    );
};

export default Card;
