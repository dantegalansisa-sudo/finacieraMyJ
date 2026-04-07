interface AdminSaveButtonProps {
  saving: boolean;
  saved: boolean;
  onClick: () => void;
}

export default function AdminSaveButton({ saving, saved, onClick }: AdminSaveButtonProps) {
  const bg = saved ? 'var(--green-logo)' : 'var(--navy)';
  const text = saving ? 'Guardando...' : saved ? 'Guardado correctamente ✓' : 'Guardar Cambios';

  return (
    <button
      onClick={onClick}
      disabled={saving}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        height: '52px',
        padding: '0 32px',
        borderRadius: '14px',
        border: 'none',
        background: bg,
        color: 'white',
        fontSize: '15px',
        fontWeight: 600,
        fontFamily: 'Sora, sans-serif',
        cursor: saving ? 'wait' : 'pointer',
        opacity: saving ? 0.7 : 1,
        transition: 'all 0.3s',
        marginTop: '8px',
      }}
      onMouseEnter={(e) => {
        if (!saving && !saved) {
          e.currentTarget.style.background = 'var(--green-lime)';
          e.currentTarget.style.color = '#0A0A0A';
        }
      }}
      onMouseLeave={(e) => {
        if (!saving && !saved) {
          e.currentTarget.style.background = 'var(--navy)';
          e.currentTarget.style.color = 'white';
        }
      }}
    >
      {text}
    </button>
  );
}
