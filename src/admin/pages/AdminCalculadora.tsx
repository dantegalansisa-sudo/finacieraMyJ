import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { calculadora as defaults } from '../../config/siteConfig';
import type { Calculadora, CalculadoraPlan } from '../../config/siteConfigTypes';
import AdminCard from '../components/AdminCard';
import AdminInput from '../components/AdminInput';
import AdminSaveButton from '../components/AdminSaveButton';

export default function AdminCalculadora() {
  const [data, setData] = useState<Calculadora>({ ...defaults, planes: [...defaults.planes] });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoc(doc(db, 'siteConfig', 'calculadora')).then((snap) => {
      if (snap.exists()) {
        setData({ ...defaults, ...snap.data(), planes: snap.data().planes || defaults.planes } as Calculadora);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const updatePlan = (index: number, field: keyof CalculadoraPlan, value: string | number) => {
    const planes = [...data.planes];
    planes[index] = { ...planes[index], [field]: value };
    setData({ ...data, planes });
  };

  const addPlan = () => {
    setData({ ...data, planes: [...data.planes, { label: '', periods: 1, freq: 'Mensual' }] });
  };

  const removePlan = (index: number) => {
    setData({ ...data, planes: data.planes.filter((_, i) => i !== index) });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'siteConfig', 'calculadora'), data);
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
        Calculadora de Préstamos
      </h1>
      <p style={{ fontSize: '15px', color: 'var(--text-body)', marginBottom: '32px' }}>
        Configura los montos y tasas de interés del calculador de la web.
      </p>

      <AdminCard title="Rango de Montos">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <AdminInput
            label="Monto Mínimo (RD$)"
            value={data.montoMinimo}
            onChange={(v) => setData({ ...data, montoMinimo: Number(v) })}
            type="number"
            helperText="El monto más bajo que se puede seleccionar"
          />
          <AdminInput
            label="Monto Máximo (RD$)"
            value={data.montoMaximo}
            onChange={(v) => setData({ ...data, montoMaximo: Number(v) })}
            type="number"
            helperText="El monto más alto que se puede seleccionar"
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <AdminInput
            label="Incremento del slider (RD$)"
            value={data.incremento}
            onChange={(v) => setData({ ...data, incremento: Number(v) })}
            type="number"
            helperText="Cada paso del slider sube este monto"
          />
          <AdminInput
            label="Monto inicial al cargar"
            value={data.montoInicial}
            onChange={(v) => setData({ ...data, montoInicial: Number(v) })}
            type="number"
            helperText="El monto que muestra el slider por defecto"
          />
        </div>
      </AdminCard>

      <AdminCard title="Tasas de Interés">
        <AdminInput
          label="Tasa total semanal (13 semanas)"
          value={data.tasaTotalSemanal}
          onChange={(v) => setData({ ...data, tasaTotalSemanal: Number(v) })}
          type="number"
          helperText="Ej: 0.261 = 26.1% total para 13 semanas. Es la tasa que se aplica al monto para calcular el pago semanal."
        />
        <AdminInput
          label="Tasa de interés mensual"
          value={data.tasaMensual}
          onChange={(v) => setData({ ...data, tasaMensual: Number(v) })}
          type="number"
          helperText="Ej: 0.06 = 6% mensual. Se aplica cada mes al saldo."
        />
      </AdminCard>

      <AdminCard title="Planes de Pago">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {data.planes.map((plan, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 100px 120px auto',
              gap: '12px',
              alignItems: 'center',
              padding: '12px 16px',
              background: 'var(--bg)',
              borderRadius: '12px',
            }}>
              <input
                type="text"
                value={plan.label}
                onChange={(e) => updatePlan(i, 'label', e.target.value)}
                style={inputStyle}
                placeholder="Ej: 13 semanas"
              />
              <input
                type="number"
                value={plan.periods}
                onChange={(e) => updatePlan(i, 'periods', Number(e.target.value))}
                style={inputStyle}
                placeholder="Periodos"
              />
              <select
                value={plan.freq}
                onChange={(e) => updatePlan(i, 'freq', e.target.value)}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                <option value="Semanal">Semanal</option>
                <option value="Mensual">Mensual</option>
              </select>
              <button
                onClick={() => removePlan(i)}
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
        <button
          onClick={addPlan}
          style={{
            marginTop: '12px',
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
          + Agregar Plan
        </button>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '12px' }}>
          Cada fila es: nombre del plan, número de periodos, y frecuencia (semanal o mensual).
        </p>
      </AdminCard>

      <AdminSaveButton saving={saving} saved={saved} onClick={handleSave} />
    </div>
  );
}
