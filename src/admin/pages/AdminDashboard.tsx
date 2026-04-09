import { Link } from 'react-router-dom';

const sections = [
  { to: '/admin/contacto', icon: '📞', title: 'Contacto', desc: 'Teléfono, WhatsApp, emails, Instagram y ubicación' },
  { to: '/admin/calculadora', icon: '🧮', title: 'Calculadora', desc: 'Montos mínimo/máximo, tasas de interés y planes' },
  { to: '/admin/simulador', icon: '📊', title: 'Simulador de Cuotas', desc: 'Tablas de pagos para cada monto de préstamo' },
  { to: '/admin/estadisticas', icon: '📈', title: 'Estadísticas', desc: 'Números de clientes, tiempo de aprobación, etc.' },
  { to: '/admin/banner', icon: '📢', title: 'Banner Promocional', desc: 'Texto de la barra promocional verde superior' },
  { to: '/admin/equipo', icon: '👥', title: 'Equipo de Trabajo', desc: 'Fotos y datos del equipo que se muestran en la web' },
  { to: '/admin/liderazgo', icon: '👔', title: 'Liderazgo Ejecutivo', desc: 'Foto y datos del presidente y vicepresidenta' },
  { to: '/admin/promo', icon: '🎯', title: 'Flyer Promocional', desc: 'Sube un flyer cuando tengas una promocion activa' },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 style={{
        fontSize: '28px',
        fontWeight: 700,
        color: 'var(--text-black)',
        marginBottom: '8px',
      }}>
        Bienvenido al Panel de Administración
      </h1>
      <p style={{
        fontSize: '15px',
        color: 'var(--text-body)',
        marginBottom: '40px',
      }}>
        Desde aquí puedes editar los datos financieros de la web sin tocar código.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px',
      }}>
        {sections.map((s) => (
          <Link
            key={s.to}
            to={s.to}
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '28px 24px',
              textDecoration: 'none',
              boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
              border: '1.5px solid transparent',
              transition: 'all 0.2s',
              display: 'block',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--green-logo)';
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.10)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)';
            }}
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: 'var(--green-lime)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              marginBottom: '16px',
            }}>
              {s.icon}
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-black)', marginBottom: '6px' }}>
              {s.title}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-body)', lineHeight: 1.5 }}>
              {s.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
