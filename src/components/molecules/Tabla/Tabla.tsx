import React from 'react';

interface Column {
    header: string;
    accessor: string;
    render?: (item: any) => React.ReactNode;
}

interface TablaProps {
    columns: Column[];
    data: any[];
    loading?: boolean;
    emptyMessage?: string;
}

const Tabla: React.FC<TablaProps> = ({
    columns,
    data,
    loading = false,
    emptyMessage = 'No se encontraron datos'
}) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center p-20 glass-card rounded-xl text-muted-foreground animate-pulse">
                <span className="text-lg font-medium">Cargando datos...</span>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="flex justify-center items-center p-20 glass-card rounded-xl text-muted-foreground italic">
                {emptyMessage}
            </div>
        );
    }

    return (
        <div className="w-full overflow-x-auto glass-card rounded-xl shadow-lg border border-border/50 premium-scroll">
            <table className="w-full border-collapse text-foreground font-sans">
                <thead>
                    <tr className="bg-primary/10 border-b border-border/50">
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                className="text-left p-4 font-semibold uppercase text-xs tracking-wider text-primary-400"
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                    {data.map((item, rowIndex) => (
                        <tr
                            key={item.id || rowIndex}
                            className="hover:bg-primary/5 transition-colors duration-200 group"
                        >
                            {columns.map((column, colIndex) => (
                                <td key={colIndex} className="p-4 text-sm">
                                    {column.render
                                        ? column.render(item)
                                        : (
                                            <span className="group-hover:text-primary-300 transition-colors">
                                                {item[column.accessor]}
                                            </span>
                                        )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Tabla;
