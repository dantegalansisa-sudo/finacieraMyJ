import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { equipoTrabajo as defaults } from '../../config/siteConfig';
import type { MiembroEquipo } from '../../config/siteConfigTypes';
import AdminCard from '../components/AdminCard';
import AdminInput from '../components/AdminInput';
import AdminSaveButton from '../components/AdminSaveButton';
import AdminImageUpload from '../components/AdminImageUpload';

function slugify(name: string): string {
  return name.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function AdminEquipo() {
  const [miembros, setMiembros] = useState<MiembroEquipo[]>([...defaults.miembros]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoc(doc(db, 'siteConfig', 'equipoTrabajo')).then((snap) => {
      if (snap.exists()) {
        const d = snap.data();
        if (d.miembros) setMiembros(d.miembros);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const updateMember = (index: number, field: keyof MiembroEquipo, value: string) => {
    setMiembros((prev) => prev.map((m, i) => i === index ? { ...m, [field]: value } : m));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'siteConfig', 'equipoTrabajo'), { miembros });
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
        Equipo de Trabajo
      </h1>
      <p style={{ fontSize: '15px', color: 'var(--text-body)', marginBottom: '32px' }}>
        Cambia las fotos y datos del equipo que se muestran en la web.
      </p>

      {miembros.map((m, i) => (
        <AdminCard key={i} title={m.nombre}>
          <AdminImageUpload
            label="Foto del miembro"
            currentUrl={m.foto}
            onUpload={(url) => updateMember(i, 'foto', url)}
            storagePath={`images/equipo/${slugify(m.nombre)}`}
            helperText="Sube una foto cuadrada. Formato: JPG, PNG o WebP. Máximo 5MB."
            circular
          />
          <AdminInput
            label="Nombre"
            value={m.nombre}
            onChange={(v) => updateMember(i, 'nombre', v)}
          />
          <AdminInput
            label="Cargo"
            value={m.cargo}
            onChange={(v) => updateMember(i, 'cargo', v)}
          />
          <AdminInput
            label="Departamento"
            value={m.departamento}
            onChange={(v) => updateMember(i, 'departamento', v)}
          />
          <AdminInput
            label="Descripción"
            value={m.descripcion}
            onChange={(v) => updateMember(i, 'descripcion', v)}
            multiline
          />
        </AdminCard>
      ))}

      <AdminSaveButton saving={saving} saved={saved} onClick={handleSave} />
    </div>
  );
}
