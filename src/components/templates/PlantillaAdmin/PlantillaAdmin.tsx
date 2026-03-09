import React from 'react';

interface PlantillaAdminProps {
    cabecera: React.ReactNode;
    contenido: React.ReactNode;
    blobs?: boolean;
    isLoading?: boolean;
}

const PlantillaAdmin: React.FC<PlantillaAdminProps> = ({
    cabecera,
    contenido,
    blobs = true,
    isLoading = false
}) => {
    return (
        <div className="min-h-screen mesh-gradient p-6 md:p-12 relative overflow-hidden">
            {isLoading && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/50 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="flex flex-col items-center gap-4">
                        <div className="h-12 w-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                        <p className="text-primary font-black uppercase tracking-widest text-[10px] animate-pulse">Cargando... DS</p>
                    </div>
                </div>
            )}
            {blobs && (
                <>
                    <div className="blob -top-20 -right-20 w-[800px] h-[800px] opacity-10 animate-pulse" />
                    <div className="blob -bottom-40 -left-40 w-[600px] h-[600px] opacity-10 animate-pulse"
                        style={{ animationDelay: '2s' }} />
                </>
            )}

            <div className="max-w-7xl mx-auto space-y-10 relative z-10">
                <div className="animate-in fade-in slide-in-from-top duration-700">
                    {cabecera}
                </div>

                <div className="animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
                    {contenido}
                </div>
            </div>
        </div>
    );
};

export default PlantillaAdmin;
