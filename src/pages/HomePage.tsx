import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { Button, Badge } from '../components/atoms';

const HomePage: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { products, loading: productsLoading } = useProducts();
    const { categories, loading: categoriesLoading } = useCategories();

    const featuredProducts = products.slice(0, 4);
    const featuredCategories = categories.slice(0, 3);

    return (
        <div className="flex-grow bg-slate-50">
            {/* Hero */}
            <section className="relative overflow-hidden bg-white py-20 lg:py-32">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <Badge className="bg-primary/10 text-primary border-none py-1 px-4 rounded-full font-bold mb-4">
                            NUEVO: COLECCIÓN 2026 🚀
                        </Badge>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none text-slate-900">
                            Construye tu <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                                Mundo Profesional
                            </span>
                        </h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
                            La plataforma líder en insumos industriales y materiales de construcción con la gestión más avanzada del mercado.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 pt-4">
                            <Button size="lg" className="px-10 rounded-2xl shadow-xl shadow-primary/20" onClick={() => navigate('/store')}>
                                Ver Catálogo
                            </Button>
                            {!user && (
                                <Button variant="outline" size="lg" className="px-10 rounded-2xl border-slate-200" onClick={() => navigate('/login')}>
                                    Crear Cuenta
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Categorias */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-black text-slate-900">Categorías</h2>
                            <p className="text-slate-500 font-medium">Explora por especialidad</p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => navigate('/store')} className="font-bold text-primary">
                            Ver todas →
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {categoriesLoading ? (
                            [1, 2, 3].map(i => <div key={i} className="h-64 bg-slate-100 animate-pulse rounded-[2.5rem]"></div>)
                        ) : (
                            featuredCategories.map(cat => (
                                <div key={cat.id} className="group relative h-72 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500" onClick={() => navigate('/store')}>
                                    <img
                                        src={cat.image_url || `https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop`}
                                        alt={cat.name}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
                                    <div className="absolute bottom-8 left-8">
                                        <h3 className="text-2xl font-black text-white">{cat.name}</h3>
                                        <p className="text-white/70 text-sm font-medium">Ver productos</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Productos */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-slate-900 italic">Materiales Destacados</h2>
                        <div className="h-1.5 w-24 bg-primary mx-auto mt-4 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {productsLoading ? (
                            [1, 2, 3, 4].map(i => <div key={i} className="h-96 bg-white animate-pulse rounded-[2rem]"></div>)
                        ) : (
                            featuredProducts.map(product => (
                                <div key={product.id} className="bg-white rounded-[2rem] p-4 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
                                    <div className="aspect-square rounded-[1.5rem] overflow-hidden bg-slate-50 relative mb-6">
                                        <img
                                            src={product.image_url || `https://api.dicebear.com/7.x/identicon/svg?seed=${product.name}`}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full font-black text-slate-900 shadow-sm">
                                            ${product.price || '0.00'}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-slate-900 mb-1">{product.name}</h3>
                                        <p className="text-slate-500 text-sm line-clamp-1 mb-6 font-medium">{product.description || 'Calidad garantizada DWS'}</p>

                                        {user ? (
                                            <Button className="w-full rounded-2xl py-6 font-black uppercase tracking-widest text-xs" onClick={() => navigate('/store')}>
                                                Comprar Ahora
                                            </Button>
                                        ) : (
                                            <Button variant="outline" className="w-full rounded-2xl py-6 font-black uppercase tracking-widest text-xs border-primary text-primary hover:bg-primary hover:text-white" onClick={() => navigate('/login')}>
                                                Regístrate para comprar
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="mt-16 text-center">
                        <button className="text-slate-400 font-bold hover:text-primary transition-colors text-sm uppercase tracking-widest" onClick={() => navigate('/store')}>
                            Explorar catálogo completo 📂
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-4xl font-black mb-6">¿Listo para empezar tu proyecto?</h2>
                    <p className="text-white/60 mb-10 max-w-xl mx-auto">Únete a cientos de profesionales que ya confían en nuestra plataforma para sus suministros.</p>
                    <Button variant="primary" size="lg" className="rounded-2xl px-12 py-7 h-auto text-lg shadow-2xl shadow-primary/40" onClick={() => navigate(user ? '/dashboard' : '/login')}>
                        {user ? 'Ir a mi Panel' : 'Crear Cuenta Gratis'}
                    </Button>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full"></div>
            </section>
        </div>
    );
};

export default HomePage;
