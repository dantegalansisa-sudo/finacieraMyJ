import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteConfig } from '../hooks/useSiteConfig';

const UrgencyBanner = () => {
  const [visible, setVisible] = useState(true);
  const urgencyBanner = useSiteConfig('urgencyBanner');
  const contacto = useSiteConfig('contacto');

  const month = new Date().toLocaleString('es-DO', { month: 'long' });
  const capitalMonth = month.charAt(0).toUpperCase() + month.slice(1);

  const promoUrl = `https://wa.me/${contacto.whatsappNumero}?text=${encodeURIComponent(urgencyBanner.whatsappMensaje)}`;

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -40, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 120,
          background: 'var(--navy)',
          padding: '10px 0',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--green-lime)',
              animation: 'pulse 2s infinite',
              flexShrink: 0,
            }}
          />
          <p
            style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.85)',
              fontWeight: 500,
              textAlign: 'center',
            }}
          >
            <span style={{ color: 'var(--green-lime)', fontWeight: 700 }}>
              {urgencyBanner.textoAntes} {capitalMonth}
            </span>
            {' '}&mdash;{' '}
            {urgencyBanner.textoDespues}
          </p>
          <a
            href={promoUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'var(--green-lime)',
              color: '#0A0A0A',
              borderRadius: '50px',
              padding: '5px 14px',
              fontSize: '12px',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              transition: 'transform 0.2s',
              flexShrink: 0,
            }}
          >
            {urgencyBanner.botonTexto}
          </a>
          <button
            onClick={() => setVisible(false)}
            style={{
              background: 'none',
              color: 'rgba(255,255,255,0.4)',
              fontSize: '18px',
              padding: '0 4px',
              lineHeight: 1,
              position: 'absolute',
              right: '16px',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>
        <style>{`
          @media (max-width: 640px) {
            .urgency-cta { display: none !important; }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
};

export default UrgencyBanner;
