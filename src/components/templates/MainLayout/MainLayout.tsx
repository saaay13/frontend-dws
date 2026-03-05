import { Outlet } from 'react-router-dom';
import Navbar from '../../organisms';

const MainLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <footer className="p-8 border-t bg-muted/30">
                <div className="max-w-7xl mx-auto text-center text-muted-foreground text-sm">
                    <p>© 2026 DryWall System</p>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
