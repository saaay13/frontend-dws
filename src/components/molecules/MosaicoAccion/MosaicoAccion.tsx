import React from 'react';

interface MosaicoAccionProps {
    title: string;
    icon: string;
    onClick?: () => void;
    variant?: 'default' | 'highlight';
}

const MosaicoAccion: React.FC<MosaicoAccionProps> = ({ title, icon, onClick, variant = 'default' }) => {
    return (
        <button
            onClick={onClick}
            className={`glass-card p-6 rounded-[2rem] border border-white/10 flex flex-col justify-center items-center gap-3 hover:scale-105 transition-all text-center ${variant === 'highlight' ? 'bg-primary/5 border-primary/20' : ''
                }`}
        >
            <span className="text-2xl">{icon}</span>
            <span className={`text-[10px] font-black uppercase tracking-widest ${variant === 'highlight' ? 'text-primary' : 'text-muted-foreground'}`}>
                {title}
            </span>
        </button>
    );
};

export default MosaicoAccion;
