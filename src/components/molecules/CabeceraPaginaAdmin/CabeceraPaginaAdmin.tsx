import React from 'react';

interface CabeceraPaginaAdminProps {
    title: string;
    subtitle?: string;
    category?: string;
    action?: React.ReactNode;
}

const CabeceraPaginaAdmin: React.FC<CabeceraPaginaAdminProps> = ({ title, subtitle, category, action }) => {
    return (
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div className="space-y-2">
                {category && (
                    <div className="flex items-center gap-3">
                        <div className="h-2 w-12 bg-primary rounded-full shadow-[0_0_15px_rgba(255,107,0,0.4)]" />
                        <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">{category}</span>
                    </div>
                )}
                <h1 className="text-5xl font-black text-foreground tracking-tighter">
                    {title.split(' ').map((word, i) => (
                        <span key={i} className={i === 1 ? 'text-primary-400' : ''}>
                            {word}{' '}
                        </span>
                    ))}
                </h1>
                {subtitle && <p className="text-muted-foreground font-medium max-w-xl">{subtitle}</p>}
            </div>
            {action && <div className="flex gap-4">{action}</div>}
        </header>
    );
};

export default CabeceraPaginaAdmin;
