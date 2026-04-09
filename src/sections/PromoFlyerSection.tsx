import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionLabel from '../components/SectionLabel';
import { useSiteConfig } from '../hooks/useSiteConfig';

const PromoFlyerSection = () => {
  const promo = useSiteConfig('promoFlyer');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  if (!promo.activo || !promo.imagenUrl) return null;

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--bg-white)',
        padding: '120px 0',
      }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ textAlign: 'center' }}
        >
          <SectionLabel text="PROMOCION ACTIVA" />

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            style={{
              maxWidth: '900px',
              margin: '40px auto 0',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)',
              border: '1.5px solid var(--border)',
            }}
          >
            <img
              src={promo.imagenUrl}
              alt="Promoción activa — Grupo Financiero M&J"
              style={{
                width: '100%',
                aspectRatio: '16/9',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section:has(.promo-flyer-img) { padding: 72px 0 !important; }
        }
      `}</style>
    </section>
  );
};

export default PromoFlyerSection;
