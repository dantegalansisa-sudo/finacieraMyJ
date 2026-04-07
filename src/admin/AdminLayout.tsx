import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import { AdminRoute } from './AdminRoute';
import AdminSidebar from './components/AdminSidebar';
import AdminDashboard from './pages/AdminDashboard';
import AdminContacto from './pages/AdminContacto';
import AdminCalculadora from './pages/AdminCalculadora';
import AdminSimulador from './pages/AdminSimulador';
import AdminEstadisticas from './pages/AdminEstadisticas';
import AdminBanner from './pages/AdminBanner';

export default function AdminLayout() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route path="*" element={
        <AdminRoute>
          <div className="admin-layout" style={{
            display: 'flex',
            minHeight: '100vh',
            fontFamily: 'Sora, sans-serif',
          }}>
            <AdminSidebar />
            <main style={{
              flex: 1,
              padding: '40px 48px',
              background: 'var(--bg)',
              overflowY: 'auto',
              minHeight: '100vh',
            }}>
              <Routes>
                <Route index element={<AdminDashboard />} />
                <Route path="contacto" element={<AdminContacto />} />
                <Route path="calculadora" element={<AdminCalculadora />} />
                <Route path="simulador" element={<AdminSimulador />} />
                <Route path="estadisticas" element={<AdminEstadisticas />} />
                <Route path="banner" element={<AdminBanner />} />
                <Route path="*" element={<Navigate to="/admin" replace />} />
              </Routes>
            </main>
          </div>
        </AdminRoute>
      } />
    </Routes>
  );
}
