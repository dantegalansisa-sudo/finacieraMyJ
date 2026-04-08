import { useRef, useState } from 'react';
import { uploadImage } from '../../firebase/uploadImage';

interface AdminImageUploadProps {
  label: string;
  currentUrl: string;
  onUpload: (url: string) => void;
  storagePath: string;
  helperText?: string;
  circular?: boolean;
}

export default function AdminImageUpload({
  label,
  currentUrl,
  onUpload,
  storagePath,
  helperText,
  circular = false,
}: AdminImageUploadProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen no puede pesar más de 5MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Solo se permiten archivos de imagen');
      return;
    }

    setError('');
    setPreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      const url = await uploadImage(storagePath, file);
      onUpload(url);
    } catch {
      setError('Error al subir la imagen. Intente de nuevo.');
      setPreview(null);
    }

    setUploading(false);
  };

  const displayUrl = preview || currentUrl;
  const size = circular ? 120 : 200;

  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{
        display: 'block',
        fontSize: '14px',
        fontWeight: 600,
        color: 'var(--text-black)',
        marginBottom: '12px',
      }}>
        {label}
      </label>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Preview */}
        <div style={{
          width: size,
          height: circular ? size : size * 1.25,
          borderRadius: circular ? '50%' : '16px',
          overflow: 'hidden',
          border: '2px solid var(--border)',
          background: 'var(--bg)',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {displayUrl ? (
            <img
              src={displayUrl}
              alt={label}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <span style={{ fontSize: '40px', opacity: 0.3 }}>📷</span>
          )}
        </div>

        {/* Controls */}
        <div>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFile}
            style={{ display: 'none' }}
          />

          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            style={{
              background: uploading ? 'var(--border)' : 'var(--green-lime)',
              color: 'var(--text-black)',
              border: 'none',
              borderRadius: '50px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: uploading ? 'wait' : 'pointer',
              fontFamily: 'Sora, sans-serif',
              transition: 'all 0.2s',
            }}
          >
            {uploading ? 'Subiendo...' : 'Cambiar foto'}
          </button>

          {error && (
            <p style={{ fontSize: '13px', color: '#e53e3e', marginTop: '8px' }}>
              {error}
            </p>
          )}

          {preview && !uploading && !error && (
            <p style={{ fontSize: '13px', color: 'var(--green-logo)', marginTop: '8px', fontWeight: 600 }}>
              Foto subida correctamente
            </p>
          )}
        </div>
      </div>

      {helperText && (
        <p style={{
          fontSize: '12px',
          color: 'var(--text-muted)',
          marginTop: '8px',
          lineHeight: 1.4,
        }}>
          {helperText}
        </p>
      )}
    </div>
  );
}
