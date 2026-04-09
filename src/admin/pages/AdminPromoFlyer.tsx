import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { promoFlyer as defaults } from '../../config/siteConfig';
import type { PromoFlyer } from '../../config/siteConfigTypes';
import AdminCard from '../components/AdminCard';
import AdminSaveButton from '../components/AdminSaveButton';
import AdminImageUpload from '../components/AdminImageUpload';

export default function AdminPromoFlyer() {
  const [data, setData] = useState<PromoFlyer>({ ...defaults });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoc(doc(db, 'siteConfig', 'promoFlyer')).then((snap) => {
      if (snap.exists()) {
        setData({ ...defaults, ...snap.data() } as PromoFlyer);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'siteConfig', 'promoFlyer'), data);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: unknown) {
      console.error('FIRESTORE SAVE ERROR:', err);
      const msg = err instanceof Error ? err.message : String(err);
      alert('Error al guardar: ' + msg);
    }
    setSaving(false);
  };

  if (loading) return <p style={{ color: 'var(--text-muted)' }}>Cargando datos...</p>;

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-black)', marginBottom: '8px' }}>
        Flyer Promocional
      </h1>
      <p style={{ fontSize: '15px', color: 'var(--text-body)', marginBottom: '32px' }}>
        Sube un flyer cuando tengas una promocion activa. Se mostrara en la web automaticamente.
      </p>

      <AdminCard title="Estado de la Promocion">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => setData({ ...data, activo: !data.activo })}
            style={{
              position: 'relative',
              width: '56px',
              height: '30px',
              borderRadius: '50px',
              border: 'none',
              cursor: 'pointer',
              background: data.activo ? 'var(--green-logo)' : 'var(--border)',
              transition: 'background 0.2s',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '3px',
                left: data.activo ? '29px' : '3px',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'white',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                transition: 'left 0.2s',
              }}
            />
          </button>
          <div>
            <span style={{
              fontSize: '15px',
              fontWeight: 600,
              color: data.activo ? 'var(--green-logo)' : 'var(--text-muted)',
            }}>
              {data.activo ? 'Promocion ACTIVA' : 'Promocion INACTIVA'}
            </span>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
              {data.activo
                ? 'El flyer se esta mostrando en la web'
                : 'El flyer NO se muestra en la web'}
            </p>
          </div>
        </div>
      </AdminCard>

      <AdminCard title="Imagen del Flyer">
        <AdminImageUpload
          label="Flyer promocional"
          currentUrl={data.imagenUrl}
          onUpload={(url) => setData({ ...data, imagenUrl: url })}
          storagePath="images/promo/flyer"
          helperText="Sube una imagen en formato 16:9 (horizontal). Formato: JPG, PNG o WebP. Maximo 5MB."
        />

        {data.imagenUrl && (
          <div style={{ marginTop: '16px' }}>
            <p style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--text-body)',
              marginBottom: '8px',
            }}>
              Preview:
            </p>
            <div style={{
              maxWidth: '500px',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1.5px solid var(--border)',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <img
                src={data.imagenUrl}
                alt="Preview del flyer"
                style={{
                  width: '100%',
                  aspectRatio: '16/9',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
          </div>
        )}
      </AdminCard>

      <AdminSaveButton saving={saving} saved={saved} onClick={handleSave} />
    </div>
  );
}
