import React from 'react';
import { Button, Input } from '../../atoms';



interface CategoryFormProps {
    onSave: (data: any) => Promise<void>;
    onCancel: () => void;
    initialData?: any;
    isSubmitting?: boolean;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onSave, onCancel, initialData, isSubmitting }) => {
    const [formData, setFormData] = React.useState({
        name: initialData?.name || '',
        description: initialData?.description || ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in zoom-in duration-300">
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-xs font-black text-primary-300 uppercase tracking-widest pl-1">Nombre de la Categoría</label>
                    <Input
                        value={formData.name}
                        onChange={(e: any) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ej: Materiales de Construcción"
                        required
                        className="premium-input h-12"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-black text-primary-300 uppercase tracking-widest pl-1">Descripción</label>
                    <textarea
                        value={formData.description}
                        onChange={(e: any) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Breve descripción de los productos en esta categoría..."
                        className="w-full min-h-[120px] bg-background/50 backdrop-blur-sm border-neutral-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 p-4 rounded-xl text-sm border font-medium resize-none"
                    />
                </div>
            </div>

            <div className="flex gap-4 pt-4">
                <Button
                    type="submit"
                    className="flex-grow h-12 font-black text-lg shadow-xl shadow-primary/20"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Guardando...' : initialData ? 'Actualizar Categoría' : 'Crear Categoría'}
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

export default CategoryForm;
