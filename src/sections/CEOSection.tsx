import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionLabel from '../components/SectionLabel';
import { useSiteConfig } from '../hooks/useSiteConfig';

const CEOSection = () => {
  const liderazgo = useSiteConfig('liderazgo');
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
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <SectionLabel text="LIDERAZGO EJECUTIVO" />
          <h2
            style={{
              fontSize: 'clamp(36px, 4vw, 60px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              color: 'var(--text-black)',
            }}
          >
            Nuestra dirección
            <br />
            ejecutiva.
          </h2>
        </motion.div>

        {/* Photo and Executives Cards */}
        <div className="ceo-content">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            style={{ position: 'relative' }}
            className="ceo-photo-wrap"
          >
            {/* Blob behind photo */}
            <div
              style={{
                position: 'absolute',
                width: '95%',
                height: '95%',
                borderRadius: '32px',
                background: 'rgba(188, 255, 79, 0.12)',
                top: '2.5%',
                left: '2.5%',
                zIndex: 0,
              }}
            />
            <img
              src={liderazgo.foto}
              alt={liderazgo.fotoAlt}
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4/5',
                borderRadius: '28px',
                objectFit: 'cover',
                objectPosition: 'center',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 1,
              }}
            />
          </motion.div>

          {/* Executives Info */}
          <div className="ceo-cards-wrap">
            {/* President Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
              style={{
                background: 'white',
                borderRadius: '24px',
                padding: '36px 32px',
                border: '1.5px solid var(--border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ marginBottom: '16px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    background: 'var(--navy)',
                    color: 'white',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: '4px 12px',
                    borderRadius: '50px',
                    marginBottom: '12px',
                  }}
                >
                  Presidente
                </span>
                <h3
                  style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: 'var(--text-black)',
                    marginBottom: '4px',
                  }}
                >
                  {liderazgo.presidente.nombre}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--green-logo)',
                  }}
                >
                  {liderazgo.presidente.cargo}
                </p>
              </div>
              <p
                style={{
                  fontSize: '15px',
                  color: 'var(--text-body)',
                  lineHeight: 1.7,
                }}
              >
                {liderazgo.presidente.bio}
              </p>
            </motion.div>

            {/* Vice President Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
              style={{
                background: 'white',
                borderRadius: '24px',
                padding: '36px 32px',
                border: '1.5px solid var(--border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ marginBottom: '16px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    background: 'var(--green-logo)',
                    color: 'white',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: '4px 12px',
                    borderRadius: '50px',
                    marginBottom: '12px',
                  }}
                >
                  Vicepresidenta
                </span>
                <h3
                  style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: 'var(--text-black)',
                    marginBottom: '4px',
                  }}
                >
                  {liderazgo.vicepresidenta.nombre}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--green-logo)',
                  }}
                >
                  {liderazgo.vicepresidenta.cargo}
                </p>
              </div>
              <p
                style={{
                  fontSize: '15px',
                  color: 'var(--text-body)',
                  lineHeight: 1.7,
                }}
              >
                {liderazgo.vicepresidenta.bio}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        .ceo-content {
          display: grid;
          grid-template-columns: 0.45fr 0.55fr;
          gap: 48px;
          align-items: start;
        }
        .ceo-cards-wrap {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        @media (max-width: 968px) {
          .ceo-content {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 768px) {
          section#ceo { padding: 72px 0 !important; }
        }
      `}</style>
    </section>
  );
};

export default CEOSection;
