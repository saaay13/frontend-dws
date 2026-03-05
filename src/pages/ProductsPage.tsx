import React from 'react';
import { Card, Button, Input } from '../components/atoms';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';

const ProductsPage: React.FC = () => {
    const { products, loading, refreshProducts, search, setSearch } = useProducts();
    const navigate = useNavigate();

    return (
        <div className="p-6 space-y-8">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Productos</h1>
                    <p className="text-muted-foreground text-sm">Gestiona el inventario de tu tienda.</p>
                </div>
                <div className="flex w-full md:w-auto gap-3">
                    <Button variant="outline" onClick={() => navigate('/dashboard')}>Volver al Dashboard</Button>
                    <Button variant="primary" onClick={refreshProducts}>Actualizar</Button>
                    <Button variant="primary">+ Nuevo Producto</Button>
                </div>
            </header>

            <Card className="p-4 mb-6">
                <div className="flex items-center gap-4">
                    <div className="flex-grow">
                        <Input
                            placeholder="Buscar productos por nombre o categoría..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Button variant="secondary">Filtros</Button>
                </div>
            </Card>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <Card key={product.id} className="group hover:scale-[1.02] transition-transform duration-300">
                            <div className="aspect-square rounded-lg overflow-hidden mb-4 bg-muted relative">
                                {product.image_url ? (
                                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground italic">Sin imagen</div>
                                )}
                                <div className="absolute top-2 right-2 px-2 py-1 rounded-md bg-background/80 backdrop-blur text-[10px] font-bold uppercase tracking-wider">
                                    {product.category}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-2xl font-black text-foreground">{product.price}</p>
                                        <p className="text-xs text-muted-foreground">Stock: <span className={product.stock < 10 ? 'text-error font-bold' : 'text-success'}>{product.stock}</span></p>
                                    </div>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">⋮</Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {products.length === 0 && !loading && (
                <div className="text-center py-20 opacity-50">
                    <p className="text-xl">No se encontraron productos que coincidan con tu búsqueda.</p>
                </div>
            )}
        </div>
    );
};

export default ProductsPage;
