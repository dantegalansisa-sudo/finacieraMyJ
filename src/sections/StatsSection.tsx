import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import AnimatedCounter from '../components/AnimatedCounter';

const stats = [
  { value: 739, suffix: '+', label: 'Clientes Satisfechos' },
  { value: 72, suffix: 'h', label: 'Tiempo de Aprobación' },
  { value: 24, suffix: 'h', label: 'Desembolso en' },
  { value: 100, suffix: '%', label: 'Personalizado' },
];

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--navy)',
        padding: '80px 0',
      }}
    >
      <div className="container stats-grid">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            style={{
              textAlign: 'center',
              padding: '24px 16px',
              borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
            }}
            className="stat-item"
          >
            <div
              style={{
                fontSize: 'clamp(48px, 7vw, 80px)',
                fontWeight: 800,
                color: 'white',
                letterSpacing: '-0.04em',
                lineHeight: 1,
                marginBottom: '8px',
              }}
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </div>
            <p
              style={{
                fontSize: '15px',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .stat-item:nth-child(2) {
            border-right: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default StatsSection;
