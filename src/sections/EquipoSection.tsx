import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionLabel from '../components/SectionLabel';
import { useSiteConfig } from '../hooks/useSiteConfig';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

// Department color map for badges
const deptColors: Record<string, string> = {
  'Gerencia': '#0D1B2A',
  'Créditos': '#7CB518',
  'Contabilidad': '#2563EB',
  'Caja': '#D97706',
  'Cobros': '#9333EA',
  'Servicio al Cliente': '#0891B2',
};

const EquipoSection = () => {
  const equipoTrabajo = useSiteConfig('equipoTrabajo');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="equipo"
      ref={ref}
      style={{
        background: 'var(--bg-white)',
        padding: '120px 0',
      }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <SectionLabel text="NUESTRO EQUIPO" />
          <h2
            style={{
              fontSize: 'clamp(36px, 4vw, 60px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              color: 'var(--text-black)',
            }}
          >
            {equipoTrabajo.titulo}
          </h2>
          <p
            style={{
              fontSize: '17px',
              color: 'var(--text-body)',
              lineHeight: 1.7,
              maxWidth: '560px',
              margin: '16px auto 0',
            }}
          >
            {equipoTrabajo.subtitulo}
          </p>
        </motion.div>

        {/* Alert Banner - Solo si hay texto de alerta */}
        {equipoTrabajo.alertaTexto && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              background: 'linear-gradient(135deg, #EBF5FF, #DBEAFE)',
              border: '1px solid #93C5FD',
              borderRadius: '16px',
              padding: '20px 28px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              marginBottom: '48px',
              maxWidth: '700px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <span style={{ fontSize: '28px', flexShrink: 0 }}>👥</span>
            <div>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#1E40AF', marginBottom: '2px' }}>
                Sección en construcción
              </p>
              <p style={{ fontSize: '13px', color: '#3B82F6', lineHeight: 1.5 }}>
                {equipoTrabajo.alertaTexto}
              </p>
            </div>
          </motion.div>
        )}

        {/* Team Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="equipo-grid"
        >
          {equipoTrabajo.miembros.map((m, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              style={{
                background: 'white',
                borderRadius: '24px',
                padding: '32px 28px',
                border: '1.5px solid var(--border)',
                transition: 'border-color 0.3s, box-shadow 0.3s',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--green-logo)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Department Badge */}
              <span
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  padding: '4px 10px',
                  borderRadius: '50px',
                  color: deptColors[m.departamento] || 'var(--navy)',
                  background: `${deptColors[m.departamento] || 'var(--navy)'}15`,
                }}
              >
                {m.departamento}
              </span>

              {/* Photo / Avatar */}
              <div
                style={{
                  width: '140px',
                  height: '140px',
                  borderRadius: '50%',
                  marginBottom: '24px',
                  overflow: 'hidden',
                  background: m.foto
                    ? 'transparent'
                    : 'linear-gradient(135deg, var(--navy), var(--green-logo))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  margin: '0 auto 24px',
                }}
              >
                {m.foto ? (
                  <img
                    src={m.foto}
                    alt={m.nombre}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5">
                    <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.5-1.632z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>

              {/* Name & Role */}
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: 'var(--text-black)',
                  marginBottom: '4px',
                }}
              >
                {m.nombre}
              </h3>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--green-logo)',
                  marginBottom: '12px',
                }}
              >
                {m.cargo}
              </p>

              {/* Description */}
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--text-body)',
                  lineHeight: 1.6,
                  marginBottom: '20px',
                }}
              >
                {m.descripcion}
              </p>

              {/* Contact Info */}
              <div
                style={{
                  borderTop: '1px solid var(--border)',
                  paddingTop: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {m.telefono ? (
                  <a
                    href={`tel:${m.telefono.replace(/[^0-9+]/g, '')}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13px',
                      color: 'var(--text-body)',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--green-logo)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-body)')}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {m.telefono}
                  </a>
                ) : (
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    Tel. por confirmar
                  </span>
                )}
                {m.email ? (
                  <a
                    href={`mailto:${m.email}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13px',
                      color: 'var(--text-body)',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--green-logo)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-body)')}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
                      <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {m.email}
                  </a>
                ) : (
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    Email por confirmar
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .equipo-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        @media (max-width: 1024px) {
          .equipo-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .equipo-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default EquipoSection;
