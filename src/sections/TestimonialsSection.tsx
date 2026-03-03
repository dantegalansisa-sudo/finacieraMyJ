import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionLabel from '../components/SectionLabel';

const testimonials = [
  {
    name: 'María R.',
    initials: 'MR',
    text: 'En menos de 3 días ya tenía mi préstamo aprobado. El trato fue excelente y me explicaron cada detalle. ¡Totalmente recomendados!',
  },
  {
    name: 'Carlos M.',
    initials: 'CM',
    text: 'Lo que más valoro es la atención personalizada. No es un banco donde eres un número. Aquí te tratan como familia y te resuelven rápido.',
  },
  {
    name: 'Ana P.',
    initials: 'AP',
    text: 'Necesitaba un préstamo para mi negocio urgente. Grupo M&J fue la única empresa que me dio respuesta real. Las cuotas son cómodas.',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
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
          style={{ textAlign: 'center', marginBottom: '72px' }}
        >
          <SectionLabel text="TESTIMONIOS" />
          <h2
            style={{
              fontSize: 'clamp(36px, 4vw, 60px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              color: 'var(--text-black)',
            }}
          >
            Lo que dicen nuestros
            <br />
            clientes.
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="testimonials-grid"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              style={{
                background: 'white',
                border: '1.5px solid var(--border)',
                borderRadius: '24px',
                padding: '36px',
                position: 'relative',
                cursor: 'default',
                transition: 'border-color 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--green-logo)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              {/* Decorative quote */}
              <span
                style={{
                  fontSize: '80px',
                  fontWeight: 800,
                  color: 'var(--green-lime)',
                  opacity: 0.6,
                  lineHeight: 1,
                  position: 'absolute',
                  top: '16px',
                  right: '24px',
                }}
              >
                "
              </span>

              {/* Stars */}
              <div style={{ marginBottom: '16px', fontSize: '18px' }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: 'var(--green-logo)' }}>★</span>
                ))}
              </div>

              {/* Text */}
              <p
                style={{
                  fontSize: '16px',
                  fontStyle: 'italic',
                  color: 'var(--text-body)',
                  lineHeight: 1.7,
                  marginBottom: '24px',
                }}
              >
                {t.text}
              </p>

              {/* Avatar + Name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--navy), var(--green-logo))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-black)' }}>
                    {t.name}
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    Cliente verificado
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 1024px) {
          .testimonials-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
