// Goals Data extracted from PDF
export interface Goal {
  id: string;
  title: string;
  description: string;
  category: "principal" | "general";
  status: "not_started" | "in_progress" | "completed";
  progress: number;
  milestones: Milestone[];
  notes: string;
  dueDate?: string;
}

export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  date?: string;
}

export const initialGoals: Goal[] = [
  // OBJETIVOS PRINCIPALES
  {
    id: "g1",
    title: "Usar MAGI activamente durante 2026",
    description: "Usar MAGI de forma activa y real a lo largo de 2026, sin abandonarlo.",
    category: "principal",
    status: "not_started",
    progress: 0,
    milestones: [
      { id: "m1", title: "Configurar sistema MAGI", completed: false },
      { id: "m2", title: "Uso semanal consistente - Q1", completed: false },
      { id: "m3", title: "Uso semanal consistente - Q2", completed: false },
      { id: "m4", title: "Uso semanal consistente - Q3", completed: false },
      { id: "m5", title: "Uso semanal consistente - Q4", completed: false },
    ],
    notes: ""
  },
  {
    id: "g2",
    title: "Proyecto anual de lectura",
    description: "Ejecutar el proyecto anual de lectura con continuidad y profundidad, priorizando comprensión sobre cantidad.",
    category: "principal",
    status: "not_started",
    progress: 0,
    milestones: [
      { id: "m6", title: "Bloque I completado (sem 1-8)", completed: false },
      { id: "m7", title: "Bloque II completado (sem 9-16)", completed: false },
      { id: "m8", title: "Bloque III completado (sem 17-26)", completed: false },
      { id: "m9", title: "Bloque IV completado (sem 27-38)", completed: false },
      { id: "m10", title: "Bloque V completado (sem 39-52)", completed: false },
    ],
    notes: ""
  },
  {
    id: "g3",
    title: "Sistema físico consistente",
    description: "Sostener un sistema físico entrenando de forma consistente durante el año, evitando lesiones que interrumpan el proceso.",
    category: "principal",
    status: "not_started",
    progress: 0,
    milestones: [
      { id: "m11", title: "Fase I completada - Calistenia + Cargas", completed: false },
      { id: "m12", title: "Fase II completada - Calistenia Avanzada", completed: false },
      { id: "m13", title: "Fase III completada - Transición Gimnasio", completed: false },
      { id: "m14", title: "Fase IV completada - Consolidación", completed: false },
    ],
    notes: ""
  },
  {
    id: "g4",
    title: "Maratón personal de running",
    description: "Completar un maratón personal de running en 2026 como evidencia de que correr se integró de forma natural en mi vida.",
    category: "principal",
    status: "not_started",
    progress: 0,
    milestones: [
      { id: "m15", title: "Correr 5K sin parar", completed: false },
      { id: "m16", title: "Correr 10K", completed: false },
      { id: "m17", title: "Correr media maratón (21K)", completed: false },
      { id: "m18", title: "Completar maratón personal", completed: false },
    ],
    notes: ""
  },
  {
    id: "g5",
    title: "Decisiones con criterio",
    description: "Tomar decisiones de manera más crítica, razonable y consciente, utilizando criterio explícito cuando sea necesario.",
    category: "principal",
    status: "not_started",
    progress: 0,
    milestones: [],
    notes: ""
  },
  {
    id: "g6",
    title: "Orden financiero",
    description: "Mantener orden y claridad financiera durante 2026 mediante revisiones periódicas de ingresos, gastos y ahorro.",
    category: "principal",
    status: "not_started",
    progress: 0,
    milestones: [
      { id: "m19", title: "Revisión mensual - Enero", completed: false },
      { id: "m20", title: "Revisión mensual - Febrero", completed: false },
      { id: "m21", title: "Revisión mensual - Marzo", completed: false },
    ],
    notes: ""
  },
  {
    id: "g7",
    title: "Relaciones familiares",
    description: "Cuidar de forma consciente y continua mi relación con Isabel y mi familia nuclear.",
    category: "principal",
    status: "not_started",
    progress: 0,
    milestones: [],
    notes: ""
  },
  {
    id: "g8",
    title: "Viaje fuera del patrón habitual",
    description: "Realizar al menos un viaje en 2026 que rompa el patrón habitual de traslados cercanos Cancún–Mérida.",
    category: "principal",
    status: "not_started",
    progress: 0,
    milestones: [
      { id: "m22", title: "Investigar destinos", completed: false },
      { id: "m23", title: "Planificar viaje", completed: false },
      { id: "m24", title: "Realizar viaje", completed: false },
    ],
    notes: ""
  },
  {
    id: "g9",
    title: "Italiano nivel B2",
    description: "Alcanzar al menos un nivel B2 de italiano mediante estudio y práctica constantes durante 2026.",
    category: "principal",
    status: "not_started",
    progress: 0,
    milestones: [
      { id: "m25", title: "Nivel A1", completed: false },
      { id: "m26", title: "Nivel A2", completed: false },
      { id: "m27", title: "Nivel B1", completed: false },
      { id: "m28", title: "Nivel B2", completed: false },
    ],
    notes: ""
  },
  {
    id: "g10",
    title: "Receta nueva cada mes",
    description: "Aprender y dominar al menos una receta nueva de cocina cada mes a lo largo de 2026.",
    category: "principal",
    status: "not_started",
    progress: 0,
    milestones: [],
    notes: ""
  },
  
  // OBJETIVOS GENERALES
  {
    id: "g11",
    title: "Mejorar manejo",
    description: "Manejar mejor y con mayor seguridad, especialmente en trayectos largos o desconocidos.",
    category: "general",
    status: "not_started",
    progress: 0,
    milestones: [],
    notes: ""
  },
  {
    id: "g12",
    title: "Cambio de look",
    description: "Hacer un cambio de look que refleje mejor la etapa personal y profesional actual.",
    category: "general",
    status: "not_started",
    progress: 0,
    milestones: [],
    notes: ""
  },
  {
    id: "g13",
    title: "Aumentar ingresos",
    description: "Aumentar mis ingresos respecto a 2025 de forma progresiva y sostenible.",
    category: "general",
    status: "not_started",
    progress: 0,
    milestones: [],
    notes: ""
  },
  {
    id: "g14",
    title: "Terminar sin deudas",
    description: "Terminar 2026 sin deudas derivadas de pasivos que no aportan valor real.",
    category: "general",
    status: "not_started",
    progress: 0,
    milestones: [],
    notes: ""
  },
  {
    id: "g15",
    title: "Reducir distracciones digitales",
    description: "Reducir distracciones digitales y consumo innecesario de contenido.",
    category: "general",
    status: "not_started",
    progress: 0,
    milestones: [],
    notes: ""
  },
  {
    id: "g16",
    title: "Mejorar postura y presencia",
    description: "Mejorar postura, presencia y lenguaje corporal.",
    category: "general",
    status: "not_started",
    progress: 0,
    milestones: [],
    notes: ""
  },
  {
    id: "g17",
    title: "Simplificar espacios",
    description: "Simplificar espacios personales y materiales para reducir fricción mental.",
    category: "general",
    status: "not_started",
    progress: 0,
    milestones: [],
    notes: ""
  },
  {
    id: "g18",
    title: "Comunicar con claridad",
    description: "Comunicar ideas y límites con mayor claridad y menor desgaste.",
    category: "general",
    status: "not_started",
    progress: 0,
    milestones: [],
    notes: ""
  },
  {
    id: "g19",
    title: "Exponerse a nuevas experiencias",
    description: "Exponerme a ideas, lugares o personas fuera de mi círculo habitual.",
    category: "general",
    status: "not_started",
    progress: 0,
    milestones: [],
    notes: ""
  },
  {
    id: "g20",
    title: "Aprender a coser",
    description: "Aprender a coser como una habilidad práctica y funcional.",
    category: "general",
    status: "not_started",
    progress: 0,
    milestones: [],
    notes: ""
  },
];
