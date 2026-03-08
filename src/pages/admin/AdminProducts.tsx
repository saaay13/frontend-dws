import React, { useState } from 'react';
import { GestorProducto, ProductForm } from '../../components/organisms';
import { Button } from '../../components/atoms';
import { CabeceraPaginaAdmin } from '../../components/molecules';
import { useProducts } from '../../hooks/useProducts';
import { PlantillaAdmin } from '../../components/templates';

const AdminProducts: React.FC = () => {
    const [showForm, setShowForm] = useState(false);
    const { products, loading, addProduct, updateProduct, deleteProduct, fetchProducts } = useProducts();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);

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

    const handleUpdate = async (data: any) => {
        if (!editingProduct) return;
        setIsSubmitting(true);
        try {
            await updateProduct(editingProduct.id, data);
            setEditingProduct(null);
            fetchProducts();
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <PlantillaAdmin
            cabecera={
                <CabeceraPaginaAdmin
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
            }
            contenido={
                <>
                    <GestorProducto 
                        products={products}
                        loading={loading}
                        onEditProduct={(p) => setEditingProduct(p)} 
                        onDeleteProduct={deleteProduct}
                        onRefresh={fetchProducts}
                    />

                    {/* Formulario Producto (Modal para Crear) */}
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
                    {/* Formulario Producto (Modal para Editar) */}
                    {editingProduct && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-background/80 backdrop-blur-xl animate-in fade-in duration-300">
                            <div className="glass-card w-full max-w-2xl p-8 rounded-[2.5rem] border border-white/20 shadow-2xl relative">
                                <button
                                    onClick={() => setEditingProduct(null)}
                                    className="absolute top-6 right-6 h-10 w-10 flex items-center justify-center rounded-full hover:bg-error/10 text-muted-foreground hover:text-error transition-all"
                                >
                                    ✕
                                </button>
                                <div className="mb-8 space-y-1">
                                    <h2 className="text-3xl font-black text-foreground">Editar <span className="text-primary-400">Producto</span></h2>
                                    <p className="text-muted-foreground font-medium">Modifica los datos del catálogo.</p>
                                </div>
                                <ProductForm
                                    initialData={editingProduct}
                                    onSave={handleUpdate}
                                    onCancel={() => setEditingProduct(null)}
                                    isSubmitting={isSubmitting}
                                />
                            </div>
                        </div>
                    )}
                </>
            }
        />
    );
};

export default AdminProducts;
