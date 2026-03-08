import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/atoms';

const HomePage: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    return (
        <>
            <main className="flex-grow flex items-center justify-center relative overflow-hidden p-6">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary-200/20 rounded-full blur-3xl animate-pulse delay-700"></div>

                <div className="max-w-4xl text-center space-y-8 z-10">
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tight">
                        Tu Tienda, <br />
                        <span className="bg-gradient-to-r from-primary to-primary-400 bg-clip-text text-transparent">
                            Sin Límites.
                        </span>
                    </h2>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Gestiona tus productos, ventas y clientes con la interfaz más moderna y potente del mercado.
                    </p>
                    <div className="flex flex-col md:row gap-4 justify-center items-center">
                        <Button size="lg" className="w-full md:w-auto px-12" onClick={() => navigate('/login')}>
                            Comenzar Ahora
                        </Button>
                        <Button variant="outline" size="lg" className="w-full md:w-auto px-12">
                            Ver Demo
                        </Button>
                    </div>
                </div>
            </main>
        </>
    );
};

export default HomePage;
