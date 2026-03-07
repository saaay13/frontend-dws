import React from 'react';
import { useCategories } from '../../../hooks/useCategories';
import { Tabla } from '../../molecules';

interface CategoryManagerProps {
    categories?: any[];
    loading?: boolean;
    onDelete?: (id: number | string) => Promise<void>;
}

const GestorCategoria: React.FC<CategoryManagerProps> = ({
    categories: propCategories,
    loading: propLoading,
    onDelete
}) => {
    const { categories: hookCategories, loading: hookLoading, deleteCategory: hookDelete } = useCategories();

    // Priorizar props si existen, sino usar el hook (para compatibilidad)
    const categories = propCategories !== undefined ? propCategories : hookCategories;
    const loading = propLoading !== undefined ? propLoading : hookLoading;
    const deleteCategory = onDelete !== undefined ? onDelete : hookDelete;

    const columns = [
        {
            header: 'Nombre',
            accessor: 'name',
            render: (c: any) => (
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-inner">
                        {c.image_url ? (
                            <img src={c.image_url} alt={c.name} className="h-full w-full object-cover" />
                        ) : (
                            <span className="text-primary-300 font-bold text-xs">C</span>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="font-black text-foreground tracking-tight leading-tight">{c.name}</span>
                        <span className="text-[10px] text-primary font-bold uppercase tracking-wider">ID: {c.id}</span>
                    </div>
                </div>
            )
        },
        {
            header: 'Descripción',
            accessor: 'description',
            render: (c: any) => (
                <span className="text-xs text-muted-foreground line-clamp-2 max-w-[300px] font-medium italic">
                    {c.description || 'Sin descripción...'}
                </span>
            )
        },
        {
            header: 'Acciones',
            accessor: 'actions',
            render: (c: any) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => deleteCategory(c.id)}
                        className="h-9 w-9 flex items-center justify-center bg-error/5 hover:bg-error text-error hover:text-white rounded-xl transition-all border border-error/10"
                    >
                        ✕
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <Tabla columns={columns} data={categories} loading={loading} />
        </div>
    );
};

export default GestorCategoria;
