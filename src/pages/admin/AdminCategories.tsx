import React, { useState } from 'react';
import { GestorCategoria, CategoryForm } from '../../components/organisms';
import { Button } from '../../components/atoms';
import { CabeceraPaginaAdmin } from '../../components/molecules';
import { useCategories } from '../../hooks/useCategories';
import { PlantillaAdmin } from '../../components/templates';

const AdminCategories: React.FC = () => {
    const [showForm, setShowForm] = useState(false);
    const { categories, loading, addCategory, updateCategory, deleteCategory, fetchCategories } = useCategories();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingCategory, setEditingCategory] = useState<any>(null);

    const handleCreate = async (data: any) => {
        setIsSubmitting(true);
        try {
            await addCategory(data);
            setShowForm(false);
            fetchCategories();
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdate = async (data: any) => {
        if (!editingCategory) return;
        setIsSubmitting(true);
        try {
            await updateCategory(editingCategory.id, data);
            setEditingCategory(null);
            fetchCategories();
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
                    title="Gestión de Categorías"
                    category="Catálogo"
                    subtitle="Organiza tus productos para una navegación y búsqueda eficiente."
                    action={
                        <Button onClick={() => setShowForm(true)}
                            className="px-8 py-4 rounded-2xl font-black text-lg shadow-2xl shadow-primary/30 hover:scale-105 transition-transform">
                            <span className="mr-2">+</span> Nueva Categoría
                        </Button>
                    }
                />
            }
            contenido={
                <>
                    <GestorCategoria
                        categories={categories}
                        loading={loading}
                        onDelete={deleteCategory}
                        onEdit={(cat) => setEditingCategory(cat)}
                    />

                    {/* Modal para Crear */}
                    {showForm && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-background/80 backdrop-blur-xl animate-in fade-in duration-300">
                            <div className="glass-card w-full max-w-xl p-8 rounded-[2.5rem] border border-white/20 shadow-2xl relative">
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="absolute top-6 right-6 h-10 w-10 flex items-center justify-center rounded-full hover:bg-error/10 text-muted-foreground hover:text-error transition-all"
                                >
                                    ✕
                                </button>
                                <div className="mb-8 space-y-1">
                                    <h2 className="text-3xl font-black text-foreground">Nueva <span className="text-primary-400">Categoría</span></h2>
                                    <p className="text-muted-foreground font-medium">Define una nueva sección para tus materiales.</p>
                                </div>
                                <CategoryForm
                                    onSave={handleCreate}
                                    onCancel={() => setShowForm(false)}
                                    isSubmitting={isSubmitting}
                                />
                            </div>
                        </div>
                    )}

                    {/* Modal para Editar */}
                    {editingCategory && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-background/80 backdrop-blur-xl animate-in fade-in duration-300">
                            <div className="glass-card w-full max-w-xl p-8 rounded-[2.5rem] border border-white/20 shadow-2xl relative">
                                <button
                                    onClick={() => setEditingCategory(null)}
                                    className="absolute top-6 right-6 h-10 w-10 flex items-center justify-center rounded-full hover:bg-error/10 text-muted-foreground hover:text-error transition-all"
                                >
                                    ✕
                                </button>
                                <div className="mb-8 space-y-1">
                                    <h2 className="text-3xl font-black text-foreground">Editar <span className="text-primary-400">Categoría</span></h2>
                                    <p className="text-muted-foreground font-medium">Modifica los datos de la sección.</p>
                                </div>
                                <CategoryForm
                                    initialData={editingCategory}
                                    onSave={handleUpdate}
                                    onCancel={() => setEditingCategory(null)}
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

export default AdminCategories;

