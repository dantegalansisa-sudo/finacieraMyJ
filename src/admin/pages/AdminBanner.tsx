import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { urgencyBanner as defaults } from '../../config/siteConfig';
import type { UrgencyBanner } from '../../config/siteConfigTypes';
import AdminCard from '../components/AdminCard';
import AdminInput from '../components/AdminInput';
import AdminSaveButton from '../components/AdminSaveButton';

export default function AdminBanner() {
  const [data, setData] = useState<UrgencyBanner>({ ...defaults });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoc(doc(db, 'siteConfig', 'urgencyBanner')).then((snap) => {
      if (snap.exists()) {
        setData({ ...defaults, ...snap.data() } as UrgencyBanner);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'siteConfig', 'urgencyBanner'), data);
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
        Banner Promocional
      </h1>
      <p style={{ fontSize: '15px', color: 'var(--text-body)', marginBottom: '32px' }}>
        Edita el texto de la barra verde promocional que aparece arriba de la web.
      </p>

      <AdminCard title="Textos del Banner">
        <AdminInput
          label="Texto antes del mes"
          value={data.textoAntes}
          onChange={(v) => setData({ ...data, textoAntes: v })}
          helperText="El mes actual se agrega automáticamente después de este texto. Ej: 'Tasa especial este mes de'"
        />
        <AdminInput
          label="Texto después del mes"
          value={data.textoDespues}
          onChange={(v) => setData({ ...data, textoDespues: v })}
          multiline
          helperText="Descripción de la promoción que aparece debajo"
        />
        <AdminInput
          label="Texto del botón"
          value={data.botonTexto}
          onChange={(v) => setData({ ...data, botonTexto: v })}
          helperText="Ej: 'Aprovechar →'"
        />
      </AdminCard>

      <AdminCard title="Mensaje de WhatsApp">
        <AdminInput
          label="Mensaje de WhatsApp para la promo"
          value={data.whatsappMensaje}
          onChange={(v) => setData({ ...data, whatsappMensaje: v })}
          multiline
          helperText="Cuando alguien hace clic en el botón del banner, se envía este mensaje por WhatsApp"
        />
      </AdminCard>

      <AdminSaveButton saving={saving} saved={saved} onClick={handleSave} />
    </div>
  );
}
