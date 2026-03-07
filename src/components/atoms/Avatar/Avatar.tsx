import React from 'react';

interface AvatarProps {
    src?: string;
    alt?: string;
    fallback: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
    src,
    alt,
    fallback,
    size = 'md',
    className = ''
}) => {
    const sizeStyles = {
        sm: 'h-8 w-8 text-[10px]',
        md: 'h-12 w-12 text-xs',
        lg: 'h-16 w-16 text-sm'
    };

    return (
        <div className={`rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-inner ${sizeStyles[size]} ${className}`}>
            {src ? (
                <img src={src} alt={alt} className="h-full w-full object-cover" />
            ) : (
                <span className="text-primary-300 font-bold uppercase">{fallback}</span>
            )}
        </div>
    );
};

export default Avatar;
