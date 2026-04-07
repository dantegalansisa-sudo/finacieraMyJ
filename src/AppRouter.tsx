import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import App from './App';

const AdminLayout = lazy(() => import('./admin/AdminLayout'));

function AdminLoading() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg)',
      fontFamily: 'Sora, sans-serif',
    }}>
      <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>Cargando panel...</p>
    </div>
  );
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/admin/*" element={
        <Suspense fallback={<AdminLoading />}>
          <AdminLayout />
        </Suspense>
      } />
      <Route path="/*" element={<App />} />
    </Routes>
  );
}
