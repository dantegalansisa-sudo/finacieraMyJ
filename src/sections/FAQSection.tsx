import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import SectionLabel from '../components/SectionLabel';
import { preguntasFrecuentes } from '../config/siteConfig';
import { useSiteConfig } from '../hooks/useSiteConfig';

const FAQItem = ({ faq, isOpen, onToggle }: { faq: { q: string; a: string }; isOpen: boolean; onToggle: () => void }) => (
  <div
    style={{
      borderBottom: '1px solid var(--border)',
    }}
  >
    <button
      onClick={onToggle}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '24px 0',
        background: 'none',
        textAlign: 'left',
        gap: '16px',
      }}
    >
      <span
        style={{
          fontSize: '16px',
          fontWeight: 600,
          color: isOpen ? 'var(--green-logo)' : 'var(--text-black)',
          lineHeight: 1.4,
          transition: 'color 0.2s',
        }}
      >
        {faq.q}
      </span>
      <motion.span
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.2 }}
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: isOpen ? 'var(--green-lime)' : 'var(--bg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          fontWeight: 300,
          color: 'var(--text-black)',
          flexShrink: 0,
          transition: 'background 0.2s',
        }}
      >
        +
      </motion.span>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ overflow: 'hidden' }}
        >
          <p
            style={{
              fontSize: '15px',
              color: 'var(--text-body)',
              lineHeight: 1.7,
              paddingBottom: '24px',
              maxWidth: '640px',
            }}
          >
            {faq.a}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FAQSection = () => {
  const contacto = useSiteConfig('contacto');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--bg)',
        padding: '120px 0',
      }}
    >
      <div className="container" style={{ maxWidth: '800px' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <SectionLabel text="PREGUNTAS FRECUENTES" />
          <h2
            style={{
              fontSize: 'clamp(36px, 4vw, 60px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              color: 'var(--text-black)',
            }}
          >
            ¿Tienes dudas?
            <br />
            Te las resolvemos.
          </h2>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
          style={{
            background: 'white',
            borderRadius: '24px',
            padding: '8px 36px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          {preguntasFrecuentes.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
          style={{
            textAlign: 'center',
            marginTop: '40px',
          }}
        >
          <p style={{ fontSize: '15px', color: 'var(--text-body)', marginBottom: '16px' }}>
            ¿No encontraste tu pregunta?
          </p>
          <a
            href={`https://wa.me/${contacto.whatsappNumero}?text=${encodeURIComponent('Hola, tengo una pregunta sobre sus préstamos')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-black"
          >
            Pregúntanos por WhatsApp →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
