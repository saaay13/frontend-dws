import React from 'react';

interface ActivityItem {
    id: number;
    title: string;
    subtitle: string;
    amount: string | number;
    initial: string;
    date?: string;
}

interface ActivityFeedProps {
    activities: ActivityItem[];
    onViewAll?: () => void;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities, onViewAll }) => {
    return (
        <div className="glass-card p-10 rounded-[3rem] border border-white/10 shadow-2xl space-y-8 h-full">
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black text-foreground tracking-tight">Movimientos</h3>
                {onViewAll && (
                    <button
                        onClick={onViewAll}
                        className="text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:opacity-70 transition-opacity"
                    >
                        Ver todo →
                    </button>
                )}
            </div>
            <div className="space-y-2">
                {activities?.length > 0 ? (
                    activities.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary border border-primary/10 group-hover:scale-110 transition-transform">
                                    {item.initial}
                                </div>
                                <div>
                                    <p className="text-sm font-black text-foreground leading-none mb-1">{item.title}</p>
                                    <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider">{item.subtitle}</p>
                                </div>
                            </div>
                            <p className="text-sm font-black text-success-dark">${item.amount}</p>
                        </div>
                    ))
                ) : (
                    <div className="py-12 text-center">
                        <p className="text-sm text-muted-foreground font-medium italic">Sin actividad reciente...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActivityFeed;
