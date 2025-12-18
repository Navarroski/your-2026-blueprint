import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Habit, initialHabits } from "@/data/habits";
import { Goal, initialGoals } from "@/data/goals";
import { Book, books as initialBooks } from "@/data/readingPlan";
import { WorkoutLog } from "@/data/exercisePlan";

interface CheckIn {
  date: string;
  habits: string[];
  mood: 1 | 2 | 3 | 4 | 5;
  notes: string;
  readingCompleted: boolean;
  exerciseCompleted: boolean;
}

interface AppState {
  habits: Habit[];
  goals: Goal[];
  books: Book[];
  workoutLogs: WorkoutLog[];
  checkIns: CheckIn[];
  darkMode: boolean;
}

interface AppContextType extends AppState {
  setHabits: (habits: Habit[]) => void;
  setGoals: (goals: Goal[]) => void;
  setBooks: (books: Book[]) => void;
  setWorkoutLogs: (logs: WorkoutLog[]) => void;
  addCheckIn: (checkIn: CheckIn) => void;
  toggleDarkMode: () => void;
  toggleHabitComplete: (habitId: string, date: string) => void;
  toggleBookComplete: (bookId: string) => void;
  updateGoalProgress: (goalId: string, progress: number) => void;
  getStreakForHabit: (habitId: string) => number;
  getTodayCompletion: () => { completed: number; total: number; percentage: number };
  getWeeklyStats: () => { completed: number; total: number };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = "magi_2026_state";

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return {
            ...parsed,
            darkMode: parsed.darkMode ?? true,
          };
        } catch {
          // ignore
        }
      }
    }
    return {
      habits: initialHabits,
      goals: initialGoals,
      books: initialBooks,
      workoutLogs: [],
      checkIns: [],
      darkMode: true,
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [state.darkMode]);

  const setHabits = (habits: Habit[]) => setState((s) => ({ ...s, habits }));
  const setGoals = (goals: Goal[]) => setState((s) => ({ ...s, goals }));
  const setBooks = (books: Book[]) => setState((s) => ({ ...s, books }));
  const setWorkoutLogs = (workoutLogs: WorkoutLog[]) => setState((s) => ({ ...s, workoutLogs }));
  
  const addCheckIn = (checkIn: CheckIn) => {
    setState((s) => ({
      ...s,
      checkIns: [...s.checkIns.filter(c => c.date !== checkIn.date), checkIn],
    }));
  };

  const toggleDarkMode = () => setState((s) => ({ ...s, darkMode: !s.darkMode }));

  const toggleHabitComplete = (habitId: string, date: string) => {
    setState((s) => ({
      ...s,
      habits: s.habits.map((h) => {
        if (h.id !== habitId) return h;
        const isCompleted = h.completedDates.includes(date);
        const newDates = isCompleted
          ? h.completedDates.filter((d) => d !== date)
          : [...h.completedDates, date];
        return { ...h, completedDates: newDates };
      }),
    }));
  };

  const toggleBookComplete = (bookId: string) => {
    setState((s) => ({
      ...s,
      books: s.books.map((b) =>
        b.id === bookId ? { ...b, completed: !b.completed } : b
      ),
    }));
  };

  const updateGoalProgress = (goalId: string, progress: number) => {
    setState((s) => ({
      ...s,
      goals: s.goals.map((g) =>
        g.id === goalId
          ? {
              ...g,
              progress,
              status: progress === 100 ? "completed" : progress > 0 ? "in_progress" : "not_started",
            }
          : g
      ),
    }));
  };

  const getStreakForHabit = (habitId: string): number => {
    const habit = state.habits.find((h) => h.id === habitId);
    if (!habit) return 0;
    
    const sortedDates = [...habit.completedDates].sort().reverse();
    if (sortedDates.length === 0) return 0;
    
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      const dateStr = checkDate.toISOString().split("T")[0];
      
      if (sortedDates.includes(dateStr)) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }
    
    return streak;
  };

  const getTodayCompletion = () => {
    const today = new Date().toISOString().split("T")[0];
    const dailyHabits = state.habits.filter(
      (h) => h.active && h.frequency === "daily"
    );
    const completed = dailyHabits.filter((h) =>
      h.completedDates.includes(today)
    ).length;
    const total = dailyHabits.length;
    return {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  };

  const getWeeklyStats = () => {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    
    let completed = 0;
    let total = 0;
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      const dateStr = date.toISOString().split("T")[0];
      
      state.habits.forEach((h) => {
        if (!h.active) return;
        if (h.frequency === "daily") {
          total++;
          if (h.completedDates.includes(dateStr)) completed++;
        } else if (h.frequency === "weekly" && h.targetDays?.includes(date.getDay())) {
          total++;
          if (h.completedDates.includes(dateStr)) completed++;
        }
      });
    }
    
    return { completed, total };
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        setHabits,
        setGoals,
        setBooks,
        setWorkoutLogs,
        addCheckIn,
        toggleDarkMode,
        toggleHabitComplete,
        toggleBookComplete,
        updateGoalProgress,
        getStreakForHabit,
        getTodayCompletion,
        getWeeklyStats,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
