// Habits Data
export interface Habit {
  id: string;
  name: string;
  category: HabitCategory;
  frequency: "daily" | "weekly" | "monthly";
  targetDays?: number[]; // 0-6, Sunday to Saturday
  timeOfDay?: "morning" | "afternoon" | "evening" | "anytime";
  currentStreak: number;
  longestStreak: number;
  completedDates: string[];
  notes: string;
  active: boolean;
}

export type HabitCategory = "lectura" | "ejercicio" | "salud" | "productividad" | "aprendizaje" | "personal";

export const habitCategories: Record<HabitCategory, { label: string; color: string; icon: string }> = {
  lectura: { label: "Lectura", color: "bg-amber-500/20 text-amber-500 border-amber-500/30", icon: "📚" },
  ejercicio: { label: "Ejercicio", color: "bg-emerald-500/20 text-emerald-500 border-emerald-500/30", icon: "💪" },
  salud: { label: "Salud", color: "bg-rose-500/20 text-rose-500 border-rose-500/30", icon: "❤️" },
  productividad: { label: "Productividad", color: "bg-blue-500/20 text-blue-500 border-blue-500/30", icon: "⚡" },
  aprendizaje: { label: "Aprendizaje", color: "bg-purple-500/20 text-purple-500 border-purple-500/30", icon: "🧠" },
  personal: { label: "Personal", color: "bg-cyan-500/20 text-cyan-500 border-cyan-500/30", icon: "🌟" },
};

export const initialHabits: Habit[] = [
  {
    id: "h1",
    name: "Lectura diaria (30 min)",
    category: "lectura",
    frequency: "daily",
    timeOfDay: "evening",
    currentStreak: 0,
    longestStreak: 0,
    completedDates: [],
    notes: "Plan de 52 libros anuales",
    active: true
  },
  {
    id: "h2",
    name: "Entrenamiento de fuerza",
    category: "ejercicio",
    frequency: "weekly",
    targetDays: [1, 2, 4, 5], // Lun, Mar, Jue, Vie
    timeOfDay: "morning",
    currentStreak: 0,
    longestStreak: 0,
    completedDates: [],
    notes: "4 días por semana según fase actual",
    active: true
  },
  {
    id: "h3",
    name: "Running",
    category: "ejercicio",
    frequency: "weekly",
    targetDays: [3, 6], // Mié, Sáb
    timeOfDay: "morning",
    currentStreak: 0,
    longestStreak: 0,
    completedDates: [],
    notes: "2 días por semana: 1 continuo + 1 intervalos",
    active: true
  },
  {
    id: "h4",
    name: "Estudio de italiano",
    category: "aprendizaje",
    frequency: "daily",
    timeOfDay: "afternoon",
    currentStreak: 0,
    longestStreak: 0,
    completedDates: [],
    notes: "Meta: nivel B2 en 2026",
    active: true
  },
  {
    id: "h5",
    name: "Revisión financiera",
    category: "productividad",
    frequency: "monthly",
    timeOfDay: "anytime",
    currentStreak: 0,
    longestStreak: 0,
    completedDates: [],
    notes: "Ingresos, gastos y ahorro",
    active: true
  },
  {
    id: "h6",
    name: "Usar MAGI",
    category: "productividad",
    frequency: "daily",
    timeOfDay: "morning",
    currentStreak: 0,
    longestStreak: 0,
    completedDates: [],
    notes: "Sistema de productividad personal",
    active: true
  },
  {
    id: "h7",
    name: "Receta nueva del mes",
    category: "personal",
    frequency: "monthly",
    timeOfDay: "anytime",
    currentStreak: 0,
    longestStreak: 0,
    completedDates: [],
    notes: "Dominar 12 recetas nuevas en el año",
    active: true
  },
  {
    id: "h8",
    name: "Descanso activo",
    category: "salud",
    frequency: "weekly",
    targetDays: [0], // Domingo
    timeOfDay: "anytime",
    currentStreak: 0,
    longestStreak: 0,
    completedDates: [],
    notes: "Movilidad, caminata, estiramientos",
    active: true
  }
];
