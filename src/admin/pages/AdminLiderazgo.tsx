import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { liderazgo as defaults } from '../../config/siteConfig';
import type { Liderazgo } from '../../config/siteConfigTypes';
import AdminCard from '../components/AdminCard';
import AdminInput from '../components/AdminInput';
import AdminSaveButton from '../components/AdminSaveButton';
import AdminImageUpload from '../components/AdminImageUpload';

export default function AdminLiderazgo() {
  const [data, setData] = useState<Liderazgo>({ ...defaults });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoc(doc(db, 'siteConfig', 'liderazgo')).then((snap) => {
      if (snap.exists()) {
        setData({ ...defaults, ...snap.data() } as Liderazgo);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'siteConfig', 'liderazgo'), data);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert('Error al guardar. Intente de nuevo.');
    }
    setSaving(false);
  };

  if (loading) return <p style={{ color: 'var(--text-muted)' }}>Cargando datos...</p>;

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-black)', marginBottom: '8px' }}>
        Liderazgo Ejecutivo
      </h1>
      <p style={{ fontSize: '15px', color: 'var(--text-body)', marginBottom: '32px' }}>
        Cambia la foto y datos del liderazgo que se muestran en la web.
      </p>

      <AdminCard title="Foto de Liderazgo">
        <AdminImageUpload
          label="Foto del presidente y vicepresidenta"
          currentUrl={data.foto}
          onUpload={(url) => setData({ ...data, foto: url })}
          storagePath="images/liderazgo/foto"
          helperText="Sube la foto de liderazgo. Formato: JPG, PNG o WebP. Máximo 5MB."
        />
      </AdminCard>

      <AdminCard title="Presidente">
        <AdminInput
          label="Nombre"
          value={data.presidente.nombre}
          onChange={(v) => setData({ ...data, presidente: { ...data.presidente, nombre: v } })}
        />
        <AdminInput
          label="Cargo"
          value={data.presidente.cargo}
          onChange={(v) => setData({ ...data, presidente: { ...data.presidente, cargo: v } })}
        />
        <AdminInput
          label="Biografía"
          value={data.presidente.bio}
          onChange={(v) => setData({ ...data, presidente: { ...data.presidente, bio: v } })}
          multiline
        />
      </AdminCard>

      <AdminCard title="Vicepresidenta">
        <AdminInput
          label="Nombre"
          value={data.vicepresidenta.nombre}
          onChange={(v) => setData({ ...data, vicepresidenta: { ...data.vicepresidenta, nombre: v } })}
        />
        <AdminInput
          label="Cargo"
          value={data.vicepresidenta.cargo}
          onChange={(v) => setData({ ...data, vicepresidenta: { ...data.vicepresidenta, cargo: v } })}
        />
        <AdminInput
          label="Biografía"
          value={data.vicepresidenta.bio}
          onChange={(v) => setData({ ...data, vicepresidenta: { ...data.vicepresidenta, bio: v } })}
          multiline
        />
      </AdminCard>

      <AdminSaveButton saving={saving} saved={saved} onClick={handleSave} />
    </div>
  );
}
