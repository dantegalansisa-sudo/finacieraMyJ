import { Navigate } from 'react-router-dom';
import { useAuth } from '../firebase/useAuth';

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg)',
        fontFamily: 'Sora, sans-serif',
      }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>Verificando acceso...</p>
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;

  return <>{children}</>;
}
