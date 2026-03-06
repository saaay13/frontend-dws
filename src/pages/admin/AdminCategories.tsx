import React from 'react';
import { CategoryManager } from '../../components/organisms';

const AdminCategories: React.FC = () => {
    return (
        <div className="min-h-screen mesh-gradient p-6 md:p-12">
            <div className="max-w-6xl mx-auto space-y-8">
                <header className="space-y-2">
                    <h1 className="text-4xl font-bold text-foreground tracking-tight">
                        Panel de <span className="text-primary-400">Administración</span>
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Gestiona las categorías de productos de tu tienda.
                    </p>
                </header>

                <CategoryManager />
            </div>
        </div>
    );
};

export default AdminCategories;
