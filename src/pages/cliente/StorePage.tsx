import React, { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import { useCart } from '../../context/CartContext';
import { Button, Input, Badge } from '../../components/atoms';
import { PlantillaAdmin } from '../../components/templates';

const StorePage: React.FC = () => {
    const { products, loading: productsLoading } = useProducts();
    const { categories } = useCategories();
    const { addToCart } = useCart();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             p.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory ? p.category_id === selectedCategory : true;
        return matchesSearch && matchesCategory && p.state !== 'eliminado';
    });

    return (
        <PlantillaAdmin
            cabecera={
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight text-foreground">Explorar Productos</h1>
                        <p className="text-muted-foreground mt-1 text-lg">Encuentra los mejores materiales para tus proyectos.</p>
                    </div>
                    <div className="flex w-full md:w-auto gap-3">
                        <Input
                            placeholder="Buscar material..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="max-w-xs bg-white/50 backdrop-blur-sm"
                        />
                    </div>
                </header>
            }
            contenido={
                <div className="space-y-8">
                    {/* Categorias */}
                    <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        <Button
                            variant={selectedCategory === null ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedCategory(null)}
                            className="rounded-full px-6"
                        >
                            Todos
                        </Button>
                        {categories.map(cat => (
                            <Button
                                key={cat.id}
                                variant={selectedCategory === cat.id ? 'primary' : 'outline'}
                                size="sm"
                                onClick={() => setSelectedCategory(cat.id)}
                                className="rounded-full px-6"
                            >
                                {cat.name}
                            </Button>
                        ))}
                    </div>

                    {productsLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                <div key={i} className="h-80 rounded-3xl bg-muted/20 animate-pulse border border-dashed border-muted/30"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map(product => (
                                <div key={product.id} className="group glass-card overflow-hidden hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 border-white/40 flex flex-col h-full">
                                    <div className="aspect-square bg-muted/10 relative overflow-hidden">
                                         <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5 group-hover:opacity-0 transition-opacity"></div>
                                         <img 
                                            src={`https://api.dicebear.com/7.x/identicon/svg?seed=${product.name}&backgroundColor=b6e3f4,c0aede,d1d4f9`} 
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80"
                                         />
                                         <Badge className="absolute top-4 right-4 bg-white/80 backdrop-blur-md text-primary font-black border-none px-3 py-1">
                                            ${product.price}
                                         </Badge>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-xl font-black leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
                                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2 flex-grow">{product.description || 'Sin descripción disponible.'}</p>
                                        
                                        <div className="mt-6 flex items-center justify-between">
                                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                                Stock: <span className={product.stock > 10 ? 'text-emerald-500' : 'text-amber-500'}>{product.stock} disp.</span>
                                            </span>
                                            <Button 
                                                size="sm" 
                                                onClick={() => addToCart(product)}
                                                disabled={product.stock <= 0}
                                                className={`rounded-xl shadow-lg transition-all ${
                                                    product.stock <= 0 
                                                    ? 'opacity-50 cursor-not-allowed bg-neutral-200 text-neutral-500 shadow-none' 
                                                    : 'shadow-primary/20 hover:shadow-primary/40 active:translate-y-1'
                                                }`}
                                            >
                                                {product.stock <= 0 ? 'Agotado' : 'Añadir'}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {!productsLoading && filteredProducts.length === 0 && (
                        <div className="text-center py-20 opacity-40 italic">
                            <p className="text-5xl mb-4">🔍</p>
                            <p className="text-lg">No encontramos productos que coincidan con tu búsqueda.</p>
                        </div>
                    )}
                </div>
            }
        />
    );
};

export default StorePage;
