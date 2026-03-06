import React from 'react';
import { useCategories } from '../../../hooks/useCategories';
import { Table } from '../../molecules';

const CategoryManager: React.FC = () => {
    const { categories, loading, deleteCategory } = useCategories();

    const columns = [
        {
            header: 'Nombre',
            accessor: 'name',
            render: (c: any) => (
                <div className="flex flex-col">
                    <span className="font-black text-foreground tracking-tight leading-tight">{c.name}</span>
                    <span className="text-[10px] text-primary font-bold uppercase tracking-wider">Categoría ID: {c.id}</span>
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
            <Table columns={columns} data={categories} loading={loading} />
        </div>
    );
};

export default CategoryManager;
