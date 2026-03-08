import React, { useState } from 'react';
import { useClients } from '../../../hooks/useClients';
import { Input } from '../../atoms';

interface SelectorClienteProps {
    onSelect: (clientId: number | null) => void;
    selectedId: number | null;
}

const SelectorCliente: React.FC<SelectorClienteProps> = ({ onSelect, selectedId }) => {
    const { clients, loading } = useClients();
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const filteredClients = clients.filter(c =>
        c.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
        c.user?.ci?.includes(search)
    );

    const selectedClient = clients.find(c => c.id === selectedId);

    return (
        <div className="relative space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Cliente</label>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between h-12 w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md px-4 cursor-pointer hover:border-primary/30 transition-all"
            >
                <span className="text-sm font-bold">
                    {selectedClient ? `${selectedClient.user?.name} ${selectedClient.user?.apellidos}` : '👤 Público General'}
                </span>
                <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </div>

            {isOpen && (
                <div className="absolute z-50 top-full left-0 w-full mt-2 glass-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="p-3 border-b border-white/5">
                        <Input
                            placeholder="Buscar por nombre o CI..."
                            value={search}
                            onChange={(e: any) => setSearch(e.target.value)}
                            onClick={(e: any) => e.stopPropagation()}
                            autoFocus
                        />
                    </div>
                    <div className="max-h-60 overflow-y-auto premium-scroll">
                        <div
                            onClick={() => { onSelect(null); setIsOpen(false); }}
                            className="p-4 hover:bg-primary/10 cursor-pointer transition-colors border-b border-white/5 flex justify-between items-center"
                        >
                            <span className="text-xs font-black uppercase">👤 Público General</span>
                            {!selectedId && <span className="text-primary text-xs">✓</span>}
                        </div>
                        {loading ? (
                            <div className="p-4 text-center text-[10px] uppercase font-black animate-pulse">Buscando...</div>
                        ) : filteredClients.map(client => (
                            <div
                                key={client.id}
                                onClick={() => { onSelect(client.id); setIsOpen(false); }}
                                className="p-4 hover:bg-primary/10 cursor-pointer transition-colors border-b border-white/5 flex flex-col"
                            >
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold">{client.user?.name} {client.user?.apellidos}</span>
                                    {selectedId === client.id && <span className="text-primary text-xs">✓</span>}
                                </div>
                                <span className="text-[10px] text-muted-foreground">CI: {client.user?.ci || 'N/A'}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectorCliente;
