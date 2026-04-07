import { motion, useInView } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';
import SectionLabel from '../components/SectionLabel';
import { useSiteConfig } from '../hooks/useSiteConfig';

const formatRD = (n: number) =>
  'RD$ ' + n.toLocaleString('es-DO', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

const CalculatorSection = () => {
  const calculadora = useSiteConfig('calculadora');
  const MIN = calculadora.montoMinimo;
  const MAX = calculadora.montoMaximo;
  const STEP = calculadora.incremento;
  const RATE_TOTAL_SEMANAL = calculadora.tasaTotalSemanal;
  const RATE_MENSUAL = calculadora.tasaMensual;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [monto, setMonto] = useState(calculadora.montoInicial);

  const cuotas = useMemo(() => {
    return calculadora.planes.map((plan) => {
      const total =
        plan.freq === 'Semanal'
          ? monto * (1 + RATE_TOTAL_SEMANAL)
          : monto * (1 + RATE_MENSUAL * plan.periods);
      const cuota = total / plan.periods;
      return {
        ...plan,
        cuota: Math.floor(cuota),
        total: Math.floor(total),
      };
    });
  }, [monto]);

  // Slider percentage for track fill
  const pct = ((monto - MIN) / (MAX - MIN)) * 100;

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--bg-white)',
        padding: '120px 0',
      }}
    >
      <div className="container" style={{ maxWidth: '880px' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <SectionLabel text="CALCULADORA" />
          <h2
            style={{
              fontSize: 'clamp(36px, 4vw, 60px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              color: 'var(--text-black)',
            }}
          >
            Calcula tu cuota
            <br />
            en tiempo real.
          </h2>
        </motion.div>

        {/* Calculator Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
          style={{
            background: 'white',
            borderRadius: '28px',
            padding: '48px 40px',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          {/* Amount display */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '8px' }}>
              Monto del préstamo
            </p>
            <p
              style={{
                fontSize: 'clamp(40px, 5vw, 56px)',
                fontWeight: 800,
                color: 'var(--text-black)',
                letterSpacing: '-0.04em',
                lineHeight: 1,
              }}
            >
              {formatRD(monto)}
            </p>
          </div>

          {/* Slider */}
          <div style={{ position: 'relative', margin: '0 auto 40px', maxWidth: '600px' }}>
            <input
              type="range"
              min={MIN}
              max={MAX}
              step={STEP}
              value={monto}
              onChange={(e) => setMonto(Number(e.target.value))}
              className="calc-slider"
              style={{ width: '100%' }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '8px',
              }}
            >
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{formatRD(MIN)}</span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{formatRD(MAX)}</span>
            </div>
          </div>

          {/* Results Grid */}
          <div className="calc-results">
            {cuotas.map((c, i) => (
              <div
                key={c.label}
                style={{
                  background: i === 0 ? 'var(--navy)' : 'var(--bg)',
                  borderRadius: '20px',
                  padding: '28px 24px',
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                }}
              >
                <p
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: i === 0 ? 'rgba(255,255,255,0.5)' : 'var(--text-muted)',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    marginBottom: '4px',
                  }}
                >
                  {c.freq}
                </p>
                <p
                  style={{
                    fontSize: '13px',
                    color: i === 0 ? 'rgba(255,255,255,0.7)' : 'var(--text-body)',
                    marginBottom: '16px',
                  }}
                >
                  {c.label}
                </p>
                <p
                  style={{
                    fontSize: '28px',
                    fontWeight: 800,
                    color: i === 0 ? 'var(--green-lime)' : 'var(--green-logo)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                    marginBottom: '6px',
                  }}
                >
                  {formatRD(c.cuota)}
                </p>
                <p
                  style={{
                    fontSize: '11px',
                    color: i === 0 ? 'rgba(255,255,255,0.4)' : 'var(--text-muted)',
                  }}
                >
                  Total: {formatRD(c.total)}
                </p>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <p
            style={{
              fontSize: '12px',
              color: 'var(--text-muted)',
              textAlign: 'center',
              marginTop: '24px',
              lineHeight: 1.5,
            }}
          >
            * Cuotas aproximadas. El monto final depende de la evaluación crediticia.
            Tasas sujetas a cambio sin previo aviso.
          </p>
        </motion.div>
      </div>

      <style>{`
        .calc-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 8px;
          border-radius: 4px;
          background: linear-gradient(
            to right,
            var(--green-logo) 0%,
            var(--green-logo) ${pct}%,
            var(--border) ${pct}%,
            var(--border) 100%
          );
          outline: none;
          cursor: pointer;
        }
        .calc-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--green-lime);
          border: 3px solid var(--green-logo);
          cursor: grab;
          box-shadow: 0 4px 12px rgba(124,181,24,0.3);
          transition: transform 0.15s;
        }
        .calc-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        .calc-slider::-moz-range-thumb {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--green-lime);
          border: 3px solid var(--green-logo);
          cursor: grab;
          box-shadow: 0 4px 12px rgba(124,181,24,0.3);
        }
        .calc-results {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 640px) {
          .calc-results { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default CalculatorSection;
