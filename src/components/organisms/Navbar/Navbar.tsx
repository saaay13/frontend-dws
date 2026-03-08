import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../../atoms';
import { useAuth } from '../../../context/AuthContext';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (err) {
            navigate('/login');
        }
    };

    const menuItems = {
        administrador: [
            { label: 'Dashboard', path: '/dashboard' },
            { label: 'Productos', path: '/products' },
            { label: 'Categorías', path: '/categories' },
            { label: 'Inventario', path: '/inventory' },
            { label: 'Lotes', path: '/admin/lots' },
            { label: 'Ventas', path: '/admin/sales' },
            { label: 'POS (Venta)', path: '/pos' },
        ],
        vendedor: [
            { label: 'Dashboard', path: '/dashboard' },
            { label: 'Productos', path: '/products' },
            { label: 'Ventas', path: '/sales' },
        ],
        cliente: [
            { label: 'Inicio', path: '/' },
            { label: 'Productos', path: '/products' },
            { label: 'Mis Compras', path: '/my-purchases' },
        ],

    };

    const currentMenu = user ? menuItems[user.rol as keyof typeof menuItems] || [] : [];

    const isLoginOrRegister = ['/login', '/register'].includes(location.pathname);

    return (
        <nav className="glass sticky top-0 z-50 border-b p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center text-white font-black italic shadow-lg shadow-primary/20">
                        DS
                    </div>
                    <h1 className="text-xl font-black bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent hidden sm:block">
                        DryWall System
                    </h1>
                </div>

                {/* Centered Desktop Menu */}
                {user && (
                    <div className="hidden md:flex items-center gap-2">
                        {currentMenu.map((item) => (
                            <Button
                                key={item.path}
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate(item.path)}
                                className={`font-bold rounded-lg ${location.pathname === item.path ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </div>
                )}

                <div className="flex items-center gap-3">
                    {!user ? (
                        <>
                            {!isLoginOrRegister && (
                                <Button
                                    variant="ghost"
                                    onClick={() => navigate('/login')}
                                    className="font-bold"
                                >
                                    Ingresar
                                </Button>
                            )}
                            <Button
                                variant="primary"
                                onClick={() => navigate('/register')}
                                className="font-bold shadow-lg shadow-primary/20"
                            >
                                {location.pathname === '/register' ? 'Unirse ahora' : 'Registrarse'}
                            </Button>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex flex-col items-end">
                                <span className="text-sm font-black text-foreground leading-none">{user.name}</span>
                                <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{user.rol}</span>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden">
                                <img src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} alt="avatar" />
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleLogout}
                                className="rounded-xl border-neutral-200 hover:bg-error/5 hover:text-error hover:border-error/20 transition-all"
                            >
                                Salir
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
