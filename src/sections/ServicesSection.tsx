import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionLabel from '../components/SectionLabel';

const services = [
  { icon: '💼', name: 'Préstamo Personal', desc: 'Para lo que necesites. Cuotas cómodas adaptadas a tu capacidad.', tag: 'Más popular' },
  { icon: '🏠', name: 'Préstamo Hipotecario', desc: 'Tu casa propia con las mejores condiciones del mercado.', tag: null },
  { icon: '🚗', name: 'Préstamo Prendario', desc: 'Tu vehículo como garantía. Rápido, simple, sin complicaciones.', tag: null },
  { icon: '📊', name: 'Préstamo Comercial', desc: 'Impulsa tu negocio con financiamiento flexible y ágil.', tag: 'Negocio' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="servicios"
      ref={ref}
      style={{
        background: 'var(--bg)',
        padding: '120px 0',
      }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ marginBottom: '72px' }}
        >
          <SectionLabel text="NUESTROS SERVICIOS" />
          <h2
            style={{
              fontSize: 'clamp(36px, 4vw, 60px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              color: 'var(--text-black)',
            }}
          >
            Préstamos diseñados
            <br />
            para cada necesidad.
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
          }}
          className="services-grid"
        >
          {services.map((service) => (
            <motion.div
              key={service.name}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              style={{
                background: 'white',
                borderRadius: '24px',
                padding: '40px',
                border: '1px solid var(--border)',
                position: 'relative',
                cursor: 'pointer',
                transition: 'border-color 0.3s, box-shadow 0.3s',
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
              {/* Tag */}
              {service.tag && (
                <span
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'var(--green-lime)',
                    color: '#0A0A0A',
                    borderRadius: '50px',
                    padding: '4px 12px',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                  }}
                >
                  {service.tag}
                </span>
              )}

              {/* Icon */}
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  background: 'var(--green-lime)',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '26px',
                  marginBottom: '24px',
                }}
              >
                {service.icon}
              </div>

              {/* Text */}
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: 'var(--text-black)',
                  marginBottom: '12px',
                }}
              >
                {service.name}
              </h3>
              <p
                style={{
                  fontSize: '15px',
                  color: 'var(--text-body)',
                  lineHeight: 1.6,
                }}
              >
                {service.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .services-grid { grid-template-columns: 1fr !important; }
          section#servicios { padding: 72px 0 !important; }
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;
