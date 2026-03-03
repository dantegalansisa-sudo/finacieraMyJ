import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const logos = ['ARS Humano', 'ARS Senasa', 'Banco Popular', 'Asociaciones'];

const LogosSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--bg-white)',
        padding: '40px 0',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left text */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <p
            style={{
              fontSize: '14px',
              color: 'var(--text-muted)',
              fontWeight: 500,
              maxWidth: '240px',
              lineHeight: 1.5,
            }}
          >
            Prestamos a cientos de familias dominicanas
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '18px', cursor: 'pointer' }}>←</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '18px', cursor: 'pointer' }}>→</span>
          </div>
        </motion.div>

        {/* Logos */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
          style={{
            display: 'flex',
            gap: '40px',
            alignItems: 'center',
          }}
          className="logos-row"
        >
          {logos.map((name) => (
            <span
              key={name}
              style={{
                fontSize: '15px',
                fontWeight: 700,
                color: 'var(--navy)',
                letterSpacing: '0.01em',
                opacity: 0.3,
                whiteSpace: 'nowrap',
              }}
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .logos-row { display: none !important; }
        }
      `}</style>
    </section>
  );
};

export default LogosSection;
