import React, { useState } from 'react';
import { useCategories } from '../../../hooks/useCategories';
import { Table } from '../../molecules';
import { Button, Input } from '../../atoms';

const CategoryManager: React.FC = () => {
    const { categories, loading, addCategory, updateCategory, deleteCategory } = useCategories();
    const [isEditing, setIsEditing] = useState<number | string | null>(null);
    const [formData, setFormData] = useState({ name: '', description: '' });

    const handleEdit = (category: any) => {
        setIsEditing(category.id);
        setFormData({ name: category.name, description: category.description || '' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await updateCategory(isEditing, formData);
                setIsEditing(null);
            } else {
                await addCategory(formData);
            }
            setFormData({ name: '', description: '' });
        } catch (err) {
            console.error(err);
        }
    };

    const columns = [
        { header: 'ID', accessor: 'id' },
        { header: 'Nombre', accessor: 'name' },
        { header: 'Descripción', accessor: 'description' },
        {
            header: 'Acciones',
            accessor: 'actions',
            render: (category: any) => (
                <div className="flex gap-2">
                    <button
                        onClick={() => handleEdit(category)}
                        className="px-3 py-1 bg-primary/20 hover:bg-primary/40 text-primary-300 rounded-md transition-all text-xs border border-primary/30"
                    >
                        Editar
                    </button>
                    <button
                        onClick={() => deleteCategory(category.id)}
                        className="px-3 py-1 bg-error/20 hover:bg-error/40 text-error-dark rounded-md transition-all text-xs border border-error/30"
                    >
                        Eliminar
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="glass-card p-6 rounded-2xl border border-border/50">
                <h2 className="text-xl font-bold mb-6 text-primary-200">
                    {isEditing ? 'Editar Categoría' : 'Nueva Categoría'}
                </h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Nombre</label>
                        <Input
                            value={formData.name}
                            onChange={(e: any) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Ej. Electrónica"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Descripción</label>
                        <Input
                            value={formData.description}
                            onChange={(e: any) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Opcional..."
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button type="submit" className="w-full">
                            {isEditing ? 'Guardar Cambios' : 'Crear Categoría'}
                        </Button>
                        {isEditing && (
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => { setIsEditing(null); setFormData({ name: '', description: '' }); }}
                            >
                                Cancelar
                            </Button>
                        )}
                    </div>
                </form>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-foreground">Listado de Categorías</h2>
                    <span className="px-3 py-1 bg-primary/10 text-primary-300 rounded-full text-xs font-semibold border border-primary/20">
                        {categories.length} Total
                    </span>
                </div>
                <Table columns={columns} data={categories} loading={loading} />
            </div>
        </div>
    );
};

export default CategoryManager;
