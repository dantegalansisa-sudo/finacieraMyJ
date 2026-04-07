import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { hero } from '../config/siteConfig';
import { useSiteConfig } from '../hooks/useSiteConfig';

/* ── Ticker Data ── */
const tickerItems = [
  { symbol: 'PRÉSTAMOS', value: 'RD$ 4.2M', change: '+12.4%', up: true },
  { symbol: 'CLIENTES', value: '739+', change: '+24%', up: true },
  { symbol: 'APROBACIÓN', value: '72h', change: '-30%', up: true },
  { symbol: 'DESEMBOLSO', value: '24h', change: 'Express', up: true },
  { symbol: 'CARTERA', value: 'RD$ 8.5M', change: '+18.2%', up: true },
  { symbol: 'SATISFACCIÓN', value: '98.7%', change: '+2.1%', up: true },
  { symbol: 'TASA', value: 'Mejor RD', change: 'Competitiva', up: true },
  { symbol: 'COBERTURA', value: 'Nacional', change: 'RD completa', up: true },
];

/* ── Candlestick data for full-width chart ── */
const generateCandlesticks = () => {
  const sticks = [];
  let price = 70;
  for (let i = 0; i < 40; i++) {
    const change = (Math.random() - 0.4) * 15;
    const open = price;
    const close = price + change;
    const high = Math.min(open, close) - Math.random() * 8;
    const low = Math.max(open, close) + Math.random() * 8;
    sticks.push({
      x: i * 28 + 10,
      open: Math.max(5, Math.min(95, open)),
      close: Math.max(5, Math.min(95, close)),
      high: Math.max(2, Math.min(98, high)),
      low: Math.min(98, Math.max(2, low)),
      up: close < open,
    });
    price = close;
    if (price < 20) price = 25;
    if (price > 80) price = 75;
  }
  return sticks;
};

const candlestickData = generateCandlesticks();

/* ── Volume bars for the bottom ── */
const volumeBars = Array.from({ length: 60 }, (_, i) => ({
  x: i * 19,
  h: 5 + Math.random() * 25 + (i > 40 ? 10 : 0),
}));

/* ── Animated Counter ── */
const AnimatedValue = ({ value, suffix = '' }: { value: string; suffix?: string }) => {
  const [display, setDisplay] = useState('0');
  const numericPart = parseInt(value.replace(/[^0-9]/g, ''));

  useEffect(() => {
    let start = 0;
    const end = numericPart;
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * end);
      setDisplay(start.toLocaleString());
      if (progress < 1) requestAnimationFrame(animate);
    };

    const timer = setTimeout(() => requestAnimationFrame(animate), 800);
    return () => clearTimeout(timer);
  }, [numericPart]);

  return <>{display}{suffix}</>;
};

/* ── Animation Variants ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/* ── Hero Section ── */
const HeroSection = () => {
  const contacto = useSiteConfig('contacto');
  const whatsappUrl = `https://wa.me/${contacto.whatsappNumero}?text=${encodeURIComponent(contacto.whatsappMensaje)}`;
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  /* Parallax transforms for different layers */
  const chartX = useTransform(springX, [0, 1], [15, -15]);
  const chartY = useTransform(springY, [0, 1], [10, -10]);
  const gridX = useTransform(springX, [0, 1], [5, -5]);
  const gridY = useTransform(springY, [0, 1], [3, -3]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      id="inicio"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      style={{
        background: 'var(--navy)',
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* ── TICKER TAPE ── */}
      <div
        style={{
          borderBottom: '1px solid rgba(188,255,79,0.1)',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          padding: '10px 0',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{ display: 'inline-flex', gap: '0px' }}
        >
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0 32px',
                fontSize: '12px',
                fontWeight: 500,
              }}
            >
              <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>{item.symbol}</span>
              <span style={{ color: 'white', fontWeight: 700 }}>{item.value}</span>
              <span style={{ color: '#BCFF4F', fontWeight: 600 }}>
                {item.up ? '▲' : '▼'} {item.change}
              </span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── BACKGROUND: Full-width grid ── */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          x: gridX,
          y: gridY,
        }}
      >
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
          {/* Horizontal grid lines */}
          {Array.from({ length: 12 }, (_, i) => (
            <line
              key={`h${i}`}
              x1="0"
              y1={`${(i + 1) * 8}%`}
              x2="100%"
              y2={`${(i + 1) * 8}%`}
              stroke="rgba(124,181,24,0.06)"
              strokeWidth="1"
            />
          ))}
          {/* Vertical grid lines */}
          {Array.from({ length: 20 }, (_, i) => (
            <line
              key={`v${i}`}
              x1={`${(i + 1) * 5}%`}
              y1="0"
              x2={`${(i + 1) * 5}%`}
              y2="100%"
              stroke="rgba(124,181,24,0.04)"
              strokeWidth="1"
            />
          ))}
        </svg>
      </motion.div>

      {/* ── BACKGROUND: Full-width candlestick chart ── */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '-5%',
          right: '-5%',
          height: '65%',
          zIndex: 1,
          x: chartX,
          y: chartY,
        }}
      >
        <svg
          viewBox="0 0 1140 100"
          fill="none"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%' }}
        >
          {/* Candlesticks */}
          {candlestickData.map((c, i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{
                delay: 0.5 + i * 0.04,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              style={{ transformOrigin: `${c.x + 6}px 50px` }}
            >
              <line
                x1={c.x + 6}
                y1={c.high}
                x2={c.x + 6}
                y2={c.low}
                stroke={c.up ? 'rgba(124,181,24,0.35)' : 'rgba(255,100,100,0.2)'}
                strokeWidth="1"
              />
              <rect
                x={c.x}
                y={Math.min(c.open, c.close)}
                width="12"
                height={Math.max(2, Math.abs(c.close - c.open))}
                rx="1"
                fill={c.up ? 'rgba(124,181,24,0.25)' : 'rgba(255,100,100,0.12)'}
                stroke={c.up ? 'rgba(124,181,24,0.4)' : 'rgba(255,100,100,0.2)'}
                strokeWidth="0.5"
              />
            </motion.g>
          ))}

          {/* Main trend line */}
          <motion.path
            d="M0 75 Q80 68 160 60 T320 50 T480 38 T640 30 T800 22 T960 15 T1140 8"
            stroke="#BCFF4F"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.5, duration: 2, ease: [0.16, 1, 0.3, 1] as const }}
          />

          {/* Gradient fill under trend */}
          <motion.path
            d="M0 75 Q80 68 160 60 T320 50 T480 38 T640 30 T800 22 T960 15 T1140 8 L1140 100 L0 100 Z"
            fill="url(#bgTrendFill)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
          />

          {/* Secondary moving average */}
          <motion.path
            d="M0 78 Q100 72 200 65 T400 55 T600 42 T800 32 T1000 20 T1140 14"
            stroke="rgba(188,255,79,0.2)"
            strokeWidth="1"
            strokeDasharray="4 4"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 2, duration: 2, ease: [0.16, 1, 0.3, 1] as const }}
          />

          <defs>
            <linearGradient id="bgTrendFill" x1="570" y1="0" x2="570" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#BCFF4F" stopOpacity="0.08" />
              <stop offset="1" stopColor="#BCFF4F" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* ── BACKGROUND: Volume bars at bottom ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '80px',
          zIndex: 1,
          overflow: 'hidden',
        }}
      >
        <svg
          viewBox="0 0 1140 35"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%' }}
        >
          {volumeBars.map((bar, i) => (
            <motion.rect
              key={i}
              x={bar.x}
              y={35 - bar.h}
              width="14"
              rx="1"
              height={bar.h}
              fill={i % 3 === 0 ? 'rgba(124,181,24,0.15)' : 'rgba(124,181,24,0.07)'}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.3 + i * 0.02, duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
              style={{ transformOrigin: `${bar.x + 7}px 35px` }}
            />
          ))}
        </svg>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div
        className="container"
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          zIndex: 5,
          paddingTop: '40px',
          paddingBottom: '80px',
        }}
      >
        <div className="hero-content-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center', width: '100%' }}>

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
                background: 'rgba(188,255,79,0.12)',
                color: '#BCFF4F',
                borderRadius: '50px',
                padding: '6px 16px',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.02em',
                marginBottom: '28px',
                border: '1px solid rgba(188,255,79,0.2)',
              }}
            >
              {hero.badge}
            </motion.span>

            {/* Title */}
            <motion.h1
              variants={slideUp}
              style={{
                fontSize: 'clamp(48px, 6vw, 82px)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1.02,
                color: 'white',
                marginBottom: '24px',
              }}
            >
              {hero.tituloLinea1}
              <br />
              {hero.tituloLinea2}
              <br />
              {hero.tituloLinea3}
              <span style={{ color: '#BCFF4F' }}>{hero.tituloAcento}</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={slideUp}
              style={{
                fontSize: '17px',
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.7,
                maxWidth: '440px',
                marginBottom: '36px',
              }}
            >
              {hero.descripcion}
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={slideUp}
              style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '48px' }}
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-black"
              >
                {hero.botonPrincipal}
              </a>
              <a
                href="#servicios"
                style={{
                  fontSize: '15px',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.5)',
                  transition: 'color 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#BCFF4F')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              >
                {hero.linkSecundario}
              </a>
            </motion.div>

            {/* Trust stats row */}
            <motion.div variants={slideUp}>
              <div
                style={{
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  paddingTop: '24px',
                  display: 'flex',
                  gap: '40px',
                }}
                className="hero-stats-row"
              >
                {[
                  { value: '739', suffix: '+', label: 'Clientes activos' },
                  { value: '72', suffix: 'h', label: 'Aprobación' },
                  { value: '24', suffix: 'h', label: 'Desembolso' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div style={{ fontSize: '24px', fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>
                      <AnimatedValue value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', fontWeight: 500, marginTop: '2px' }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Floating Data Panels ── */}
          <div style={{ position: 'relative', height: '520px' }} className="hero-panels">

            {/* Panel 1 — Portfolio Value (top-left) */}
            <motion.div
              className="hero-panel"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
              style={{
                position: 'absolute',
                top: '0%',
                left: '0%',
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)',
                borderRadius: '20px',
                padding: '24px',
                border: '1px solid rgba(255,255,255,0.08)',
                minWidth: '200px',
                animation: 'float 5s ease-in-out infinite',
              }}
            >
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Portafolio total
              </div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>
                RD$ 4.2M
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                <span style={{ color: '#BCFF4F', fontSize: '13px', fontWeight: 600 }}>▲ +12.4%</span>
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px' }}>este mes</span>
              </div>
              {/* Mini sparkline */}
              <svg width="100%" height="32" viewBox="0 0 160 32" fill="none" style={{ marginTop: '12px' }}>
                <path
                  d="M0 28 L16 24 L32 26 L48 20 L64 22 L80 16 L96 14 L112 10 L128 12 L144 6 L160 4"
                  stroke="#BCFF4F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M0 28 L16 24 L32 26 L48 20 L64 22 L80 16 L96 14 L112 10 L128 12 L144 6 L160 4 L160 32 L0 32Z"
                  fill="url(#sparkFill1)"
                />
                <defs>
                  <linearGradient id="sparkFill1" x1="80" y1="0" x2="80" y2="32" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#BCFF4F" stopOpacity="0.2" />
                    <stop offset="1" stopColor="#BCFF4F" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Panel 2 — Clients (top-right) */}
            <motion.div
              className="hero-panel"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
              style={{
                position: 'absolute',
                top: '5%',
                right: '0%',
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)',
                borderRadius: '20px',
                padding: '20px 24px',
                border: '1px solid rgba(255,255,255,0.08)',
                minWidth: '180px',
                animation: 'float 5s ease-in-out infinite',
                animationDelay: '0.7s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '24px', fontWeight: 800, color: '#BCFF4F' }}>+172</span>
                <div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Nuevos clientes</div>
                  <div style={{ fontSize: '11px', color: '#BCFF4F' }}>+24% este mes</div>
                </div>
              </div>
            </motion.div>

            {/* Panel 3 — Live indicator (middle) */}
            <motion.div
              className="hero-panel"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
              style={{
                position: 'absolute',
                top: '42%',
                right: '5%',
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)',
                borderRadius: '20px',
                padding: '20px 24px',
                border: '1px solid rgba(255,255,255,0.08)',
                animation: 'float 5s ease-in-out infinite',
                animationDelay: '1.4s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '10px', height: '10px', borderRadius: '50%',
                  background: '#BCFF4F',
                  animation: 'pulse 2s infinite',
                  boxShadow: '0 0 12px rgba(188,255,79,0.5)',
                }} />
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'white' }}>Mercado activo</span>
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '4px', paddingLeft: '20px' }}>
                Respondemos al instante
              </div>
            </motion.div>

            {/* Panel 4 — Approval speed (bottom-left) */}
            <motion.div
              className="hero-panel"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
              style={{
                position: 'absolute',
                bottom: '10%',
                left: '5%',
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)',
                borderRadius: '20px',
                padding: '20px 24px',
                border: '1px solid rgba(188,255,79,0.15)',
                animation: 'float 5s ease-in-out infinite',
                animationDelay: '2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  background: 'rgba(188,255,79,0.15)',
                  borderRadius: '12px',
                  width: '40px', height: '40px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px',
                }}>
                  ⚡
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '15px', color: 'white' }}>
                    Aprobación en 72h
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
                    Desembolso en 24h
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Panel 5 — Volume chart (bottom-right) */}
            <motion.div
              className="hero-panel"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 2.0, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
              style={{
                position: 'absolute',
                bottom: '5%',
                right: '0%',
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)',
                borderRadius: '20px',
                padding: '20px 24px',
                border: '1px solid rgba(255,255,255,0.08)',
                animation: 'float 5s ease-in-out infinite',
                animationDelay: '2.5s',
              }}
            >
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'white', marginBottom: '4px' }}>
                Volumen mensual
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginBottom: '8px' }}>
                Crecimiento constante
              </div>
              <svg width="100" height="32" viewBox="0 0 100 32" fill="none">
                {[0, 14, 28, 42, 56, 70, 84].map((x, i) => (
                  <rect
                    key={i}
                    x={x}
                    y={32 - (10 + i * 3)}
                    width="10"
                    rx="2"
                    height={10 + i * 3}
                    fill={i >= 5 ? '#BCFF4F' : 'rgba(188,255,79,0.25)'}
                  />
                ))}
              </svg>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Price axis labels on right side ── */}
      <div
        className="hero-price-axis"
        style={{
          position: 'absolute',
          right: '24px',
          top: '15%',
          bottom: '15%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          zIndex: 2,
        }}
      >
        {['4.80', '4.40', '4.00', '3.60', '3.20', '2.80'].map((price) => (
          <span key={price} style={{ fontSize: '10px', color: 'rgba(255,255,255,0.15)', fontWeight: 500, fontFamily: 'monospace' }}>
            {price}M
          </span>
        ))}
      </div>

      {/* ── Bottom gradient fade ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '120px',
          background: 'linear-gradient(to top, var(--navy) 0%, transparent 100%)',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />

      {/* ── Responsive Styles ── */}
      <style>{`
        @media (max-width: 1024px) {
          .hero-panels {
            height: 420px !important;
          }
        }
        @media (max-width: 768px) {
          section#inicio {
            min-height: auto !important;
          }
          .hero-content-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
            gap: 24px !important;
          }
          .hero-content-grid > div:first-child {
            align-items: center;
            display: flex;
            flex-direction: column;
          }
          .hero-content-grid > div:first-child p {
            max-width: 100% !important;
          }
          .hero-stats-row {
            justify-content: center;
            gap: 24px !important;
          }
          .hero-panels {
            display: none !important;
          }
          .hero-price-axis {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
