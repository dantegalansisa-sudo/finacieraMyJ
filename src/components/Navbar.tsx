import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { empresa } from '../config/siteConfig';
import { useSiteConfig } from '../hooks/useSiteConfig';

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'CEO', href: '#ceo' },
  { label: 'Préstamos', href: '#prestamos' },
  { label: 'Firma Digital', href: '#firma-digital' },
  { label: 'Equipo', href: '#equipo' },
  { label: 'Contacto', href: '#contacto' },
];

const Navbar = () => {
  const contacto = useSiteConfig('contacto');
  const whatsappUrl = `https://wa.me/${contacto.whatsappNumero}?text=${encodeURIComponent(contacto.whatsappMensaje)}`;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileOpen]);

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        height: '72px',
        background: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(12px)',
        boxShadow: scrolled ? '0 1px 20px rgba(0,0,0,0.06)' : 'none',
        zIndex: 110,
        transition: 'all 0.3s ease',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        {/* Logo */}
        <a href="#inicio" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/images/logo.png"
            alt={empresa.nombreCompleto}
            style={{
              height: '48px',
              width: 'auto',
              objectFit: 'contain',
            }}
          />
        </a>

        {/* Desktop Links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}
          className="nav-links-desktop"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--text-body)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-black)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-body)')}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-cta-desktop"
          whileHover={{ scale: 1.03, backgroundColor: '#0D1B2A', color: '#FFFFFF' }}
          style={{
            background: '#BCFF4F',
            color: '#0A0A0A',
            borderRadius: '50px',
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s',
          }}
        >
          Solicitar Préstamo <span>→</span>
        </motion.a>

        {/* Mobile Hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: 'none',
            background: 'none',
            width: '40px',
            height: '40px',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '5px',
          }}
          aria-label="Abrir menú"
        >
          <span
            style={{
              width: '24px',
              height: '2px',
              background: 'var(--navy)',
              borderRadius: '2px',
              transition: 'all 0.3s',
              transform: mobileOpen ? 'rotate(45deg) translateY(7px)' : 'none',
            }}
          />
          <span
            style={{
              width: '24px',
              height: '2px',
              background: 'var(--navy)',
              borderRadius: '2px',
              transition: 'all 0.3s',
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              width: '24px',
              height: '2px',
              background: 'var(--navy)',
              borderRadius: '2px',
              transition: 'all 0.3s',
              transform: mobileOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: '72px',
              right: 0,
              bottom: 0,
              width: '280px',
              background: 'white',
              boxShadow: '-10px 0 40px rgba(0,0,0,0.1)',
              padding: '32px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              zIndex: 99,
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontSize: '16px',
                  fontWeight: 500,
                  color: 'var(--text-body)',
                  padding: '12px 0',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-black"
              style={{ marginTop: '16px', justifyContent: 'center' }}
              onClick={() => setMobileOpen(false)}
            >
              Solicitar Préstamo →
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive CSS embedded via style tag */}
      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-cta-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
