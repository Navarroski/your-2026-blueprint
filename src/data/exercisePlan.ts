// Exercise Plan Data extracted from PDF
export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  description: string;
  targetMuscles: string[];
}

export type ExerciseCategory = "pierna" | "empuje" | "tiron" | "core" | "cardio";

export interface ExercisePhase {
  id: number;
  name: string;
  duration: string;
  months: string;
  description: string;
  objectives: string[];
  weeklyStructure: string[];
  keyExercises: string[];
}

export interface WorkoutLog {
  id: string;
  date: string;
  phase: number;
  exercises: WorkoutExercise[];
  duration: number;
  notes: string;
  feeling: 1 | 2 | 3 | 4 | 5;
}

export interface WorkoutExercise {
  exerciseId: string;
  sets: SetLog[];
}

export interface SetLog {
  reps: number;
  weight?: number;
  rpe?: number;
  duration?: number;
}

export const exercisePhases: ExercisePhase[] = [
  {
    id: 1,
    name: "Calistenia + Cargas",
    duration: "3 meses",
    months: "Enero - Marzo 2026",
    description: "Construir base sólida de fuerza y control corporal antes de entrenamientos más demandantes.",
    objectives: [
      "Coordinación intramuscular",
      "Fuerza relativa",
      "Fortalecimiento de tendones y articulaciones",
      "Base estética funcional"
    ],
    weeklyStructure: [
      "4 días de fuerza (Full Body)",
      "2 días de running",
      "1 día de descanso activo"
    ],
    keyExercises: [
      "Sentadilla goblet o con barra",
      "Zancadas caminando",
      "Flexiones",
      "Press de hombro con mancuernas",
      "Remo con barra o mancuerna",
      "Curl de bíceps",
      "Hollow body",
      "Plancha lateral"
    ]
  },
  {
    id: 2,
    name: "Calistenia Avanzada + Carga",
    duration: "3 meses",
    months: "Abril - Junio 2026",
    description: "Aumentar dificultad mecánica para seguir ganando fuerza y definición.",
    objectives: [
      "Mayor trabajo unilateral",
      "Ejercicios con mayor dificultad técnica",
      "Menos repeticiones, más control y tensión",
      "Mayor énfasis en estabilidad y equilibrio"
    ],
    weeklyStructure: [
      "4 días de fuerza",
      "2 días de running (1 continuo, 1 intervalos)",
      "1 día de descanso activo"
    ],
    keyExercises: [
      "Sentadilla búlgara con mancuernas",
      "Peso muerto rumano con barra",
      "Flexiones declinadas",
      "Flexiones diamante",
      "Remo unilateral lento",
      "Elevaciones de piernas"
    ]
  },
  {
    id: 3,
    name: "Transición al Gimnasio",
    duration: "3 meses",
    months: "Julio - Septiembre 2026",
    description: "Después de seis meses de base, el cuerpo está preparado para carga progresiva pesada.",
    objectives: [
      "Hipertrofia muscular con carga progresiva",
      "Medición precisa del progreso",
      "Reducción del riesgo de lesión",
      "Maximizar resultados estéticos"
    ],
    weeklyStructure: [
      "3 días de gimnasio (por grupos)",
      "2 días de calistenia",
      "1 día de running",
      "1 día de descanso"
    ],
    keyExercises: [
      "Sentadilla libre o prensa",
      "Peso muerto rumano",
      "Press banca",
      "Press inclinado",
      "Jalón al pecho o dominadas",
      "Remo con barra"
    ]
  },
  {
    id: 4,
    name: "Consolidación",
    duration: "3 meses",
    months: "Octubre - Diciembre 2026",
    description: "Consolidar todo lo construido durante el año. Optimizar según objetivo personal.",
    objectives: [
      "Más músculo (hipertrofia)",
      "Más definición",
      "Mejor rendimiento atlético"
    ],
    weeklyStructure: [
      "4 días de gimnasio",
      "1-2 días de calistenia",
      "1 día de running",
      "Descanso activo según carga"
    ],
    keyExercises: [
      "Todos los ejercicios dominados",
      "Personalización según objetivo",
      "Gestión de fatiga y recuperación"
    ]
  }
];

export const exercises: Exercise[] = [
  // PIERNA
  { id: "ex1", name: "Sentadilla goblet", category: "pierna", description: "Sentadilla sosteniendo una mancuerna o kettlebell frente al pecho. Facilita la técnica correcta, activa cuádriceps y glúteos, y protege la espalda.", targetMuscles: ["Cuádriceps", "Glúteos", "Core"] },
  { id: "ex2", name: "Sentadilla con barra", category: "pierna", description: "Sentadilla tradicional con barra sobre la espalda. Ejercicio base de fuerza e hipertrofia para piernas y core.", targetMuscles: ["Cuádriceps", "Glúteos", "Core", "Espalda baja"] },
  { id: "ex3", name: "Prensa de piernas", category: "pierna", description: "Empuje de plataforma con los pies. Permite cargar pesado con menor demanda técnica que la sentadilla.", targetMuscles: ["Cuádriceps", "Glúteos"] },
  { id: "ex4", name: "Zancadas caminando", category: "pierna", description: "Paso largo hacia adelante alternando piernas. Mejora fuerza unilateral, equilibrio y glúteos.", targetMuscles: ["Cuádriceps", "Glúteos", "Isquiotibiales"] },
  { id: "ex5", name: "Sentadilla búlgara", category: "pierna", description: "Una pierna adelantada y la otra elevada atrás. Gran estímulo unilateral para glúteos y cuádriceps.", targetMuscles: ["Cuádriceps", "Glúteos"] },
  { id: "ex6", name: "Peso muerto rumano", category: "pierna", description: "Bisagra de cadera con barra o mancuernas. Enfatiza isquiotibiales y glúteos con control lumbar.", targetMuscles: ["Isquiotibiales", "Glúteos", "Espalda baja"] },
  { id: "ex7", name: "Curl femoral", category: "pierna", description: "Flexión de rodillas en máquina. Aísla los isquiotibiales.", targetMuscles: ["Isquiotibiales"] },
  { id: "ex8", name: "Extensión de cuádriceps", category: "pierna", description: "Extensión de rodillas en máquina. Aísla el cuádriceps.", targetMuscles: ["Cuádriceps"] },
  
  // EMPUJE
  { id: "ex9", name: "Flexiones", category: "empuje", description: "Empuje del cuerpo desde el suelo. Base de fuerza para pecho, hombros y core.", targetMuscles: ["Pecho", "Hombros", "Tríceps", "Core"] },
  { id: "ex10", name: "Flexiones declinadas", category: "empuje", description: "Flexiones con pies elevados. Aumentan la carga sobre pecho superior y hombros.", targetMuscles: ["Pecho superior", "Hombros", "Tríceps"] },
  { id: "ex11", name: "Flexiones diamante", category: "empuje", description: "Manos juntas bajo el pecho. Mayor énfasis en tríceps.", targetMuscles: ["Tríceps", "Pecho", "Hombros"] },
  { id: "ex12", name: "Press banca", category: "empuje", description: "Empuje con barra acostado. Principal ejercicio de hipertrofia de pecho.", targetMuscles: ["Pecho", "Tríceps", "Hombros"] },
  { id: "ex13", name: "Press inclinado", category: "empuje", description: "Press con banca inclinada. Enfatiza pecho superior y hombros anteriores.", targetMuscles: ["Pecho superior", "Hombros", "Tríceps"] },
  { id: "ex14", name: "Press hombro con mancuernas", category: "empuje", description: "Empuje vertical. Desarrolla hombros y estabilidad.", targetMuscles: ["Hombros", "Tríceps"] },
  { id: "ex15", name: "Fondos", category: "empuje", description: "Empuje en paralelas. Excelente para pecho bajo y tríceps.", targetMuscles: ["Pecho", "Tríceps", "Hombros"] },
  { id: "ex16", name: "Extensión de tríceps", category: "empuje", description: "Aislamiento del tríceps para completar el trabajo de empuje.", targetMuscles: ["Tríceps"] },
  
  // TIRÓN
  { id: "ex17", name: "Remo con barra", category: "tiron", description: "Tirón horizontal con barra. Desarrollo completo de espalda media.", targetMuscles: ["Espalda", "Bíceps", "Romboides"] },
  { id: "ex18", name: "Remo con mancuerna", category: "tiron", description: "Remo unilateral. Mejora simetría y control.", targetMuscles: ["Espalda", "Bíceps"] },
  { id: "ex19", name: "Remo unilateral lento", category: "tiron", description: "Versión controlada del remo a una mano. Aumenta tensión y técnica.", targetMuscles: ["Espalda", "Bíceps"] },
  { id: "ex20", name: "Jalón al pecho", category: "tiron", description: "Tirón vertical en máquina. Alternativa a dominadas.", targetMuscles: ["Dorsales", "Bíceps"] },
  { id: "ex21", name: "Dominadas", category: "tiron", description: "Elevación del cuerpo colgado. Ejercicio clave de fuerza relativa.", targetMuscles: ["Dorsales", "Bíceps", "Core"] },
  { id: "ex22", name: "Face pull", category: "tiron", description: "Tirón alto con cuerda. Fortalece hombros posteriores y salud escapular.", targetMuscles: ["Deltoides posterior", "Romboides"] },
  { id: "ex23", name: "Curl de bíceps", category: "tiron", description: "Flexión del codo con barra o mancuernas. Aislamiento del bíceps.", targetMuscles: ["Bíceps"] },
  
  // CORE
  { id: "ex24", name: "Hollow body", category: "core", description: "Posición isométrica en forma de 'banana'. Base del control abdominal.", targetMuscles: ["Abdominales", "Core"] },
  { id: "ex25", name: "Plancha frontal", category: "core", description: "Isométrico de core completo. Estabilidad lumbar.", targetMuscles: ["Core", "Abdominales", "Espalda baja"] },
  { id: "ex26", name: "Plancha lateral", category: "core", description: "Isométrico lateral. Estabilidad de oblicuos y cadera.", targetMuscles: ["Oblicuos", "Core"] },
  { id: "ex27", name: "Elevaciones de piernas en suelo", category: "core", description: "Elevación controlada de piernas acostado. Abdominal inferior.", targetMuscles: ["Abdominales inferiores"] },
  { id: "ex28", name: "Elevaciones de piernas colgado", category: "core", description: "Versión avanzada. Core fuerte y control pélvico.", targetMuscles: ["Abdominales", "Core", "Flexores de cadera"] },
  
  // CARDIO
  { id: "ex29", name: "Running continuo", category: "cardio", description: "Carrera a ritmo constante para construir base aeróbica.", targetMuscles: ["Sistema cardiovascular", "Piernas"] },
  { id: "ex30", name: "Running intervalos", category: "cardio", description: "Alternancia de alta intensidad y recuperación. Mejora cardiovascular y quema de grasa.", targetMuscles: ["Sistema cardiovascular", "Piernas"] },
];

export const categoryLabels: Record<ExerciseCategory, string> = {
  pierna: "Pierna",
  empuje: "Empuje (Pecho, Hombro, Tríceps)",
  tiron: "Tirón (Espalda, Bíceps)",
  core: "Core",
  cardio: "Cardio"
};

export const categoryColors: Record<ExerciseCategory, string> = {
  pierna: "bg-chart-1/20 text-chart-1 border-chart-1/30",
  empuje: "bg-chart-2/20 text-chart-2 border-chart-2/30",
  tiron: "bg-chart-3/20 text-chart-3 border-chart-3/30",
  core: "bg-chart-4/20 text-chart-4 border-chart-4/30",
  cardio: "bg-chart-5/20 text-chart-5 border-chart-5/30"
};
