import React from 'react';
import { Button, Input } from '../../atoms';

interface UserFormProps {
    onSave: (data: any) => Promise<void>;
    onCancel: () => void;
    initialData?: any;
    isSubmitting?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ onSave, onCancel, initialData, isSubmitting }) => {
    const [formData, setFormData] = React.useState({
        name: initialData?.name || '',
        apellidos: initialData?.apellidos || '',
        ci: initialData?.ci || '',
        telefono: initialData?.telefono || '',
        rol: initialData?.rol || 'cliente',
        email: initialData?.email || '',
        password: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { password, ...rest } = formData;
        const dataToSave = password ? { ...formData } : { ...rest };
        await onSave(dataToSave);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in zoom-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-black text-primary-300 uppercase tracking-widest pl-1">Nombre</label>
                    <Input
                        value={formData.name}
                        onChange={(e: any) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Nombre completo"
                        required
                        className="premium-input h-12"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-black text-primary-300 uppercase tracking-widest pl-1">Apellidos</label>
                    <Input
                        value={formData.apellidos}
                        onChange={(e: any) => setFormData({ ...formData, apellidos: e.target.value })}
                        placeholder="Apellidos completos"
                        required
                        className="premium-input h-12"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-black text-primary-300 uppercase tracking-widest pl-1">CI / Identificación</label>
                    <Input
                        value={formData.ci}
                        onChange={(e: any) => setFormData({ ...formData, ci: e.target.value })}
                        placeholder="Ej: 1234567 LP"
                        required
                        className="premium-input h-12"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-black text-primary-300 uppercase tracking-widest pl-1">Teléfono</label>
                    <Input
                        value={formData.telefono}
                        onChange={(e: any) => setFormData({ ...formData, telefono: e.target.value })}
                        placeholder="77112233"
                        required
                        className="premium-input h-12"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-black text-primary-300 uppercase tracking-widest pl-1">Rol de Usuario</label>
                    <select
                        value={formData.rol}
                        onChange={(e: any) => setFormData({ ...formData, rol: e.target.value })}
                        className="w-full h-12 bg-background/50 backdrop-blur-sm border-neutral-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 px-4 rounded-xl text-sm appearance-none border font-medium"
                        required
                    >
                        <option value="administrador">Administrador</option>
                        <option value="vendedor">Vendedor</option>
                        <option value="cliente">Cliente</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-black text-primary-300 uppercase tracking-widest pl-1">Correo Electrónico</label>
                    <Input
                        type="email"
                        value={formData.email}
                        onChange={(e: any) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="correo@ejemplo.com"
                        required
                        className="premium-input h-12"
                    />
                </div>
                <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-black text-primary-300 uppercase tracking-widest pl-1">
                        Contraseña {initialData && '(Dejar vacío para no cambiar)'}
                    </label>
                    <Input
                        type="password"
                        value={formData.password}
                        onChange={(e: any) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="••••••••"
                        required={!initialData}
                        className="premium-input h-12"
                    />
                </div>
            </div>

            <div className="flex gap-4 pt-4">
                <Button
                    type="submit"
                    className="flex-grow h-12 font-black text-lg shadow-xl shadow-primary/20"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Procesando...' : initialData ? 'Actualizar Usuario' : 'Crear Usuario'}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    className="h-12 px-8 font-bold border-neutral-200 hover:bg-neutral-50"
                >
                    Cancelar
                </Button>
            </div>
        </form>
    );
};

export default UserForm;
