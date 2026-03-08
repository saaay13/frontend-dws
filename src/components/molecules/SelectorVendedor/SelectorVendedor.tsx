import React, { useState } from 'react';
import { useSellers } from '../../../hooks/useSellers';
import { Input } from '../../atoms';

interface SelectorVendedorProps {
    onSelect: (sellerId: number) => void;
    selectedId: number | null;
}

const SelectorVendedor: React.FC<SelectorVendedorProps> = ({ onSelect, selectedId }) => {
    const { sellers, loading } = useSellers();
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const filteredSellers = sellers.filter(s =>
        s.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
        s.user?.ci?.includes(search)
    );

    const selectedSeller = sellers.find(s => s.id === selectedId);

    return (
        <div className="relative space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Vendedor Asignado</label>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between h-12 w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md px-4 cursor-pointer hover:border-primary/30 transition-all"
            >
                <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">
                        {selectedSeller ? `${selectedSeller.user?.name} ${selectedSeller.user?.apellidos}` : 'Seleccionar Vendedor'}
                    </span>
                    {selectedSeller?.id === selectedId && <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-black uppercase">Actual</span>}
                </div>
                <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </div>

            {isOpen && (
                <div className="absolute z-50 top-full left-0 w-full mt-2 glass-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="p-3 border-b border-white/5">
                        <Input
                            placeholder="Buscar vendedor..."
                            value={search}
                            onChange={(e: any) => setSearch(e.target.value)}
                            onClick={(e: any) => e.stopPropagation()}
                            autoFocus
                        />
                    </div>
                    <div className="max-h-60 overflow-y-auto premium-scroll">
                        {loading ? (
                            <div className="p-4 text-center text-[10px] uppercase font-black animate-pulse">Buscando...</div>
                        ) : filteredSellers.map(seller => (
                            <div
                                key={seller.id}
                                onClick={() => { onSelect(seller.id); setIsOpen(false); }}
                                className="p-4 hover:bg-primary/10 cursor-pointer transition-colors border-b border-white/5 flex flex-col"
                            >
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold">{seller.user?.name} {seller.user?.apellidos}</span>
                                    {selectedId === seller.id && <span className="text-primary text-xs">✓</span>}
                                </div>
                                <span className="text-[10px] text-muted-foreground">Cargo: {seller.user?.rol || 'Vendedor'}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectorVendedor;
