import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../../atoms';
import { authService } from '../../../services/auth';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        try {
            await authService.logout();
            navigate('/login');
        } catch (err) {
            navigate('/login');
        }
    };

    const isLanding = location.pathname === '/';
    const isLogin = location.pathname === '/login';

    return (
        <nav className="glass sticky top-0 z-50 border-b p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-400 bg-clip-text text-transparent">
                        Store DWS
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    {!isLogin && (
                        <>
                            <Button
                                variant="ghost"
                                className="hidden md:flex"
                                onClick={() => navigate('/')}
                            >
                                Inicio
                            </Button>
                            <Button
                                variant="ghost"
                                className="hidden md:flex"
                                onClick={() => navigate('/products')}
                            >
                                Productos
                            </Button>
                        </>
                    )}

                    {isLanding || isLogin ? (
                        <Button
                            variant="primary"
                            onClick={() => navigate('/login')}
                        >
                            Iniciar Sesión
                        </Button>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate('/dashboard')}
                                className="hidden sm:flex"
                            >
                                Dashboard
                            </Button>
                            <span className="text-sm font-medium text-muted-foreground hidden sm:inline">Admin</span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleLogout}
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
