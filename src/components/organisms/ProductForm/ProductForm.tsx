import React from 'react';
import { Button, Input } from '../../atoms';
import { useCategories } from '../../../hooks/useCategories';

interface ProductFormProps {
    onSave: (data: any) => Promise<void>;
    onCancel: () => void;
    initialData?: any;
    isSubmitting?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSave, onCancel, initialData, isSubmitting }) => {
    const { categories } = useCategories();
    const [formData, setFormData] = React.useState({
        name: initialData?.name || '',
        description: initialData?.description || '',
        category_id: initialData?.category_id || '',
        image_url: initialData?.image_url || ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in zoom-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-black text-primary-300 uppercase tracking-widest pl-1">Nombre del Producto</label>
                    <Input
                        value={formData.name}
                        onChange={(e: any) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ej: Drywall Placa Standard"
                        required
                        className="premium-input h-12"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-black text-primary-300 uppercase tracking-widest pl-1">Categoría</label>
                    <select
                        value={formData.category_id}
                        onChange={(e: any) => setFormData({ ...formData, category_id: e.target.value })}
                        className="w-full h-12 bg-background/50 backdrop-blur-sm border-neutral-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 px-4 rounded-xl text-sm appearance-none border font-medium"
                        required
                    >
                        <option value="">Seleccione una categoría</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-black text-primary-300 uppercase tracking-widest pl-1">Descripción</label>
                    <textarea
                        value={formData.description}
                        onChange={(e: any) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Detalles sobre el producto, medidas, etc."
                        className="w-full min-h-[120px] bg-background/50 backdrop-blur-sm border-neutral-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 p-4 rounded-xl text-sm border font-medium resize-none"
                    />
                </div>
                <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-black text-primary-300 uppercase tracking-widest pl-1">Imagen URL</label>
                    <Input
                        value={formData.image_url}
                        onChange={(e: any) => setFormData({ ...formData, image_url: e.target.value })}
                        placeholder="https://ejemplo.com/imagen.jpg"
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
                    {isSubmitting ? 'Guardando...' : initialData ? 'Actualizar Producto' : 'Crear Producto'}
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

export default ProductForm;
