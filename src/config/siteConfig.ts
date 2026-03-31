// ╔══════════════════════════════════════════════════════════════════╗
// ║           CONFIGURACIÓN DE GRUPO FINANCIERO M&J                ║
// ║                                                                ║
// ║  Este archivo centraliza TODOS los datos editables del sitio.  ║
// ║  Para hacer cambios, solo modifica los valores aquí.           ║
// ║  Luego sube los cambios a GitHub y Vercel se actualiza solo.   ║
// ║                                                                ║
// ║  IMPORTANTE: No cambies los nombres de las variables,          ║
// ║  solo los valores entre comillas o números.                    ║
// ╚══════════════════════════════════════════════════════════════════╝

// ─────────────────────────────────────────────
// 1. INFORMACIÓN DE CONTACTO
// ─────────────────────────────────────────────

export const contacto = {
  // Número de WhatsApp (sin guiones ni espacios, con código de país)
  whatsappNumero: '18294045264',

  // Cómo se muestra el teléfono en la web
  telefonoDisplay: '(829) 404-5264',

  // Mensaje predeterminado de WhatsApp
  whatsappMensaje: 'Hola, vengo de su página web y me interesa un préstamo con Grupo Financiero M&J',

  // Instagram (sin el @)
  instagram: 'grupofinancieromyj',

  // Emails de la empresa
  emailGeneral: 'grupofinanciero@gmail.com',
  emailRRHH: 'Gestionhumanagrupomj@gmail.com',

  // Ubicación
  ubicacion: 'República Dominicana',
};

// Genera la URL de WhatsApp automáticamente (no tocar)
export const whatsappUrl = `https://wa.me/${contacto.whatsappNumero}?text=${encodeURIComponent(contacto.whatsappMensaje)}`;

// ─────────────────────────────────────────────
// 2. INFORMACIÓN DE LA EMPRESA
// ─────────────────────────────────────────────

export const empresa = {
  // Nombre corto (aparece en navbar, footer, etc.)
  nombreCorto: 'M&J',

  // Nombre completo
  nombreCompleto: 'Grupo Financiero M&J',

  // Subtítulo bajo el logo
  subtituloLogo: 'Grupo Financiero',

  // Descripción corta para footer y contacto
  descripcionCorta: 'Soluciones financieras reales, rápidas y con la mejor tasa del mercado dominicano.',

  // Texto de copyright (el año se agrega automáticamente)
  copyright: 'Grupo Financiero M&J. Todos los derechos reservados.',

  // Crédito de diseño
  creditoDiseno: 'Diseñado por NEXIX Tech Studio',
};

// ─────────────────────────────────────────────
// 3. LIDERAZGO EJECUTIVO
// ─────────────────────────────────────────────

export const liderazgo = {
  // Foto de presidente y vice presidenta
  foto: '/images/presidente y vice presidenta.jpeg',
  fotoAlt: 'Jesús de la Cruz Disla y Maridania Gerbacio — Liderazgo de Grupo Financiero M&J',

  // Datos del presidente
  presidente: {
    nombre: 'Jesús de la Cruz Disla',
    cargo: 'Empresario y Presidente',
    bio: 'Empresario y Presidente de Grupo Financiero MYJ. Cree en los préstamos como una oportunidad para impulsar el crecimiento de las personas y sus proyectos. Su enfoque está en apoyar a clientes y emprendedores con financiamientos accesibles. Su visión es fortalecer la empresa y ampliar oportunidades para pequeñas y medianas empresas.',
  },

  // Datos de la vice presidenta
  vicepresidenta: {
    nombre: 'Maridania Gerbacio',
    cargo: 'Vicepresidenta, Mercadóloga y CIO',
    bio: 'Vicepresidenta de Grupo Financiero MYJ, mercadóloga y CIO. Se destaca por su enfoque estratégico y liderazgo en la organización de procesos y equipos. Impulsa la colocación de préstamos y nuevas iniciativas orientadas al crecimiento, promoviendo una gestión eficiente y una empresa en constante desarrollo.',
  },
};

// ─────────────────────────────────────────────
// 4. INVERSIONISTAS Y RESPALDO
// ─────────────────────────────────────────────

export const inversionistas = {
  titulo: 'Respaldados por inversionistas que confían en nosotros',
  subtitulo: 'Más de 10 inversionistas han decidido crecer junto a nuestra empresa, consolidando nuestra posición como una institución financiera sólida y confiable.',
  numeroInversionistas: '10+',
  labelInversionistas: 'Inversionistas',
  frase: 'Su confianza impulsa nuestro compromiso con cada cliente',

  beneficios: [
    {
      icono: '💎',
      titulo: 'Solidez Financiera',
      descripcion: 'Respaldados por inversionistas que garantizan nuestra estabilidad y crecimiento sostenido.',
    },
    {
      icono: '🚀',
      titulo: 'Crecimiento Continuo',
      descripcion: 'La inversión nos permite expandir servicios y mejorar la experiencia de nuestros clientes.',
    },
    {
      icono: '🤝',
      titulo: 'Confianza Comprobada',
      descripcion: 'Inversionistas serios que han verificado nuestra trayectoria y modelo de negocio.',
    },
  ],
};

// ─────────────────────────────────────────────
// 5. HERO SECTION
// ─────────────────────────────────────────────

export const hero = {
  // Badge verde arriba del título
  badge: '✦ SOLUCIONES FINANCIERAS EN RD',

  // Título principal (cada línea es un <br/>)
  tituloLinea1: 'Financiamiento',
  tituloLinea2: 'que te lleva',
  tituloLinea3: 'a tus ',
  tituloAcento: 'metas.', // Palabra en verde

  // Descripción debajo del título
  descripcion: 'Con la mejor tasa del mercado y aprobación en 72 horas. De la mano contigo, en cada paso del camino.',

  // Texto del botón principal
  botonPrincipal: 'Solicitar Préstamo →',

  // Texto del link secundario
  linkSecundario: '¿Cómo funciona? ↓',

  // Línea de confianza
  textoConfianza: 'Con la confianza de cientos de familias dominicanas',

  // Floating cards — datos que aparecen en las tarjetas
  cardPrestado: 'RD$ 150K',
  cardPrestadoLabel: 'Prestado este mes',
  cardClientes: '+172',
  cardClientesLabel: 'Nuevos clientes',
  cardClientesPorcentaje: '+24% este mes',
  cardAprobacion: 'Aprobación en 72h',
  cardAprobacionLabel: 'Rápido y seguro',
};

// ─────────────────────────────────────────────
// 5. URGENCY BANNER (barra verde arriba)
// ─────────────────────────────────────────────

export const urgencyBanner = {
  // El mes se agrega automáticamente. Cambia solo el texto fijo.
  textoAntes: 'Tasa especial este mes de', // Se agrega el mes después
  textoDespues: 'Solicita tu préstamo antes del fin de mes y obtén condiciones preferenciales',
  botonTexto: 'Aprovechar →',

  // Mensaje de WhatsApp específico para la promo
  whatsappMensaje: 'Hola, quiero aprovechar la tasa especial de este mes',
};

// ─────────────────────────────────────────────
// 6. PROCESO (4 pasos)
// ─────────────────────────────────────────────

export const procesoSteps = [
  {
    num: '01',
    icon: '📱',
    title: 'Solicita',
    desc: 'Escríbenos por WhatsApp o llena el formulario. Solo necesitas tu cédula y un comprobante de ingresos.',
  },
  {
    num: '02',
    icon: '🔍',
    title: 'Evaluamos',
    desc: 'Nuestro equipo analiza tu solicitud de forma personalizada. Sin burocracia, sin largas esperas.',
  },
  {
    num: '03',
    icon: '✅',
    title: 'Aprobamos',
    desc: 'En menos de 72 horas recibes tu aprobación con las condiciones claras y transparentes.',
  },
  {
    num: '04',
    icon: '💸',
    title: 'Desembolso',
    desc: 'Tu dinero en manos en 24 horas hábiles. Directo a tu cuenta, sin complicaciones.',
  },
];

// ─────────────────────────────────────────────
// 8. REQUISITOS
// ─────────────────────────────────────────────

export const requisitosObligatorios = [
  {
    icon: '🪪',
    title: 'Cédula de identidad',
    desc: 'Vigente y en buen estado. Original y copia.',
  },
  {
    icon: '💼',
    title: 'Comprobante de ingresos',
    desc: 'Carta de trabajo, últimos estados de cuenta o constancia de negocio.',
  },
  {
    icon: '📄',
    title: 'Referencia personal',
    desc: 'Una referencia personal verificable (familiar o conocido).',
  },
];

export const requisitosOpcionales = [
  {
    icon: '🏠',
    title: 'Comprobante de domicilio',
    desc: 'Factura de servicios reciente a tu nombre.',
    tag: 'Según monto',
  },
  {
    icon: '📋',
    title: 'Récord crediticio',
    desc: 'No es obligatorio, pero agiliza tu aprobación.',
    tag: 'Opcional',
  },
];

// ─────────────────────────────────────────────
// 9. SERVICIOS (tipos de préstamo)
// ─────────────────────────────────────────────

export const servicios = [
  {
    icon: '💼',
    name: 'Préstamo Personal',
    desc: 'Para lo que necesites. Cuotas cómodas adaptadas a tu capacidad.',
    tag: 'Más popular' as string | null,
  },
  {
    icon: '🏠',
    name: 'Préstamo Hipotecario',
    desc: 'Tu casa propia con las mejores condiciones del mercado.',
    tag: null,
  },
  {
    icon: '🚗',
    name: 'Préstamo Prendario',
    desc: 'Tu vehículo como garantía. Rápido, simple, sin complicaciones.',
    tag: null,
  },
  {
    icon: '📊',
    name: 'Préstamo Comercial',
    desc: 'Impulsa tu negocio con financiamiento flexible y ágil.',
    tag: 'Negocio' as string | null,
  },
];

// ─────────────────────────────────────────────
// 10. ESTADÍSTICAS
// ─────────────────────────────────────────────

export const estadisticas = [
  { value: 739, suffix: '+', label: 'Clientes Satisfechos' },
  { value: 72, suffix: 'h', label: 'Tiempo de Aprobación' },
  { value: 24, suffix: 'h', label: 'Desembolso en' },
  { value: 100, suffix: '%', label: 'Personalizado' },
];

// ─────────────────────────────────────────────
// 11. CALCULADORA
// ─────────────────────────────────────────────

export const calculadora = {
  // Monto mínimo del slider
  montoMinimo: 10000,

  // Monto máximo del slider
  montoMaximo: 1000000,

  // Incrementos del slider (cada paso)
  incremento: 10000,

  // Tasa TOTAL para préstamos semanales de 13 semanas (0.261 = 26.1%)
  tasaTotalSemanal: 0.261,

  // Tasa de interés mensual (0.06 = 6% por mes)
  tasaMensual: 0.06,

  // Monto inicial que muestra el slider al cargar
  montoInicial: 25000,

  // Planes disponibles en la calculadora
  planes: [
    { label: '13 semanas', periods: 13, freq: 'Semanal' },
    { label: '6 meses', periods: 6, freq: 'Mensual' },
    { label: '12 meses', periods: 12, freq: 'Mensual' },
  ],
};

// ─────────────────────────────────────────────
// 12. SIMULADOR DE CUOTAS (tabla fija)
// ─────────────────────────────────────────────

export const simuladorCuotas = {
  // Montos disponibles en los tabs (datos reales del negocio)
  montos: [10000, 25000, 50000, 100000] as const,

  // Datos por cada monto — Semanal: 2% semanal | Mensual: 6% mensual
  datos: {
    10000: [
      { periodo: '13 semanas', frecuencia: 'Semanal', cuota: 'RD$ 970' },
      { periodo: '6 meses', frecuencia: 'Mensual', cuota: 'RD$ 2,266' },
    ],
    25000: [
      { periodo: '13 semanas', frecuencia: 'Semanal', cuota: 'RD$ 2,425' },
      { periodo: '6 meses', frecuencia: 'Mensual', cuota: 'RD$ 5,666' },
    ],
    50000: [
      { periodo: '13 semanas', frecuencia: 'Semanal', cuota: 'RD$ 4,850' },
      { periodo: '6 meses', frecuencia: 'Mensual', cuota: 'RD$ 11,333' },
    ],
    100000: [
      { periodo: '13 semanas', frecuencia: 'Semanal', cuota: 'RD$ 9,700' },
      { periodo: '12 meses', frecuencia: 'Mensual', cuota: 'RD$ 14,333' },
    ],
  } as Record<number, { periodo: string; frecuencia: string; cuota: string }[]>,
};

// ─────────────────────────────────────────────
// 13. ¿POR QUÉ ELEGIRNOS? (6 razones)
// ─────────────────────────────────────────────

export const razones = [
  { icon: '⚡', num: '01', title: 'Aprobación en 72h', desc: 'Sin largas esperas. Respuesta rápida garantizada.' },
  { icon: '💎', num: '02', title: 'Mejor Tasa del Mercado', desc: 'Tasas competitivas para que tu cuota sea cómoda.' },
  { icon: '🤝', num: '03', title: 'Atención Personalizada', desc: 'Un asesor real, no un robot. Siempre disponible.' },
  { icon: '💰', num: '04', title: 'Desembolso en 24h', desc: 'Tu dinero en manos en menos de 24 horas hábiles.' },
  { icon: '📱', num: '05', title: 'Gestión por WhatsApp', desc: 'Todo el proceso desde tu teléfono. Sin papeleo.' },
  { icon: '🔒', num: '06', title: '100% Confiable', desc: 'Institución seria con años de trayectoria en RD.' },
];

// ─────────────────────────────────────────────
// 14. TESTIMONIOS
// ─────────────────────────────────────────────

export const testimonios = [
  {
    name: 'María R.',
    initials: 'MR',
    text: 'En menos de 3 días ya tenía mi préstamo aprobado. El trato fue excelente y me explicaron cada detalle. ¡Totalmente recomendados!',
  },
  {
    name: 'Carlos M.',
    initials: 'CM',
    text: 'Lo que más valoro es la atención personalizada. No es un banco donde eres un número. Aquí te tratan como familia y te resuelven rápido.',
  },
  {
    name: 'Ana P.',
    initials: 'AP',
    text: 'Necesitaba un préstamo para mi negocio urgente. Grupo M&J fue la única empresa que me dio respuesta real. Las cuotas son cómodas.',
  },
];

// ─────────────────────────────────────────────
// 15. FORMULARIO DE SOLICITUD (Google Form)
// ─────────────────────────────────────────────

export const formularioSolicitud = {
  // URL del Google Form
  url: 'https://docs.google.com/forms/d/e/1FAIpQLSc8qCEqqLOno5a0lR8dpskkDNTZSU7VyvVLXipkVcnXAiuN4g/viewform?vc=0&c=0&w=1&flr=0',

  // Textos de la sección
  titulo: 'Solicita tu préstamo ahora',
  subtitulo: 'Completa el formulario y recibe respuesta en menos de 72 horas.',
  botonTexto: 'Llenar Solicitud →',
  nota: 'Tu información es 100% confidencial. Solo la usamos para evaluar tu solicitud.',
};

// ─────────────────────────────────────────────
// 16. FIRMA DIGITAL
// ─────────────────────────────────────────────

export const firmaDigital = {
  // Textos de la sección
  titulo: 'Firma tu solicitud digitalmente',
  subtitulo: 'Completa los datos y firma para generar tu documento de solicitud. Es rápido, seguro y 100% digital.',

  // Labels del formulario
  labelNombre: 'Nombre completo',
  labelCedula: 'Cédula de identidad',
  labelMonto: 'Monto solicitado',
  labelTipoPrestamo: 'Tipo de préstamo',

  // Pad de firma
  signaturePlaceholder: 'Firma aquí con tu dedo o mouse',
  clearButtonText: 'Limpiar firma',

  // Botón submit
  submitButtonText: 'Generar y Descargar PDF →',

  // Nota de confianza
  nota: 'Este documento tiene validez como solicitud preliminar. Un asesor se comunicará contigo para completar el proceso.',
};

// ─────────────────────────────────────────────
// 17. HISTORIAS DE CLIENTES (Testimonios Reales)
// ─────────────────────────────────────────────

export const historiasClientes = {
  titulo: 'Historias que nos inspiran',
  subtitulo: 'Clientes reales que transformaron su vida con nuestros servicios financieros.',
  alertaTexto: 'Estamos recopilando los testimonios reales de nuestros clientes. Próximamente verás sus historias aquí.',

  // Testimonios placeholder — reemplazar con datos reales
  historias: [
    {
      nombre: 'Próximamente',
      ocupacion: 'Cliente verificado',
      foto: '', // Poner ruta a foto real, ej: '/images/clientes/juan.jpg'
      videoUrl: '', // Poner URL de YouTube/video, ej: 'https://youtube.com/watch?v=...'
      historia: 'Historia real de un cliente que logró adquirir su vivienda propia gracias al financiamiento oportuno de Grupo Financiero M&J.',
      tipoPrestamo: 'Préstamo Hipotecario',
      tiempoCliente: 'Cliente desde 2023',
    },
    {
      nombre: 'Próximamente',
      ocupacion: 'Cliente verificado',
      foto: '',
      videoUrl: '',
      historia: 'Historia real de un emprendedor que impulsó su negocio con el respaldo financiero de M&J y hoy tiene un negocio próspero.',
      tipoPrestamo: 'Préstamo Comercial',
      tiempoCliente: 'Cliente desde 2024',
    },
    {
      nombre: 'Próximamente',
      ocupacion: 'Cliente verificado',
      foto: '',
      videoUrl: '',
      historia: 'Historia real de una familia que resolvió una emergencia financiera gracias a la rapidez y confianza de Grupo Financiero M&J.',
      tipoPrestamo: 'Préstamo Personal',
      tiempoCliente: 'Cliente desde 2024',
    },
  ],
};

// ─────────────────────────────────────────────
// 18. EQUIPO DE TRABAJO
// ─────────────────────────────────────────────

export const equipoTrabajo = {
  titulo: 'Conoce a nuestro equipo',
  subtitulo: 'Las personas detrás de cada solución financiera. Profesionales comprometidos con tu bienestar.',
  alertaTexto: '', // Ya no necesitamos el alert banner porque tenemos datos reales

  // Equipo real de Grupo Financiero M&J
  miembros: [
    {
      nombre: 'Estefany Pérez',
      cargo: 'Supervisora General',
      departamento: 'Supervisión',
      foto: '/images/Estefany Pérez.jpeg',
      telefono: '',
      email: '',
      descripcion: 'Supervisa las operaciones diarias de la empresa, coordina equipos de trabajo y asegura el cumplimiento de los estándares de calidad y servicio.',
    },
    {
      nombre: 'Yudelka Mejia',
      cargo: 'Encargada de Recurso Humano',
      departamento: 'Recursos Humanos',
      foto: '/images/Yudelka Mejia.jpeg',
      telefono: '',
      email: 'Gestionhumanagrupomj@gmail.com',
      descripcion: 'Gestiona el talento humano de la empresa, coordina procesos de contratación, capacitación y desarrollo del personal.',
    },
    {
      nombre: 'Jennifer Ferrera',
      cargo: 'Encargada de Contabilidad',
      departamento: 'Contabilidad',
      foto: '/images/WhatsApp Image 2026-03-26 at 6.09.09 PM.jpeg',
      telefono: '',
      email: '',
      descripcion: 'Dirige el departamento de contabilidad, supervisa los procesos contables y financieros, y asegura el cumplimiento de las normativas fiscales.',
    },
    {
      nombre: 'Rosa Pantaleón',
      cargo: 'Auxiliar de Contabilidad',
      departamento: 'Contabilidad',
      foto: '/images/foto que falta.jpeg',
      telefono: '',
      email: '',
      descripcion: 'Apoya en los procesos contables, registra transacciones financieras y colabora en la preparación de reportes contables.',
    },
    {
      nombre: 'Nelsida Valdez',
      cargo: 'Auxiliar de Contabilidad y Área Legal',
      departamento: 'Contabilidad',
      foto: '/images/Nelsida Valdez.jpeg',
      telefono: '',
      email: '',
      descripcion: 'Apoya en los procesos contables y financieros de la empresa. También se encarga del área legal y emprendiendo con grupo.',
    },
    {
      nombre: 'Andry Pérez',
      cargo: 'Servicio al Cliente',
      departamento: 'Atención al Cliente',
      foto: '/images/andry perez ser, al cliente.jpeg',
      telefono: '',
      email: '',
      descripcion: 'Primer punto de contacto para los clientes. Brinda información sobre nuestros servicios, resuelve dudas y agenda citas.',
    },
    {
      nombre: 'Moisés Brazobán',
      cargo: 'Gestión Motorizada',
      departamento: 'Logística',
      foto: '/images/Moisés Brazobán.jpeg',
      telefono: '',
      email: '',
      descripcion: 'Encargado de la logística y gestión motorizada, facilita la entrega de documentos y pagos, agilizando los procesos operativos.',
    },
  ],
};

// ─────────────────────────────────────────────
// 19. PREGUNTAS FRECUENTES (FAQ)
// ─────────────────────────────────────────────

export const preguntasFrecuentes = [
  {
    q: '¿Qué documentos necesito para solicitar un préstamo?',
    a: 'Solo necesitas tu cédula de identidad vigente y un comprobante de ingresos (carta de trabajo, estados de cuenta o constancia de negocio). En algunos casos podemos solicitar una referencia personal.',
  },
  {
    q: '¿Cuál es la tasa de interés?',
    a: 'Nuestras tasas son las más competitivas del mercado dominicano. La tasa final depende del monto, plazo y tu perfil crediticio. Te damos la información exacta antes de firmar cualquier compromiso.',
  },
  {
    q: '¿Cuánto tiempo tarda la aprobación?',
    a: 'Nuestro proceso de evaluación toma máximo 72 horas hábiles. En muchos casos, la respuesta es el mismo día. Una vez aprobado, el desembolso es en 24 horas.',
  },
  {
    q: '¿Puedo pagar mi préstamo antes de tiempo?',
    a: 'Sí, aceptamos pagos anticipados sin penalidad. De hecho, lo incentivamos. Pagar antes de tiempo reduce el costo total de tu préstamo.',
  },
  {
    q: '¿Qué pasa si me atraso en un pago?',
    a: 'Entendemos que pueden surgir imprevistos. Si tienes dificultades, contáctanos inmediatamente y buscaremos una solución juntos. Nuestro enfoque siempre es encontrar alternativas para que puedas cumplir.',
  },
  {
    q: '¿Necesito ser asalariado para aplicar?',
    a: 'No. Trabajamos con asalariados, independientes y dueños de negocios. Lo importante es demostrar una fuente de ingresos estable. Cada caso se evalúa de forma personalizada.',
  },
  {
    q: '¿Cuáles son las formas de pago disponibles?',
    a: 'Puedes pagar mediante transferencia bancaria, depósito en cuenta, o directamente en nuestras oficinas. También ofrecemos frecuencia semanal, quincenal o mensual según tu preferencia.',
  },
  {
    q: '¿Es seguro solicitar un préstamo con ustedes?',
    a: 'Absolutamente. Grupo Financiero M&J es una empresa seria con años de trayectoria en República Dominicana. Tu información personal se maneja con total confidencialidad y nuestros procesos son transparentes.',
  },
];
