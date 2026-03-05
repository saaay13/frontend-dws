import React, { useState } from 'react';
import { Button, Input, Card } from '../components/atoms';
import { authService } from '../services/auth';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await authService.login({ email, password });
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Error al iniciar sesión. Verifica tus credenciales.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center relative overflow-hidden p-6 py-20 bg-[radial-gradient(circle_at_top_right,var(--primary-100),transparent_40%),radial-gradient(circle_at_bottom_left,var(--secondary-100),transparent_40%)]">
            <Card className="w-full max-w-md shadow-2xl" title="Bienvenido de nuevo" subtitle="Ingresa tus credenciales para acceder a la Store">
                <form onSubmit={handleLogin} className="space-y-6">
                    {error && (
                        <div className="p-3 rounded-md bg-error/10 border border-error text-error text-sm font-medium">
                            {error}
                        </div>
                    )}
                    <Input
                        label="Correo Electrónico"
                        type="email"
                        placeholder="tu@correo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        label="Contraseña"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" className="rounded border-input text-primary focus:ring-primary" />
                            <span className="text-muted-foreground">Recordarme</span>
                        </label>
                        <a href="#" className="text-primary font-medium hover:underline">¿Olvidaste tu contraseña?</a>
                    </div>
                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </Button>
                </form>
                <p className="mt-8 text-center text-sm text-muted-foreground">
                    ¿No tienes una cuenta? <a href="#" className="text-primary font-bold hover:underline">Regístrate gratis</a>
                </p>
            </Card>
        </div>
    );
};

export default LoginPage;
