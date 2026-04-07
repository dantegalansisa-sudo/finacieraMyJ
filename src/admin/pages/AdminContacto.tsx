import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { contacto as defaults } from '../../config/siteConfig';
import type { Contacto } from '../../config/siteConfigTypes';
import AdminCard from '../components/AdminCard';
import AdminInput from '../components/AdminInput';
import AdminSaveButton from '../components/AdminSaveButton';

export default function AdminContacto() {
  const [data, setData] = useState<Contacto>({ ...defaults });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoc(doc(db, 'siteConfig', 'contacto')).then((snap) => {
      if (snap.exists()) {
        setData({ ...defaults, ...snap.data() } as Contacto);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'siteConfig', 'contacto'), data);
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
        Información de Contacto
      </h1>
      <p style={{ fontSize: '15px', color: 'var(--text-body)', marginBottom: '32px' }}>
        Edita los datos de contacto que se muestran en toda la web.
      </p>

      <AdminCard title="WhatsApp y Teléfono">
        <AdminInput
          label="Número de WhatsApp"
          value={data.whatsappNumero}
          onChange={(v) => setData({ ...data, whatsappNumero: v })}
          type="tel"
          helperText="Sin guiones ni espacios, con código de país. Ej: 18294045264"
        />
        <AdminInput
          label="Teléfono (como se muestra en la web)"
          value={data.telefonoDisplay}
          onChange={(v) => setData({ ...data, telefonoDisplay: v })}
          helperText="Formato visual. Ej: (829) 404-5264"
        />
        <AdminInput
          label="Mensaje predeterminado de WhatsApp"
          value={data.whatsappMensaje}
          onChange={(v) => setData({ ...data, whatsappMensaje: v })}
          multiline
          helperText="El mensaje que aparece automáticamente cuando alguien hace clic en el botón de WhatsApp"
        />
      </AdminCard>

      <AdminCard title="Redes Sociales y Emails">
        <AdminInput
          label="Instagram (sin el @)"
          value={data.instagram}
          onChange={(v) => setData({ ...data, instagram: v })}
          helperText="Solo el nombre de usuario. Ej: grupofinancieromyj"
        />
        <AdminInput
          label="Email General"
          value={data.emailGeneral}
          onChange={(v) => setData({ ...data, emailGeneral: v })}
          type="email"
        />
        <AdminInput
          label="Email de Recursos Humanos"
          value={data.emailRRHH}
          onChange={(v) => setData({ ...data, emailRRHH: v })}
          type="email"
        />
      </AdminCard>

      <AdminCard title="Ubicación">
        <AdminInput
          label="Ubicación"
          value={data.ubicacion}
          onChange={(v) => setData({ ...data, ubicacion: v })}
          helperText="Dirección o zona general que se muestra en la web"
        />
      </AdminCard>

      <AdminSaveButton saving={saving} saved={saved} onClick={handleSave} />
    </div>
  );
}
