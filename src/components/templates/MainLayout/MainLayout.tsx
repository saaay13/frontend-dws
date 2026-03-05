import React from 'react';
import Navbar from '../../organisms/Navbar';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <footer className="p-8 border-t bg-muted/30">
                <div className="max-w-7xl mx-auto text-center text-muted-foreground text-sm">
                    <p>© 2026 Store DWS. Diseñado con pasión.</p>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
