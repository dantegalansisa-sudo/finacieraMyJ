import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../firebase/useAuth';

const links = [
  { to: '/admin', label: 'Inicio', icon: '🏠', end: true },
  { to: '/admin/contacto', label: 'Contacto', icon: '📞', end: false },
  { to: '/admin/calculadora', label: 'Calculadora', icon: '🧮', end: false },
  { to: '/admin/simulador', label: 'Simulador de Cuotas', icon: '📊', end: false },
  { to: '/admin/estadisticas', label: 'Estadísticas', icon: '📈', end: false },
  { to: '/admin/banner', label: 'Banner Promo', icon: '📢', end: false },
  { to: '/admin/equipo', label: 'Equipo', icon: '👥', end: false },
  { to: '/admin/liderazgo', label: 'Liderazgo', icon: '👔', end: false },
  { to: '/admin/promo', label: 'Promocion', icon: '🎯', end: false },
];

export default function AdminSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <aside className="admin-sidebar" style={{
      width: '260px',
      minHeight: '100vh',
      background: 'var(--navy)',
      padding: '32px 0',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Sora, sans-serif',
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '0 24px', marginBottom: '40px' }}>
        <div style={{ fontSize: '24px', fontWeight: 800, color: 'white', letterSpacing: '-0.03em' }}>
          M&J
        </div>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontWeight: 500, marginTop: '2px' }}>
          Admin Panel
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', padding: '0 12px' }}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: isActive ? 600 : 400,
              color: isActive ? 'var(--green-lime)' : 'rgba(255,255,255,0.7)',
              background: isActive ? 'rgba(188,255,79,0.1)' : 'transparent',
              transition: 'all 0.2s',
              fontFamily: 'Sora, sans-serif',
            })}
          >
            <span style={{ fontSize: '18px' }}>{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom actions */}
      <div style={{ padding: '0 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 16px',
            borderRadius: '12px',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: 600,
            color: '#0A0A0A',
            background: 'var(--green-lime)',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          Ver Sitio Web →
        </a>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 16px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.15)',
            background: 'transparent',
            color: 'rgba(255,255,255,0.6)',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: 'Sora, sans-serif',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = 'white'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
        >
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
