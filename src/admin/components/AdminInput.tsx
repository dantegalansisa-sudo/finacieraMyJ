interface AdminInputProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'number' | 'tel';
  helperText?: string;
  multiline?: boolean;
  placeholder?: string;
}

export default function AdminInput({
  label,
  value,
  onChange,
  type = 'text',
  helperText,
  multiline = false,
  placeholder,
}: AdminInputProps) {
  const sharedStyle: React.CSSProperties = {
    width: '100%',
    borderRadius: '12px',
    border: '1.5px solid var(--border)',
    background: 'var(--bg)',
    padding: multiline ? '14px 16px' : '0 16px',
    fontSize: '15px',
    fontFamily: 'Sora, sans-serif',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
    color: 'var(--text-black)',
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{
        display: 'block',
        fontSize: '14px',
        fontWeight: 600,
        color: 'var(--text-black)',
        marginBottom: '8px',
      }}>
        {label}
      </label>

      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          style={{ ...sharedStyle, resize: 'vertical', minHeight: '80px' }}
          onFocus={(e) => e.currentTarget.style.borderColor = 'var(--green-logo)'}
          onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ ...sharedStyle, height: '52px' }}
          onFocus={(e) => e.currentTarget.style.borderColor = 'var(--green-logo)'}
          onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
        />
      )}

      {helperText && (
        <p style={{
          fontSize: '12px',
          color: 'var(--text-muted)',
          marginTop: '6px',
          lineHeight: 1.4,
        }}>
          {helperText}
        </p>
      )}
    </div>
  );
}
