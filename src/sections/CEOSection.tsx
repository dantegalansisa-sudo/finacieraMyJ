import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionLabel from '../components/SectionLabel';

const CEOSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="ceo"
      ref={ref}
      style={{
        background: 'var(--bg)',
        padding: '120px 0',
      }}
    >
      <div className="container ceo-layout">
        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ position: 'relative' }}
          className="ceo-photo-wrap"
        >
          {/* Blob behind photo */}
          <div
            style={{
              position: 'absolute',
              width: '90%',
              height: '90%',
              borderRadius: '32px',
              background: 'rgba(188, 255, 79, 0.15)',
              top: '5%',
              left: '-4%',
              zIndex: 0,
            }}
          />
          <img
            src="/images/ceo.jpg"
            alt="Maridani A.G. — CEO Grupo Financiero M&J"
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '3/4',
              borderRadius: '28px',
              objectFit: 'cover',
              objectPosition: 'top',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 1,
            }}
          />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <SectionLabel text="NUESTRA CEO" />
          <h2
            style={{
              fontSize: 'clamp(36px, 4vw, 60px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              color: 'var(--text-black)',
              marginBottom: '28px',
            }}
          >
            Maridani A.G.
            <br />
            La visión detrás
            <br />
            de M&J.
          </h2>

          <p
            style={{
              fontSize: '17px',
              color: 'var(--text-body)',
              lineHeight: 1.7,
              marginBottom: '12px',
            }}
          >
            Fundadora y CEO de Grupo Financiero M&J, Maridani construyó
            esta empresa con una premisa clara: que cada dominicano tenga
            acceso a soluciones financieras reales, rápidas y con la
            mejor tasa del mercado.
          </p>
          <p
            style={{
              fontSize: '17px',
              color: 'var(--text-body)',
              lineHeight: 1.7,
              marginBottom: '28px',
            }}
          >
            Su liderazgo cercano y trato personal han convertido a M&J
            en referente de confianza en el mercado financiero dominicano.
          </p>

          {/* Quote */}
          <div
            style={{
              borderLeft: '3px solid var(--green-logo)',
              padding: '20px 24px',
              background: '#F0F4E8',
              borderRadius: '0 12px 12px 0',
              marginBottom: '28px',
            }}
          >
            <p
              style={{
                fontSize: '16px',
                fontStyle: 'italic',
                color: 'var(--text-black)',
                lineHeight: 1.6,
                fontWeight: 500,
              }}
            >
              "Solucionamos lo que te preocupa porque entendemos
              lo que significa necesitar una respuesta rápida."
            </p>
          </div>

          {/* Credentials */}
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              'Fundadora y CEO de Grupo Financiero M&J',
              'Especialista en microfinanzas',
              'Más de 5 años de experiencia en el sector',
            ].map((cred) => (
              <li
                key={cred}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '15px',
                  color: 'var(--text-body)',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--green-lime)',
                    flexShrink: 0,
                  }}
                />
                {cred}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <style>{`
        .ceo-layout {
          display: grid;
          grid-template-columns: 0.4fr 0.6fr;
          gap: 64px;
          align-items: center;
        }
        @media (max-width: 768px) {
          .ceo-layout {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          section#ceo { padding: 72px 0 !important; }
        }
      `}</style>
    </section>
  );
};

export default CEOSection;
