import { motion } from 'framer-motion';
import FloatingCard from '../components/FloatingCard';

/* SVG mini trend line for the balance card */
const TrendLine = () => (
  <svg width="80" height="28" viewBox="0 0 80 28" fill="none" style={{ marginTop: '4px' }}>
    <path
      d="M2 24 L12 20 L22 22 L32 16 L42 18 L52 10 L62 8 L72 4 L78 2"
      stroke="#7CB518"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M2 24 L12 20 L22 22 L32 16 L42 18 L52 10 L62 8 L72 4 L78 2 L78 28 L2 28Z"
      fill="url(#trendGradient)"
      opacity="0.15"
    />
    <defs>
      <linearGradient id="trendGradient" x1="40" y1="0" x2="40" y2="28" gradientUnits="userSpaceOnUse">
        <stop stopColor="#7CB518" />
        <stop offset="1" stopColor="#7CB518" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

/* Stagger animation variants */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.3 },
  },
};

const HeroSection = () => {
  return (
    <section
      id="inicio"
      style={{
        background: 'var(--bg)',
        paddingTop: '120px',
        paddingBottom: '80px',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        className="container"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.3fr 0.7fr',
          alignItems: 'center',
          gap: '32px',
        }}
      >
        {/* ── LEFT: Text Content ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.span
            variants={slideUp}
            style={{
              display: 'inline-block',
              background: 'var(--green-lime)',
              color: '#0A0A0A',
              borderRadius: '50px',
              padding: '6px 16px',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.02em',
              marginBottom: '28px',
            }}
          >
            ✦ SOLUCIONES FINANCIERAS EN RD
          </motion.span>

          {/* Title */}
          <motion.h1
            variants={slideUp}
            style={{
              fontSize: 'clamp(52px, 6.5vw, 88px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.02,
              color: 'var(--text-black)',
              marginBottom: '24px',
            }}
          >
            Financiamiento
            <br />
            que te lleva
            <br />
            a tus{' '}
            <span style={{ color: 'var(--green-logo)' }}>metas.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={slideUp}
            style={{
              fontSize: '17px',
              color: 'var(--text-body)',
              lineHeight: 1.7,
              maxWidth: '440px',
              marginBottom: '36px',
            }}
          >
            Con la mejor tasa del mercado y aprobación en 72 horas.
            De la mano contigo, en cada paso del camino.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={slideUp}
            style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '48px' }}
          >
            <a
              href="https://wa.me/18297881795?text=Hola%2C%20me%20interesa%20un%20pr%C3%A9stamo%20con%20Grupo%20Financiero%20M%26J"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-black"
            >
              Solicitar Préstamo →
            </a>
            <a href="#servicios" className="link-arrow">
              ¿Cómo funciona? ↓
            </a>
          </motion.div>

          {/* Trust line */}
          <motion.div variants={slideUp}>
            <div
              style={{
                borderTop: '1px solid var(--border)',
                paddingTop: '24px',
              }}
            >
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--text-muted)',
                  fontWeight: 500,
                }}
              >
                Con la confianza de cientos de familias dominicanas
              </p>
              <div
                style={{
                  display: 'flex',
                  gap: '24px',
                  marginTop: '16px',
                  alignItems: 'center',
                }}
              >
                {['ARS Humano', 'ARS Senasa', 'Banco Popular', 'Asociaciones'].map(
                  (name) => (
                    <span
                      key={name}
                      style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        color: 'var(--text-muted)',
                        letterSpacing: '0.02em',
                        opacity: 0.6,
                      }}
                    >
                      {name}
                    </span>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: CEO Photo + Floating Cards ── */}
        <motion.div
          variants={fadeInRight}
          initial="hidden"
          animate="visible"
          style={{
            position: 'relative',
            width: '100%',
            height: '600px',
          }}
          className="hero-right"
        >
          {/* Blob decorativo */}
          <div
            style={{
              position: 'absolute',
              width: '460px',
              height: '460px',
              borderRadius: '50%',
              background: 'var(--bg-shape)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 0,
            }}
          />

          {/* CEO Photo */}
          <img
            src="/images/ceo.jpg"
            alt="Maridani A.G. — CEO Grupo Financiero M&J"
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              height: '90%',
              objectFit: 'contain',
              objectPosition: 'top',
              zIndex: 1,
              filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.12))',
            }}
          />

          {/* ── FLOATING CARDS ── */}

          {/* Card 1 — Top Left: Balance */}
          <FloatingCard
            style={{ top: '5%', left: '-10%', zIndex: 2 }}
            delay={0.2}
          >
            <span
              style={{
                color: 'var(--green-logo)',
                fontWeight: 700,
                fontSize: '20px',
              }}
            >
              RD$ 150K
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Prestado este mes
            </span>
            <TrendLine />
          </FloatingCard>

          {/* Card 2 — Top Right: New Clients */}
          <FloatingCard
            style={{ top: '8%', right: '-5%', zIndex: 2 }}
            delay={0.5}
          >
            <div
              style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
              }}
            >
              <span style={{ color: 'var(--green-logo)', fontWeight: 700 }}>
                +172
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Nuevos clientes
              </span>
            </div>
            <span
              style={{ fontSize: '11px', color: 'var(--green-logo)' }}
            >
              +24% este mes
            </span>
          </FloatingCard>

          {/* Card 3 — Bottom Left: Fast Approval */}
          <FloatingCard
            style={{ bottom: '20%', left: '-12%', zIndex: 2 }}
            delay={1.0}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <div
                style={{
                  background: 'var(--green-lime)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  flexShrink: 0,
                }}
              >
                ⚡
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-black)' }}>
                  Aprobación en 72h
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Rápido y seguro
                </div>
              </div>
            </div>
          </FloatingCard>

          {/* Card 4 — Bottom Right: WhatsApp Active */}
          <FloatingCard
            style={{ bottom: '25%', right: '-8%', zIndex: 2 }}
            delay={1.5}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#25D366',
                  animation: 'pulse 2s infinite',
                }}
              />
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-black)' }}>
                Activo ahora
              </span>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Escríbenos por WhatsApp
            </span>
          </FloatingCard>
        </motion.div>
      </div>

      {/* ── Responsive Styles ── */}
      <style>{`
        @media (max-width: 1024px) {
          .hero-right {
            height: 500px !important;
          }
        }
        @media (max-width: 768px) {
          section#inicio .container {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          section#inicio .container > div:first-child {
            max-width: 100% !important;
            align-items: center;
            display: flex;
            flex-direction: column;
          }
          section#inicio .container > div:first-child p {
            max-width: 100% !important;
          }
          .hero-right {
            height: 400px !important;
            order: -1;
          }
          .hero-right > div[style*="position: absolute"][style*="minWidth"] {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
