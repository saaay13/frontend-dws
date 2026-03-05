import React from 'react';
import { Button, Input } from '../components/atoms';
import { useRegister } from '../hooks/useRegister';
import { Link } from 'react-router-dom';

const RegisterPage: React.FC = () => {
    const {
        formData,
        handleChange,
        loading,
        error,
        handleRegister
    } = useRegister();

    return (
        <div className="min-h-[calc(100vh-64px)] w-full flex items-center justify-center p-4 relative overflow-hidden mesh-gradient">
            {/* Background Blobs */}
            <div className="blob top-[-10%] left-[-10%] bg-primary-200" />
            <div className="blob bottom-[-10%] right-[-10%] bg-secondary-200" style={{ animationDelay: '-5s' }} />

            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] glass-card border-white/20">

                {/* Visual Side */}
                <div className="hidden lg:flex flex-col justify-between p-12 bg-secondary-600 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop')] mix-blend-overlay opacity-40 bg-cover bg-center"></div>

                    <div className="relative z-10">
                        <div className="h-12 w-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-8 border border-white/30">
                            <span className="text-2xl font-black italic text-white">SD</span>
                        </div>
                        <h1 className="text-4xl font-black mb-4 leading-tight">Crea tu cuenta hoy mismo.</h1>
                        <p className="text-secondary-100 text-lg leading-relaxed max-w-sm">
                            Únete a nuestra plataforma y empieza a gestionar tus compras o ventas de manera inteligente.
                        </p>
                    </div>

                    <div className="relative z-10 pt-12">
                        <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                            <p className="text-sm italic text-secondary-50">"La mejor herramienta para llevar el control de mi negocio. El registro fue súper rápido."</p>
                            <div className="mt-4 flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-secondary-400" />
                                <div>
                                    <p className="text-sm font-bold">Carlos Mendoza</p>
                                    <p className="text-xs text-secondary-200">Cliente Verificado</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Side */}
                <div className="p-8 lg:p-12 bg-white/40 backdrop-blur-md flex flex-col justify-center overflow-y-auto max-h-[90vh]">
                    <div className="mb-8 text-center lg:text-left">
                        <h2 className="text-3xl font-black text-foreground mb-2">Registro de Usuario</h2>
                        <p className="text-muted-foreground">Completa tus datos para crear tu cuenta.</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">
                        {error && (
                            <div className="p-4 rounded-2xl bg-error/10 border border-error/20 text-error text-sm font-semibold flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
                                <span className="h-2 w-2 rounded-full bg-error"></span>
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Nombre"
                                name="name"
                                placeholder="Tu nombre"
                                className="premium-input h-11 rounded-xl"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                label="Apellidos"
                                name="apellidos"
                                placeholder="Tus apellidos"
                                className="premium-input h-11 rounded-xl"
                                value={formData.apellidos}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="CI / DNI"
                                name="ci"
                                placeholder="Identificación"
                                className="premium-input h-11 rounded-xl"
                                value={formData.ci}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                label="Teléfono"
                                name="telefono"
                                placeholder="Nro de celular"
                                className="premium-input h-11 rounded-xl"
                                value={formData.telefono}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <Input
                            label="Correo Electrónico"
                            name="email"
                            type="email"
                            placeholder="nombre@ejemplo.com"
                            className="premium-input h-11 rounded-xl"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            label="Contraseña"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            className="premium-input h-11 rounded-xl"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full h-12 rounded-xl text-md font-bold shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all mt-4"
                            disabled={loading}
                        >
                            {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
                        </Button>
                    </form>

                    <p className="mt-8 text-center text-sm text-muted-foreground">
                        ¿Ya tienes una cuenta? {' '}
                        <Link to="/login" className="text-primary font-black hover:underline underline-offset-4">
                            Inicia sesión aquí
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
