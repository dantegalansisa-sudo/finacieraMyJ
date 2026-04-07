import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase/useAuth';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch {
      setError('Email o contraseña incorrectos');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg)',
      fontFamily: 'Sora, sans-serif',
      padding: '24px',
    }}>
      <form onSubmit={handleSubmit} style={{
        background: 'white',
        borderRadius: '28px',
        padding: '48px 40px',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.10)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            fontSize: '32px',
            fontWeight: 800,
            color: 'var(--navy)',
            letterSpacing: '-0.03em',
          }}>
            M&J
          </div>
          <div style={{
            fontSize: '13px',
            color: 'var(--text-muted)',
            fontWeight: 500,
            marginTop: '4px',
          }}>
            Panel de Administración
          </div>
        </div>

        {error && (
          <div style={{
            background: '#FEF2F2',
            border: '1px solid #FECACA',
            color: '#DC2626',
            borderRadius: '12px',
            padding: '12px 16px',
            fontSize: '14px',
            marginBottom: '24px',
            textAlign: 'center',
          }}>
            {error}
          </div>
        )}

        {/* Email */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--text-black)',
            marginBottom: '8px',
          }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              height: '52px',
              borderRadius: '12px',
              border: '1.5px solid var(--border)',
              background: 'var(--bg)',
              padding: '0 16px',
              fontSize: '15px',
              fontFamily: 'Sora, sans-serif',
              outline: 'none',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box',
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = 'var(--green-logo)'}
            onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: '28px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--text-black)',
            marginBottom: '8px',
          }}>
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              height: '52px',
              borderRadius: '12px',
              border: '1.5px solid var(--border)',
              background: 'var(--bg)',
              padding: '0 16px',
              fontSize: '15px',
              fontFamily: 'Sora, sans-serif',
              outline: 'none',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box',
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = 'var(--green-logo)'}
            onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            height: '52px',
            borderRadius: '14px',
            border: 'none',
            background: 'var(--navy)',
            color: 'white',
            fontSize: '15px',
            fontWeight: 600,
            fontFamily: 'Sora, sans-serif',
            cursor: loading ? 'wait' : 'pointer',
            opacity: loading ? 0.7 : 1,
            transition: 'background 0.2s, opacity 0.2s',
          }}
          onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = 'var(--green-lime)'; e.currentTarget.style.color = '#0A0A0A'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--navy)'; e.currentTarget.style.color = 'white'; }}
        >
          {loading ? 'Ingresando...' : 'Iniciar Sesión'}
        </button>

        <p style={{
          textAlign: 'center',
          fontSize: '12px',
          color: 'var(--text-muted)',
          marginTop: '24px',
        }}>
          Grupo Financiero M&J — Acceso exclusivo para administradores
        </p>
      </form>
    </div>
  );
}
