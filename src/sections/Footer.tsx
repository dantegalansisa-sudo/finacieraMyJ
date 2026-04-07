import { useState } from 'react';
import { empresa, servicios } from '../config/siteConfig';
import { useSiteConfig } from '../hooks/useSiteConfig';

const Footer = () => {
  const contacto = useSiteConfig('contacto');
  const footerLinks = servicios.map((s) => ({ label: s.name, href: '#servicios' }));
  const [showPrivacy, setShowPrivacy] = useState(false);
  return (
    <footer
      style={{
        background: 'var(--navy)',
        borderTop: '2px solid var(--green-lime)',
        padding: '64px 0 32px',
      }}
    >
      <div className="container footer-grid">
        {/* Col 1 — Logo */}
        <div>
          <div style={{ marginBottom: '16px' }}>
            <img
              src="/images/logo.png"
              alt={empresa.nombreCompleto}
              style={{
                height: '56px',
                width: 'auto',
                objectFit: 'contain',
                borderRadius: '8px',
                background: 'white',
                padding: '6px 10px',
              }}
            />
          </div>
          <p
            style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.6,
              maxWidth: '280px',
            }}
          >
            {empresa.descripcionCorta}
          </p>
        </div>

        {/* Col 2 — Services */}
        <div>
          <h4
            style={{
              fontSize: '14px',
              fontWeight: 700,
              color: 'white',
              marginBottom: '20px',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            Servicios
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {footerLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.5)',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--green-lime)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Contact */}
        <div>
          <h4
            style={{
              fontSize: '14px',
              fontWeight: 700,
              color: 'white',
              marginBottom: '20px',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            Contacto
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li>
              <a
                href={`https://wa.me/${contacto.whatsappNumero}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--green-lime)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              >
                {contacto.telefonoDisplay}
              </a>
            </li>
            <li>
              <a
                href={`https://instagram.com/${contacto.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.5)',
                  transition: 'color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--green-lime)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              >
                {/* Instagram icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                @{contacto.instagram}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contacto.emailGeneral}`}
                style={{
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.5)',
                  transition: 'color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--green-lime)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {contacto.emailGeneral}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contacto.emailRRHH}`}
                style={{
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.5)',
                  transition: 'color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--green-lime)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {contacto.emailRRHH}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom copyright */}
      <div
        className="container"
        style={{
          marginTop: '48px',
          paddingTop: '24px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>
          © {new Date().getFullYear()} {empresa.copyright}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setShowPrivacy(true)}
            style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.4)',
              background: 'none',
              padding: 0,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--green-lime)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
          >
            Política de Privacidad
          </button>
          <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}>
            {empresa.creditoDiseno}
          </p>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowPrivacy(false); }}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '24px',
              maxWidth: '720px',
              width: '100%',
              maxHeight: '80vh',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '28px 32px',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexShrink: 0,
              }}
            >
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-black)' }}>
                Política de Privacidad
              </h3>
              <button
                onClick={() => setShowPrivacy(false)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  color: 'var(--text-body)',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--border)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--bg)')}
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div
              style={{
                padding: '32px',
                overflowY: 'auto',
                fontSize: '14px',
                color: 'var(--text-body)',
                lineHeight: 1.8,
              }}
            >
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' }}>
                Última actualización: {new Date().toLocaleDateString('es-DO', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>

              <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-black)', marginBottom: '8px' }}>
                1. Información que recopilamos
              </h4>
              <p style={{ marginBottom: '20px' }}>
                {empresa.nombreCompleto} recopila información personal que usted nos proporciona voluntariamente al solicitar nuestros servicios financieros, incluyendo: nombre completo, número de cédula de identidad, número de teléfono, dirección de correo electrónico, información laboral y datos financieros necesarios para evaluar su solicitud de préstamo.
              </p>

              <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-black)', marginBottom: '8px' }}>
                2. Uso de la información
              </h4>
              <p style={{ marginBottom: '20px' }}>
                La información recopilada se utiliza exclusivamente para: evaluar solicitudes de préstamo, comunicarnos con usted respecto a su solicitud, gestionar su cuenta y pagos, cumplir con requisitos legales y regulatorios, y mejorar nuestros servicios.
              </p>

              <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-black)', marginBottom: '8px' }}>
                3. Protección de datos
              </h4>
              <p style={{ marginBottom: '20px' }}>
                Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción. Su información se almacena de forma segura y solo el personal autorizado tiene acceso a ella.
              </p>

              <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-black)', marginBottom: '8px' }}>
                4. Compartir información
              </h4>
              <p style={{ marginBottom: '20px' }}>
                No vendemos, alquilamos ni compartimos su información personal con terceros, excepto cuando sea necesario para: cumplir con la ley o una orden judicial, proteger nuestros derechos legales, o con su consentimiento explícito.
              </p>

              <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-black)', marginBottom: '8px' }}>
                5. Firma digital
              </h4>
              <p style={{ marginBottom: '20px' }}>
                Los documentos firmados digitalmente a través de nuestra plataforma tienen validez como solicitud preliminar. La firma digital que usted proporciona se utiliza únicamente para la solicitud de préstamo y se almacena de forma segura.
              </p>

              <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-black)', marginBottom: '8px' }}>
                6. Derechos del usuario
              </h4>
              <p style={{ marginBottom: '20px' }}>
                Usted tiene derecho a: acceder a su información personal, solicitar la corrección de datos inexactos, solicitar la eliminación de sus datos (cuando no exista una obligación legal de retención), y retirar su consentimiento en cualquier momento.
              </p>

              <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-black)', marginBottom: '8px' }}>
                7. Contacto
              </h4>
              <p style={{ marginBottom: '8px' }}>
                Para consultas sobre esta política de privacidad o para ejercer sus derechos, puede contactarnos a través de:
              </p>
              <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
                <li>Email: {contacto.emailGeneral}</li>
                <li>WhatsApp: {contacto.telefonoDisplay}</li>
                <li>Instagram: @{contacto.instagram}</li>
              </ul>

              <div
                style={{
                  background: 'var(--bg)',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  marginTop: '12px',
                }}
              >
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  {empresa.nombreCompleto} se reserva el derecho de actualizar esta política de privacidad en cualquier momento. Los cambios serán publicados en esta página.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          gap: 48px;
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
