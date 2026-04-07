import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import SectionLabel from '../components/SectionLabel';
import { useSiteConfig } from '../hooks/useSiteConfig';

const LoansSection = () => {
  const simuladorCuotas = useSiteConfig('simuladorCuotas');
  const contacto = useSiteConfig('contacto');
  const [selected, setSelected] = useState<number>(simuladorCuotas.montos[0]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="prestamos"
      ref={ref}
      style={{
        background: 'var(--bg-white)',
        padding: '120px 0',
      }}
    >
      <div className="container" style={{ maxWidth: '800px' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <SectionLabel text="SIMULADOR DE CUOTAS" />
          <h2
            style={{
              fontSize: 'clamp(36px, 4vw, 60px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              color: 'var(--text-black)',
            }}
          >
            ¿Cuánto necesitas?
            <br />
            Calcula tu cuota.
          </h2>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            marginBottom: '32px',
            flexWrap: 'wrap',
          }}
        >
          {simuladorCuotas.montos.map((amount) => (
            <button
              key={amount}
              onClick={() => setSelected(amount)}
              style={{
                background: selected === amount ? 'var(--green-lime)' : 'var(--border)',
                color: selected === amount ? 'var(--text-black)' : 'var(--text-body)',
                borderRadius: '50px',
                padding: '12px 24px',
                fontSize: '15px',
                fontWeight: 600,
                transition: 'all 0.2s',
              }}
            >
              RD$ {amount.toLocaleString()}
            </button>
          ))}
          <a
            href={`https://wa.me/${contacto.whatsappNumero}?text=${encodeURIComponent('Hola, me interesa consultar un monto personalizado')}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'var(--border)',
              color: 'var(--text-body)',
              borderRadius: '50px',
              padding: '12px 24px',
              fontSize: '15px',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s',
            }}
          >
            Consultar →
          </a>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
          style={{
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'var(--navy)',
              color: 'white',
              padding: '20px 32px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.02em',
            }}
          >
            <span>Período</span>
            <span>Frecuencia</span>
            <span style={{ textAlign: 'right' }}>Cuota</span>
          </div>

          {/* Rows */}
          {simuladorCuotas.datos[selected].map((row, i) => (
            <div
              key={row.periodo}
              style={{
                background: i % 2 === 0 ? 'white' : 'var(--bg)',
                padding: '20px 32px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '15px', color: 'var(--text-body)' }}>
                {row.periodo}
              </span>
              <span style={{ fontSize: '15px', color: 'var(--text-body)' }}>
                {row.frecuencia}
              </span>
              <span
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: 'var(--green-logo)',
                  textAlign: 'right',
                }}
              >
                {row.cuota}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section#prestamos { padding: 72px 0 !important; }
        }
      `}</style>
    </section>
  );
};

export default LoansSection;
