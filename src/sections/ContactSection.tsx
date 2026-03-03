import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import SectionLabel from '../components/SectionLabel';

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    tipoPrestamo: '',
    monto: '',
    mensaje: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hola, soy ${formData.nombre}. Me interesa un ${formData.tipoPrestamo || 'préstamo'} por ${formData.monto || 'un monto a consultar'}. ${formData.mensaje}`.trim();
    window.open(
      `https://wa.me/18297881795?text=${encodeURIComponent(msg)}`,
      '_blank'
    );
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    height: '52px',
    borderRadius: '12px',
    border: '1px solid var(--border)',
    background: 'var(--bg)',
    padding: '0 16px',
    fontSize: '15px',
    fontFamily: "'Sora', sans-serif",
    color: 'var(--text-black)',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--text-black)',
    marginBottom: '6px',
    display: 'block',
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'var(--green-logo)';
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(124, 181, 24, 0.15)';
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'var(--border)';
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <section
      id="contacto"
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
          style={{ textAlign: 'center', marginBottom: '72px' }}
        >
          <SectionLabel text="CONTACTO" />
          <h2
            style={{
              fontSize: 'clamp(36px, 4vw, 60px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              color: 'var(--text-black)',
            }}
          >
            ¿Listo para resolver
            <br />
            lo que te preocupa?
          </h2>
        </motion.div>

        {/* Two cards */}
        <div className="contact-grid">
          {/* Left — Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            style={{
              background: 'var(--navy)',
              borderRadius: '28px',
              padding: '48px 40px',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* Logo */}
            <div>
              <div style={{ marginBottom: '32px' }}>
                <span style={{ fontSize: '32px', fontWeight: 800 }}>M&J</span>
                <span
                  style={{
                    display: 'block',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.5)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    marginTop: '4px',
                  }}
                >
                  Grupo Financiero
                </span>
              </div>

              <p
                style={{
                  fontSize: '16px',
                  lineHeight: 1.7,
                  color: 'rgba(255,255,255,0.7)',
                  marginBottom: '36px',
                }}
              >
                Soluciones financieras reales para familias dominicanas.
                Contáctanos y te respondemos al instante.
              </p>

              {/* Contact info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '36px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      background: 'rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px',
                      flexShrink: 0,
                    }}
                  >
                    📱
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>WhatsApp</p>
                    <p style={{ fontSize: '15px', fontWeight: 600 }}>+1 (829) 788-1795</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      background: 'rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px',
                      flexShrink: 0,
                    }}
                  >
                    📸
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Instagram</p>
                    <p style={{ fontSize: '15px', fontWeight: 600 }}>@grupofinancieromyj</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      background: 'rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px',
                      flexShrink: 0,
                    }}
                  >
                    📍
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Ubicación</p>
                    <p style={{ fontSize: '15px', fontWeight: 600 }}>República Dominicana</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href="https://wa.me/18297881795?text=Hola%2C%20me%20interesa%20un%20pr%C3%A9stamo%20con%20Grupo%20Financiero%20M%26J"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                padding: '16px',
                borderRadius: '14px',
                background: 'var(--green-lime)',
                color: '#0A0A0A',
                fontWeight: 700,
                fontSize: '15px',
                transition: 'transform 0.2s',
              }}
            >
              Escríbenos por WhatsApp →
            </a>
          </motion.div>

          {/* Right — Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            style={{
              background: 'white',
              borderRadius: '28px',
              padding: '48px 40px',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <h3
              style={{
                fontSize: '22px',
                fontWeight: 700,
                color: 'var(--text-black)',
                marginBottom: '28px',
              }}
            >
              Solicita tu préstamo
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={labelStyle}>Nombre completo</label>
                <input
                  type="text"
                  required
                  style={inputStyle}
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              <div>
                <label style={labelStyle}>Teléfono / WhatsApp</label>
                <input
                  type="tel"
                  required
                  style={inputStyle}
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              <div>
                <label style={labelStyle}>Tipo de préstamo</label>
                <select
                  style={{
                    ...inputStyle,
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%237CB518' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center',
                    paddingRight: '44px',
                  }}
                  value={formData.tipoPrestamo}
                  onChange={(e) => setFormData({ ...formData, tipoPrestamo: e.target.value })}
                  onFocus={handleFocus as any}
                  onBlur={handleBlur as any}
                >
                  <option value="">Seleccionar...</option>
                  <option value="Préstamo Personal">Préstamo Personal</option>
                  <option value="Préstamo Hipotecario">Préstamo Hipotecario</option>
                  <option value="Préstamo Prendario">Préstamo Prendario</option>
                  <option value="Préstamo Comercial">Préstamo Comercial</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Monto aproximado</label>
                <input
                  type="text"
                  style={inputStyle}
                  placeholder="Ej: RD$ 25,000"
                  value={formData.monto}
                  onChange={(e) => setFormData({ ...formData, monto: e.target.value })}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              <div>
                <label style={labelStyle}>Mensaje (opcional)</label>
                <textarea
                  style={{
                    ...inputStyle,
                    height: '100px',
                    paddingTop: '14px',
                    resize: 'none',
                  }}
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  onFocus={handleFocus as any}
                  onBlur={handleBlur as any}
                />
              </div>

              <button
                type="submit"
                className="btn-black"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '16px',
                  fontSize: '16px',
                  marginTop: '4px',
                }}
              >
                Enviar solicitud →
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: stretch;
        }
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          section#contacto { padding: 72px 0 !important; }
        }
      `}</style>
    </section>
  );
};

export default ContactSection;
