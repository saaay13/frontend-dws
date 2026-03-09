import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/templates';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminCategories from './pages/admin/AdminCategories';
import AdminProducts from './pages/admin/AdminProducts';
import AdminInventory from './pages/admin/AdminInventory';
import AdminLots from './pages/admin/AdminLots';
import AdminSales from './pages/admin/AdminSales';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import POSPage from './pages/admin/POSPage';
import VendedorDashboard from './pages/vendedor/VendedorDashboard';
import StorePage from './pages/cliente/StorePage';
import ProtectedRoute from './guards/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import ClienteDashboard from './pages/cliente/ClienteDashboard';
import './App.css';

const DashboardRedirect = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  switch (user.rol) {
    case 'administrador':
      return <AdminDashboard />;
    case 'vendedor':
      return <VendedorDashboard />;
    case 'cliente':
      return <HomePage />;
    default:
      return <Navigate to="/" replace />;
  }
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />

          <Route path="/dashboard" element={
            <ProtectedRoute allowedRoles={['administrador', 'vendedor', 'cliente']}>
              <DashboardRedirect />
            </ProtectedRoute>} />

          <Route path="/products" element={
            <ProtectedRoute allowedRoles={['administrador', 'vendedor']}>
              <AdminProducts />
            </ProtectedRoute>} />

          <Route path="/categories" element={
            <ProtectedRoute allowedRoles={['administrador']}>
              <AdminCategories />
            </ProtectedRoute>} />

          <Route path="/inventory" element={
            <ProtectedRoute allowedRoles={['administrador']}>
              <AdminInventory />
            </ProtectedRoute>} />

          <Route path="/admin/lots" element={
            <ProtectedRoute allowedRoles={['administrador', 'vendedor']}>
              <AdminLots />
            </ProtectedRoute>} />

          <Route path="/admin/sales" element={
            <ProtectedRoute allowedRoles={['administrador', 'vendedor']}>
              <AdminSales />
            </ProtectedRoute>} />

          <Route path="/admin/users" element={
            <ProtectedRoute allowedRoles={['administrador']}>
              <AdminUsers />
            </ProtectedRoute>} />

          <Route path="/pos" element={
            <ProtectedRoute allowedRoles={['administrador', 'vendedor']}>
              <POSPage />
            </ProtectedRoute>} />

          <Route path="/store" element={
            <ProtectedRoute allowedRoles={['cliente']}>
              <StorePage />
            </ProtectedRoute>} />

          <Route path="/miscompras" element={
            <ProtectedRoute allowedRoles={['cliente']}>
              <ClienteDashboard />
            </ProtectedRoute>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
