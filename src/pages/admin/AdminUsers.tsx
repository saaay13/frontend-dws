import React, { useState } from 'react';
import { UserForm } from '../../components/organisms';
import { Button, Badge } from '../../components/atoms';
import { Tabla, VistaPreviaEntidad, CabeceraPaginaAdmin } from '../../components/molecules';
import { useUsers } from '../../hooks/useUsers';
import { PlantillaAdmin } from '../../components/templates';

const AdminUsers: React.FC = () => {
    const { users, loading, addUser, updateUser, deleteUser, fetchUsers } = useUsers();
    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCreate = async (data: any) => {
        setIsSubmitting(true);
        try {
            await addUser(data);
            setShowForm(false);
            fetchUsers();
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdate = async (data: any) => {
        if (!editingUser) return;
        setIsSubmitting(true);
        try {
            await updateUser(editingUser.id, data);
            setEditingUser(null);
            fetchUsers();
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const columns = [
        {
            header: 'Usuario',
            accessor: 'name',
            render: (u: any) => (
                <VistaPreviaEntidad
                    name={`${u.name} ${u.apellidos}`}
                    subtext={u.email}
                    imageUrl={`https://ui-avatars.com/api/?name=${u.name}&background=random`}
                    fallback="U"
                />
            )
        },
        {
            header: 'Identificación',
            accessor: 'ci',
            render: (u: any) => (
                <div className="flex flex-col">
                    <span className="text-xs font-black text-foreground uppercase tracking-wider">{u.ci}</span>
                    <span className="text-[10px] text-muted-foreground font-medium">{u.telefono}</span>
                </div>
            )
        },
        {
            header: 'Rol / Permisos',
            accessor: 'rol',
            render: (u: any) => {
                const variants: any = {
                    administrador: 'primary',
                    vendedor: 'success',
                    cliente: 'info'
                };
                return (
                    <Badge variant={variants[u.rol] || 'outline'} className="uppercase font-black text-[9px] px-3">
                        {u.rol}
                    </Badge>
                );
            }
        },
        {
            header: 'Acciones',
            accessor: 'id',
            render: (u: any) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setEditingUser(u)}
                        className="h-9 w-9 flex items-center justify-center bg-primary/5 hover:bg-primary text-primary hover:text-white rounded-xl transition-all border border-primary/10"
                    >
                        ✎
                    </button>
                    <button
                        onClick={() => {
                            if (window.confirm('¿Estás seguro de inactivar este usuario?')) {
                                deleteUser(u.id);
                            }
                        }}
                        className="h-9 w-9 flex items-center justify-center bg-error/5 hover:bg-error text-error hover:text-white rounded-xl transition-all border border-error/10"
                    >
                        ✕
                    </button>
                </div>
            )
        }
    ];

    return (
        <PlantillaAdmin
            cabecera={
                <CabeceraPaginaAdmin
                    title="Control de Accesos"
                    category="Administración"
                    subtitle="Gestiona los perfiles de tu equipo y clientes con seguridad y jerarquía."
                    action={
                        <Button
                            onClick={() => setShowForm(true)}
                            className="px-8 py-4 rounded-2xl font-black text-lg shadow-2xl shadow-primary/30 hover:scale-105 transition-transform"
                        >
                            <span className="mr-2">+</span> Nuevo Usuario
                        </Button>
                    }
                />
            }
            contenido={
                <div className="space-y-6">
                    <Tabla columns={columns} data={users} loading={loading} />

                    {/* Modales */}
                    {(showForm || editingUser) && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-background/80 backdrop-blur-xl animate-in fade-in duration-300">
                            <div className="glass-card w-full max-w-2xl p-8 rounded-[2.5rem] border border-white/20 shadow-2xl relative">
                                <button
                                    onClick={() => {
                                        setShowForm(false);
                                        setEditingUser(null);
                                    }}
                                    className="absolute top-6 right-6 h-10 w-10 flex items-center justify-center rounded-full hover:bg-error/10 text-muted-foreground hover:text-error transition-all"
                                >
                                    ✕
                                </button>
                                <div className="mb-8 space-y-1">
                                    <h2 className="text-3xl font-black text-foreground">
                                        {showForm ? 'Nuevo' : 'Editar'} <span className="text-primary-400">Usuario</span>
                                    </h2>
                                    <p className="text-muted-foreground font-medium">Asigna roles y configura credenciales.</p>
                                </div>
                                <UserForm
                                    initialData={editingUser}
                                    onSave={showForm ? handleCreate : handleUpdate}
                                    onCancel={() => {
                                        setShowForm(false);
                                        setEditingUser(null);
                                    }}
                                    isSubmitting={isSubmitting}
                                />
                            </div>
                        </div>
                    )}
                </div>
            }
        />
    );
};

export default AdminUsers;
