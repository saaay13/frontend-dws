import { Card } from '../components/atoms';

const DashboardPage: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8">
            <section>
                <h2 className="text-3xl font-bold mb-2">Panel de Control</h2>
                <p className="text-muted-foreground">Bienvenido al sistema de gestión de tu tienda.</p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card title="Ventas Totales" subtitle="Hoy" className="border-l-4 border-primary">
                    <p className="text-4xl font-bold mt-2">$2,450.00</p>
                    <span className="text-success text-xs font-semibold">↑ 12% desde ayer</span>
                </Card>
                <Card title="Nuevos Pedidos" subtitle="Pendientes" className="border-l-4 border-info">
                    <p className="text-4xl font-bold mt-2">18</p>
                    <span className="text-muted-foreground text-xs font-medium">4 listos para enviar</span>
                </Card>
                <Card title="Stock Bajo" subtitle="Alerta de inventario" className="border-l-4 border-warning">
                    <p className="text-4xl font-bold mt-2">5</p>
                    <span className="text-warning text-xs font-semibold">Requiere atención</span>
                </Card>
                <Card title="Clientes" subtitle="Activos este mes" className="border-l-4 border-secondary">
                    <p className="text-4xl font-bold mt-2">124</p>
                    <span className="text-success text-xs font-semibold">↑ 5 nuevos hoy</span>
                </Card>
            </div>

            <Card title="Actividad Reciente" subtitle="Últimas transacciones realizadas">
                <div className="space-y-4 mt-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary font-bold">
                                    JD
                                </div>
                                <div>
                                    <p className="font-medium">Juan Delgado</p>
                                    <p className="text-xs text-muted-foreground">Pedido #00{i} - hace 15 min</p>
                                </div>
                            </div>
                            <span className="font-bold">$450.00</span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default DashboardPage;
