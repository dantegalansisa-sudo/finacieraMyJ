import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { estadisticas as defaults } from '../../config/siteConfig';
import type { Estadistica } from '../../config/siteConfigTypes';
import AdminCard from '../components/AdminCard';
import AdminSaveButton from '../components/AdminSaveButton';

export default function AdminEstadisticas() {
  const [items, setItems] = useState<Estadistica[]>([...defaults]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoc(doc(db, 'siteConfig', 'estadisticas')).then((snap) => {
      if (snap.exists()) {
        const d = snap.data();
        if (d.items) setItems(d.items as Estadistica[]);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const updateItem = (index: number, field: keyof Estadistica, value: string | number) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'siteConfig', 'estadisticas'), { items });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert('Error al guardar. Intente de nuevo.');
    }
    setSaving(false);
  };

  if (loading) return <p style={{ color: 'var(--text-muted)' }}>Cargando datos...</p>;

  const inputStyle: React.CSSProperties = {
    width: '100%',
    height: '48px',
    borderRadius: '12px',
    border: '1.5px solid var(--border)',
    background: 'var(--bg)',
    padding: '0 14px',
    fontSize: '15px',
    fontFamily: 'Sora, sans-serif',
    outline: 'none',
    boxSizing: 'border-box',
    color: 'var(--text-black)',
  };

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-black)', marginBottom: '8px' }}>
        Estadísticas
      </h1>
      <p style={{ fontSize: '15px', color: 'var(--text-body)', marginBottom: '32px' }}>
        Edita los números que aparecen en la sección de estadísticas de la web.
      </p>

      <AdminCard title="Contadores">
        <div style={{ display: 'grid', gap: '16px' }}>
          {/* Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 80px 1fr',
            gap: '12px',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            padding: '0 4px',
          }}>
            <span>Etiqueta</span>
            <span>Valor</span>
            <span>Sufijo</span>
          </div>

          {items.map((item, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 80px 1fr',
              gap: '12px',
              alignItems: 'center',
              padding: '12px 16px',
              background: i % 2 === 0 ? 'var(--bg)' : 'white',
              borderRadius: '12px',
            }}>
              <input
                type="text"
                value={item.label}
                onChange={(e) => updateItem(i, 'label', e.target.value)}
                style={inputStyle}
                placeholder="Ej: Clientes"
              />
              <input
                type="number"
                value={item.value}
                onChange={(e) => updateItem(i, 'value', Number(e.target.value))}
                style={inputStyle}
              />
              <input
                type="text"
                value={item.suffix}
                onChange={(e) => updateItem(i, 'suffix', e.target.value)}
                style={inputStyle}
                placeholder="Ej: +, h, %"
              />
            </div>
          ))}
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '12px' }}>
          Valor = el número grande. Sufijo = lo que va después (+, h, %). Etiqueta = texto debajo del número.
        </p>
      </AdminCard>

      <AdminSaveButton saving={saving} saved={saved} onClick={handleSave} />
    </div>
  );
}
