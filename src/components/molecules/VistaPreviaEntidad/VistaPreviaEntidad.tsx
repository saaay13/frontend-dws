import React from 'react';
import { Avatar } from '../../atoms';

interface VistaPreviaEntidadProps {
    name: string;
    subtext: string;
    imageUrl?: string;
    fallback: string;
}

const VistaPreviaEntidad: React.FC<VistaPreviaEntidadProps> = ({ name, subtext, imageUrl, fallback }) => {
    return (
        <div className="flex items-center gap-4">
            <Avatar src={imageUrl} alt={name} fallback={fallback} />
            <div className="flex flex-col">
                <span className="font-black text-foreground tracking-tight leading-tight">{name}</span>
                <span className="text-[10px] text-primary font-bold uppercase tracking-wider">{subtext}</span>
            </div>
        </div>
    );
};

export default VistaPreviaEntidad;
