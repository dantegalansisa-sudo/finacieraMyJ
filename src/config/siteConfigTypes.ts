// Interfaces TypeScript extraídas de siteConfig.ts
// Usadas por el admin panel y el provider de Firebase

export interface Contacto {
  whatsappNumero: string;
  telefonoDisplay: string;
  whatsappMensaje: string;
  instagram: string;
  emailGeneral: string;
  emailRRHH: string;
  ubicacion: string;
}

export interface CalculadoraPlan {
  label: string;
  periods: number;
  freq: string;
}

export interface Calculadora {
  montoMinimo: number;
  montoMaximo: number;
  incremento: number;
  tasaTotalSemanal: number;
  tasaMensual: number;
  montoInicial: number;
  planes: CalculadoraPlan[];
}

export interface CuotaRow {
  periodo: string;
  frecuencia: string;
  cuota: string;
}

export interface SimuladorCuotas {
  montos: readonly number[] | number[];
  datos: Record<number, CuotaRow[]>;
}

export interface Estadistica {
  value: number;
  suffix: string;
  label: string;
}

export interface UrgencyBanner {
  textoAntes: string;
  textoDespues: string;
  botonTexto: string;
  whatsappMensaje: string;
}

// Mapa de secciones editables desde el admin
export interface SiteConfigMap {
  contacto: Contacto;
  calculadora: Calculadora;
  simuladorCuotas: SimuladorCuotas;
  estadisticas: Estadistica[];
  urgencyBanner: UrgencyBanner;
}

export type SiteConfigKey = keyof SiteConfigMap;
