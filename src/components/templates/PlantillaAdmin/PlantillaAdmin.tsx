import React from 'react';

interface PlantillaAdminProps {
    cabecera: React.ReactNode;
    contenido: React.ReactNode;
    blobs?: boolean;
}

const PlantillaAdmin: React.FC<PlantillaAdminProps> = ({
    cabecera,
    contenido,
    blobs = true
}) => {
    return (
        <div className="min-h-screen mesh-gradient p-6 md:p-12 relative overflow-hidden">
            {/* Elementos Decorativos (Blobs) */}
            {blobs && (
                <>
                    <div className="blob -top-20 -right-20 w-[800px] h-[800px] opacity-10 animate-pulse" />
                    <div className="blob -bottom-40 -left-40 w-[600px] h-[600px] opacity-10 animate-pulse"
                        style={{ animationDelay: '2s' }} />
                </>
            )}

            <div className="max-w-7xl mx-auto space-y-10 relative z-10">
                {/* Slot para la Cabecera */}
                <div className="animate-in fade-in slide-in-from-top duration-700">
                    {cabecera}
                </div>

                {/* Slot para el Contenido Principal */}
                <div className="animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
                    {contenido}
                </div>
            </div>
        </div>
    );
};

export default PlantillaAdmin;
