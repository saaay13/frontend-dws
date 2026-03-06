import React, { useState } from 'react';
import { ProductManager, ProductForm } from '../../components/organisms';
import { Button } from '../../components/atoms';
import { AdminPageHeader } from '../../components/molecules';
import { useProducts } from '../../hooks/useProducts';

const AdminProducts: React.FC = () => {
    const [showForm, setShowForm] = useState(false);
    const { addProduct, fetchProducts } = useProducts();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCreate = async (data: any) => {
        setIsSubmitting(true);
        try {
            await addProduct(data);
            setShowForm(false);
            fetchProducts();
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen mesh-gradient p-6 md:p-12 relative overflow-hidden">
            <div className="blob -top-20 -left-20" />
            <div className="blob top-1/2 -right-20" style={{ animationDelay: '-5s' }} />

            <div className="max-w-7xl mx-auto space-y-12 relative z-10">
                <AdminPageHeader
                    title="Catálogo de Productos"
                    category="Administración"
                    subtitle="Gestiona tu inventario con precisión profesional y control total sobre cada lote."
                    action={
                        <Button
                            onClick={() => setShowForm(true)}
                            className="px-8 py-4 rounded-2xl font-black text-lg shadow-2xl shadow-primary/30 hover:scale-105 transition-transform"
                        >
                            <span className="mr-2">+</span> Crear Producto
                        </Button>
                    }
                />

                <div className="animate-in fade-in slide-in-from-bottom duration-700 delay-100">
                    <ProductManager />
                </div>
            </div>

            {/* Formulario Producto */}
            {showForm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-background/80 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="glass-card w-full max-w-2xl p-8 rounded-[2.5rem] border border-white/20 shadow-2xl relative">
                        <button
                            onClick={() => setShowForm(false)}
                            className="absolute top-6 right-6 h-10 w-10 flex items-center justify-center rounded-full hover:bg-error/10 text-muted-foreground hover:text-error transition-all"
                        >
                            ✕
                        </button>
                        <div className="mb-8 space-y-1">
                            <h2 className="text-3xl font-black text-foreground">Nuevo <span className="text-primary-400">Producto</span></h2>
                            <p className="text-muted-foreground font-medium">Completa los datos básicos del catálogo.</p>
                        </div>
                        <ProductForm
                            onSave={handleCreate}
                            onCancel={() => setShowForm(false)}
                            isSubmitting={isSubmitting}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
