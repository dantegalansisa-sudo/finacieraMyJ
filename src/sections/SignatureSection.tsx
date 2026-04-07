import { motion, useInView } from 'framer-motion';
import { useRef, useState, useCallback, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { jsPDF } from 'jspdf';
import SectionLabel from '../components/SectionLabel';
import { firmaDigital, servicios, empresa } from '../config/siteConfig';
import { useSiteConfig } from '../hooks/useSiteConfig';

const SignatureSection = () => {
  const simuladorCuotas = useSiteConfig('simuladorCuotas');
  const contacto = useSiteConfig('contacto');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const sigPadRef = useRef<SignatureCanvas>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    nombre: '',
    cedula: '',
    montoSolicitado: '',
    tipoPrestamo: '',
  });
  const [signatureEmpty, setSignatureEmpty] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  /* Resize canvas to fill wrapper */
  const resizeCanvas = useCallback(() => {
    if (!canvasWrapperRef.current || !sigPadRef.current) return;
    const wrapper = canvasWrapperRef.current;
    const canvas = sigPadRef.current.getCanvas();
    const ratio = window.devicePixelRatio || 1;
    canvas.width = wrapper.offsetWidth * ratio;
    canvas.height = wrapper.offsetHeight * ratio;
    canvas.style.width = `${wrapper.offsetWidth}px`;
    canvas.style.height = `${wrapper.offsetHeight}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(ratio, ratio);
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    sigPadRef.current.clear();
    setSignatureEmpty(true);
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

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

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = 'var(--green-logo)';
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(124, 181, 24, 0.15)';
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = 'var(--border)';
    e.currentTarget.style.boxShadow = 'none';
  };

  const generatePDF = () => {
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'letter' });

    /* Header */
    pdf.setFontSize(22);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(13, 27, 42);
    pdf.text('GRUPO FINANCIERO M&J', 108, 25, { align: 'center' });

    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(74, 85, 104);
    pdf.text('Solicitud de Préstamo', 108, 33, { align: 'center' });

    /* Line */
    pdf.setDrawColor(124, 181, 24);
    pdf.setLineWidth(0.8);
    pdf.line(20, 38, 196, 38);

    /* Date */
    const today = new Date().toLocaleDateString('es-DO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    pdf.setFontSize(10);
    pdf.setTextColor(148, 163, 184);
    pdf.text(`Fecha: ${today}`, 196, 46, { align: 'right' });

    /* Section: Datos del solicitante */
    let y = 58;
    pdf.setFontSize(13);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(13, 27, 42);
    pdf.text('DATOS DEL SOLICITANTE', 20, y);

    y += 4;
    pdf.setDrawColor(226, 232, 240);
    pdf.setLineWidth(0.3);
    pdf.line(20, y, 196, y);

    y += 12;
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(74, 85, 104);

    const fields = [
      { label: 'Nombre completo', value: formData.nombre },
      { label: 'Cédula', value: formData.cedula },
      { label: 'Monto solicitado', value: `RD$ ${Number(formData.montoSolicitado).toLocaleString('es-DO')}` },
      { label: 'Tipo de préstamo', value: formData.tipoPrestamo },
    ];

    fields.forEach((field) => {
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(13, 27, 42);
      pdf.text(`${field.label}:`, 20, y);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(74, 85, 104);
      pdf.text(field.value, 75, y);
      y += 10;
    });

    /* Section: Firma */
    y += 10;
    pdf.setFontSize(13);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(13, 27, 42);
    pdf.text('FIRMA DEL SOLICITANTE', 20, y);

    y += 4;
    pdf.setDrawColor(226, 232, 240);
    pdf.line(20, y, 196, y);
    y += 8;

    /* Signature image */
    if (sigPadRef.current) {
      const signatureData = sigPadRef.current.getTrimmedCanvas().toDataURL('image/png');
      pdf.addImage(signatureData, 'PNG', 20, y, 80, 35);
    }

    y += 40;
    pdf.setDrawColor(13, 27, 42);
    pdf.setLineWidth(0.5);
    pdf.line(20, y, 100, y);

    y += 6;
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(74, 85, 104);
    pdf.text(formData.nombre, 20, y);

    y += 5;
    pdf.setFontSize(9);
    pdf.setTextColor(148, 163, 184);
    pdf.text(`Cédula: ${formData.cedula}`, 20, y);

    /* Footer */
    pdf.setDrawColor(124, 181, 24);
    pdf.setLineWidth(0.5);
    pdf.line(20, 245, 196, 245);

    pdf.setFontSize(8);
    pdf.setTextColor(148, 163, 184);
    pdf.text(firmaDigital.nota, 108, 252, { align: 'center', maxWidth: 170 });

    pdf.text(
      `WhatsApp: ${contacto.telefonoDisplay}  |  Instagram: @${contacto.instagram}  |  ${empresa.nombreCompleto}`,
      108, 260, { align: 'center' }
    );

    /* Save */
    const safeName = formData.nombre.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
    const dateStr = new Date().toISOString().split('T')[0];
    pdf.save(`Solicitud_Prestamo_MJ_${safeName}_${dateStr}.pdf`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sigPadRef.current?.isEmpty()) {
      alert('Por favor firma el documento antes de enviarlo.');
      return;
    }

    setIsSubmitting(true);
    try {
      generatePDF();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);

      /* Reset */
      setFormData({ nombre: '', cedula: '', montoSolicitado: '', tipoPrestamo: '' });
      sigPadRef.current?.clear();
      setSignatureEmpty(true);
    } catch {
      alert('Hubo un error al generar el PDF. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearSignature = () => {
    sigPadRef.current?.clear();
    const canvas = sigPadRef.current?.getCanvas();
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
    setSignatureEmpty(true);
  };

  return (
    <section
      id="firma-digital"
      ref={ref}
      style={{ background: 'var(--bg)', padding: '120px 0' }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ textAlign: 'center', marginBottom: '72px' }}
        >
          <SectionLabel text="FIRMA DIGITAL" />
          <h2
            style={{
              fontSize: 'clamp(36px, 4vw, 60px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              color: 'var(--text-black)',
            }}
          >
            {firmaDigital.titulo}
          </h2>
          <p
            style={{
              fontSize: '17px',
              color: 'var(--text-body)',
              lineHeight: 1.7,
              maxWidth: '560px',
              margin: '16px auto 0',
            }}
          >
            {firmaDigital.subtitulo}
          </p>
        </motion.div>

        {/* Form + Signature Pad */}
        <motion.form
          onSubmit={handleSubmit}
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
          <div className="signature-grid">
            {/* Left — Form fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-black)', marginBottom: '4px' }}>
                Datos del solicitante
              </h3>

              <div>
                <label style={labelStyle}>{firmaDigital.labelNombre}</label>
                <input
                  type="text"
                  required
                  style={inputStyle}
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder="Ej: Juan Pérez"
                />
              </div>

              <div>
                <label style={labelStyle}>{firmaDigital.labelCedula}</label>
                <input
                  type="text"
                  required
                  style={inputStyle}
                  value={formData.cedula}
                  onChange={(e) => setFormData({ ...formData, cedula: e.target.value })}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder="Ej: 001-1234567-8"
                />
              </div>

              <div>
                <label style={labelStyle}>{firmaDigital.labelMonto}</label>
                <select
                  required
                  style={{
                    ...inputStyle,
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%237CB518' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center',
                    paddingRight: '44px',
                  }}
                  value={formData.montoSolicitado}
                  onChange={(e) => setFormData({ ...formData, montoSolicitado: e.target.value })}
                  onFocus={handleFocus as any}
                  onBlur={handleBlur as any}
                >
                  <option value="">Seleccionar monto...</option>
                  {simuladorCuotas.montos.map((m) => (
                    <option key={m} value={m}>RD$ {m.toLocaleString('es-DO')}</option>
                  ))}
                  <option value="otro">Otro monto (a consultar)</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>{firmaDigital.labelTipoPrestamo}</label>
                <select
                  required
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
                  <option value="">Seleccionar tipo...</option>
                  {servicios.map((s) => (
                    <option key={s.name} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right — Signature Pad */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-black)', marginBottom: '16px' }}>
                Tu firma
              </h3>

              <div
                ref={canvasWrapperRef}
                style={{
                  position: 'relative',
                  background: 'white',
                  borderRadius: '16px',
                  border: signatureEmpty ? '2px dashed var(--border)' : '2px solid var(--green-logo)',
                  overflow: 'hidden',
                  height: '240px',
                  touchAction: 'none',
                  transition: 'border-color 0.2s',
                }}
              >
                <SignatureCanvas
                  ref={sigPadRef}
                  penColor="#0D1B2A"
                  minWidth={1.5}
                  maxWidth={3}
                  onEnd={() => setSignatureEmpty(false)}
                  canvasProps={{
                    style: {
                      width: '100%',
                      height: '100%',
                      cursor: 'crosshair',
                    },
                  }}
                />

                {signatureEmpty && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      color: 'var(--text-muted)',
                      fontSize: '14px',
                      pointerEvents: 'none',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span style={{ fontSize: '32px' }}>✍️</span>
                    {firmaDigital.signaturePlaceholder}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={clearSignature}
                style={{
                  alignSelf: 'flex-start',
                  marginTop: '12px',
                  padding: '8px 20px',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--text-body)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {firmaDigital.clearButtonText}
              </button>

              {/* Info note */}
              <div
                style={{
                  marginTop: '20px',
                  padding: '16px',
                  background: 'var(--bg)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                }}
              >
                <span style={{ fontSize: '18px', flexShrink: 0 }}>🔒</span>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {firmaDigital.nota}
                </p>
              </div>
            </div>
          </div>

          {/* Submit button */}
          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <button
              type="submit"
              className="btn-black"
              disabled={isSubmitting}
              style={{
                width: '100%',
                maxWidth: '400px',
                justifyContent: 'center',
                padding: '18px 32px',
                fontSize: '16px',
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
              }}
            >
              {isSubmitting ? 'Generando PDF...' : firmaDigital.submitButtonText}
            </button>
          </div>

          {/* Success message */}
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                marginTop: '20px',
                padding: '16px 24px',
                background: 'rgba(124, 181, 24, 0.1)',
                border: '1px solid rgba(124, 181, 24, 0.3)',
                borderRadius: '14px',
                textAlign: 'center',
                fontSize: '15px',
                fontWeight: 600,
                color: 'var(--green-logo)',
              }}
            >
              ✅ PDF generado exitosamente. Revisa tu carpeta de descargas.
            </motion.div>
          )}
        </motion.form>
      </div>

      <style>{`
        .signature-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }
        @media (max-width: 768px) {
          .signature-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          section#firma-digital {
            padding: 72px 0 !important;
          }
          section#firma-digital form {
            padding: 32px 20px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default SignatureSection;
