import React from 'react';
import { Button, Input } from '../components/atoms';
import { useLogin } from '../hooks/useLogin';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        loading,
        error,
        handleLogin
    } = useLogin();

    return (
        <div className="min-h-[calc(100vh-64px)] w-full flex items-center justify-center p-4 relative overflow-hidden mesh-gradient">
            {/* Background Blobs */}
            <div className="blob top-[-10%] left-[-10%] bg-primary-200" />
            <div className="blob bottom-[-10%] right-[-10%] bg-secondary-200" style={{ animationDelay: '-5s' }} />

            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] glass-card border-white/20">

                {/* Visual Side */}
                <div className="hidden lg:flex flex-col justify-between p-12 bg-primary-950 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.denat.com.ar/wp-content/uploads/2024/08/construccion-en-seco-2-scaled-1.jpg')] opacity-60 bg-cover bg-center"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/40 to-transparent"></div>

                    <div className="relative z-10">
                        <div className="h-12 w-12 bg-primary rounded-xl flex items-center justify-center mb-8 shadow-lg shadow-primary/20 border border-white/10">
                            <span className="text-2xl font-black italic">DS</span>
                        </div>
                        <h1 className="text-4xl font-black mb-4 leading-tight">Bienvenido a la tienda de DryWall System.</h1>
                    </div>
                </div>

                {/* Form Side */}
                <div className="p-8 lg:p-16 bg-white/40 backdrop-blur-md flex flex-col justify-center">
                    <div className="mb-10 text-center lg:text-left">
                        <h2 className="text-3xl font-black text-foreground mb-2">Ingresa a tu cuenta</h2>
                        <p className="text-muted-foreground">Bienvenido de nuevo, por favor ingresa tus datos.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="p-4 rounded-2xl bg-error/10 border border-error/20 text-error text-sm font-semibold flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
                                <span className="h-2 w-2 rounded-full bg-error"></span>
                                {error}
                            </div>
                        )}

                        <div className="space-y-5">
                            <Input
                                label="Correo Electrónico"
                                type="email"
                                placeholder="nombre@ejemplo.com"
                                className="premium-input h-12 rounded-xl"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <div className="space-y-1">
                                <Input
                                    label="Contraseña"
                                    type="password"
                                    placeholder="••••••••"
                                    className="premium-input h-12 rounded-xl"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                
                            </div>
                        </div>
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full h-12 rounded-xl text-md font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Iniciando...
                                </span>
                            ) : 'Iniciar Sesión'}
                        </Button>
                    </form>

                    <p className="mt-12 text-center text-sm text-muted-foreground">
                        ¿Aún no tienes cuenta? {' '}
                        <Link to="/register" className="text-primary font-black hover:underline underline-offset-4">
                            Regístrate aquí
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
