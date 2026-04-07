import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { simuladorCuotas as defaults } from '../../config/siteConfig';
import type { CuotaRow } from '../../config/siteConfigTypes';
import AdminCard from '../components/AdminCard';
import AdminSaveButton from '../components/AdminSaveButton';

// Store numeric keys as strings in Firestore
interface SimuladorFirestore {
  montos: number[];
  datos: Record<string, CuotaRow[]>;
}

export default function AdminSimulador() {
  const [montos, setMontos] = useState<number[]>([...defaults.montos]);
  const [datos, setDatos] = useState<Record<string, CuotaRow[]>>(() => {
    const d: Record<string, CuotaRow[]> = {};
    for (const m of defaults.montos) {
      d[String(m)] = [...(defaults.datos[m] || [])];
    }
    return d;
  });
  const [activeTab, setActiveTab] = useState(String(defaults.montos[0]));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newMonto, setNewMonto] = useState('');

  useEffect(() => {
    getDoc(doc(db, 'siteConfig', 'simuladorCuotas')).then((snap) => {
      if (snap.exists()) {
        const d = snap.data() as SimuladorFirestore;
        if (d.montos) setMontos(d.montos);
        if (d.datos) setDatos(d.datos);
        if (d.montos?.[0]) setActiveTab(String(d.montos[0]));
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const updateRow = (monto: string, index: number, field: keyof CuotaRow, value: string) => {
    const updated = { ...datos };
    updated[monto] = [...(updated[monto] || [])];
    updated[monto][index] = { ...updated[monto][index], [field]: value };
    setDatos(updated);
  };

  const addRow = (monto: string) => {
    const updated = { ...datos };
    updated[monto] = [...(updated[monto] || []), { periodo: '', frecuencia: 'Semanal', cuota: '' }];
    setDatos(updated);
  };

  const removeRow = (monto: string, index: number) => {
    const updated = { ...datos };
    updated[monto] = updated[monto].filter((_, i) => i !== index);
    setDatos(updated);
  };

  const addMonto = () => {
    const val = Number(newMonto);
    if (!val || montos.includes(val)) return;
    const sorted = [...montos, val].sort((a, b) => a - b);
    setMontos(sorted);
    setDatos({ ...datos, [String(val)]: [{ periodo: '13 semanas', frecuencia: 'Semanal', cuota: '' }] });
    setActiveTab(String(val));
    setNewMonto('');
  };

  const removeMonto = (monto: number) => {
    setMontos(montos.filter((m) => m !== monto));
    const updated = { ...datos };
    delete updated[String(monto)];
    setDatos(updated);
    if (activeTab === String(monto)) {
      const remaining = montos.filter((m) => m !== monto);
      setActiveTab(remaining.length ? String(remaining[0]) : '');
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'siteConfig', 'simuladorCuotas'), { montos, datos } as SimuladorFirestore);
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

  const formatMonto = (m: number) => `RD$ ${m.toLocaleString('es-DO')}`;

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-black)', marginBottom: '8px' }}>
        Simulador de Cuotas
      </h1>
      <p style={{ fontSize: '15px', color: 'var(--text-body)', marginBottom: '32px' }}>
        Edita las tablas de cuotas que se muestran para cada monto de préstamo.
      </p>

      {/* Tabs de montos */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
        {montos.map((m) => (
          <button
            key={m}
            onClick={() => setActiveTab(String(m))}
            style={{
              padding: '10px 20px',
              borderRadius: '12px',
              border: activeTab === String(m) ? '2px solid var(--green-logo)' : '1.5px solid var(--border)',
              background: activeTab === String(m) ? 'var(--navy)' : 'white',
              color: activeTab === String(m) ? 'white' : 'var(--text-body)',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'Sora, sans-serif',
              transition: 'all 0.2s',
            }}
          >
            {formatMonto(m)}
          </button>
        ))}
      </div>

      {/* Tabla del monto activo */}
      {activeTab && (
        <AdminCard title={`Cuotas para ${formatMonto(Number(activeTab))}`}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 120px 1fr auto',
              gap: '12px',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              padding: '0 4px',
            }}>
              <span>Periodo</span>
              <span>Frecuencia</span>
              <span>Cuota</span>
              <span style={{ width: '40px' }}></span>
            </div>

            {(datos[activeTab] || []).map((row, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '1fr 120px 1fr auto',
                gap: '12px',
                alignItems: 'center',
                padding: '8px',
                background: i % 2 === 0 ? 'var(--bg)' : 'white',
                borderRadius: '12px',
              }}>
                <input
                  type="text"
                  value={row.periodo}
                  onChange={(e) => updateRow(activeTab, i, 'periodo', e.target.value)}
                  style={inputStyle}
                  placeholder="Ej: 13 semanas"
                />
                <select
                  value={row.frecuencia}
                  onChange={(e) => updateRow(activeTab, i, 'frecuencia', e.target.value)}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                >
                  <option value="Semanal">Semanal</option>
                  <option value="Quincenal">Quincenal</option>
                  <option value="Mensual">Mensual</option>
                </select>
                <input
                  type="text"
                  value={row.cuota}
                  onChange={(e) => updateRow(activeTab, i, 'cuota', e.target.value)}
                  style={inputStyle}
                  placeholder="Ej: RD$ 2,425"
                />
                <button
                  onClick={() => removeRow(activeTab, i)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    border: '1px solid #FECACA',
                    background: '#FEF2F2',
                    color: '#DC2626',
                    fontSize: '18px',
                    cursor: 'pointer',
                    fontFamily: 'Sora, sans-serif',
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
            <button
              onClick={() => addRow(activeTab)}
              style={{
                padding: '10px 20px',
                borderRadius: '10px',
                border: '1.5px dashed var(--border)',
                background: 'transparent',
                color: 'var(--text-body)',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: 'Sora, sans-serif',
              }}
            >
              + Agregar Cuota
            </button>
            <button
              onClick={() => removeMonto(Number(activeTab))}
              style={{
                padding: '10px 20px',
                borderRadius: '10px',
                border: '1px solid #FECACA',
                background: '#FEF2F2',
                color: '#DC2626',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: 'Sora, sans-serif',
              }}
            >
              Eliminar este monto
            </button>
          </div>
        </AdminCard>
      )}

      {/* Add new monto */}
      <AdminCard title="Agregar nuevo monto">
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--text-black)', marginBottom: '8px' }}>
              Monto (RD$)
            </label>
            <input
              type="number"
              value={newMonto}
              onChange={(e) => setNewMonto(e.target.value)}
              style={inputStyle}
              placeholder="Ej: 75000"
            />
          </div>
          <button
            onClick={addMonto}
            style={{
              height: '48px',
              padding: '0 24px',
              borderRadius: '12px',
              border: 'none',
              background: 'var(--navy)',
              color: 'white',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'Sora, sans-serif',
              whiteSpace: 'nowrap',
            }}
          >
            + Agregar
          </button>
        </div>
      </AdminCard>

      <AdminSaveButton saving={saving} saved={saved} onClick={handleSave} />
    </div>
  );
}
