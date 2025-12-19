import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useToast } from "./use-toast";

// Types
export interface Habit {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  category: string;
  frequency: string;
  frequency_days: number[];
  time_of_day: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface HabitCheckin {
  id: string;
  user_id: string;
  habit_id: string;
  date: string;
  completed: boolean;
  notes: string | null;
}

export interface Book {
  id: string;
  user_id: string;
  title: string;
  author: string | null;
  pages: number | null;
  week: number | null;
  block: string | null;
  start_date: string | null;
  end_date: string | null;
  completed: boolean;
  completed_date: string | null;
  current_page: number;
  rating: number | null;
  notes: string | null;
  is_extra: boolean;
}

export interface Goal {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  category: string;
  status: string;
  has_monthly_tracking: boolean;
  progress: number;
  completed: boolean;
  completed_date: string | null;
  notes: string | null;
}

export interface GoalMonthlyTracking {
  id: string;
  user_id: string;
  goal_id: string;
  month: number;
  completed: boolean;
  value: string | null;
  notes: string | null;
}

export interface MoodLog {
  id: string;
  user_id: string;
  date: string;
  mood_score: number;
  energy_level: number | null;
  stress_level: number | null;
  notes: string | null;
}

export interface DailyCheckin {
  id: string;
  user_id: string;
  date: string;
  notes: string | null;
}

export interface Exercise {
  id: string;
  user_id: string;
  name: string;
  category: string | null;
  description: string | null;
  target_muscles: string[];
}

export interface ExercisePhase {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  start_date: string | null;
  end_date: string | null;
  phase_number: number | null;
}

export interface WorkoutLog {
  id: string;
  user_id: string;
  date: string;
  phase_id: string | null;
  exercise_id: string | null;
  exercise_name: string | null;
  sets: number | null;
  reps: number | null;
  weight: number | null;
  rpe: number | null;
  duration_minutes: number | null;
  distance_km: number | null;
  notes: string | null;
}

// Habits hooks
export function useHabits() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["habits", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("habits")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data as Habit[];
    },
    enabled: !!user,
  });
}

export function useHabitCheckins(date?: string) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["habit_checkins", user?.id, date],
    queryFn: async () => {
      if (!user) return [];
      let query = supabase
        .from("habit_checkins")
        .select("*")
        .eq("user_id", user.id);
      if (date) {
        query = query.eq("date", date);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data as HabitCheckin[];
    },
    enabled: !!user,
  });
}

export function useHabitMutations() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createHabit = useMutation({
    mutationFn: async (habit: Omit<Habit, "id" | "user_id" | "created_at" | "updated_at">) => {
      if (!user) throw new Error("No user");
      const { data, error } = await supabase
        .from("habits")
        .insert({ ...habit, user_id: user.id })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      toast({ title: "Hábito creado" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateHabit = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Habit> & { id: string }) => {
      const { data, error } = await supabase
        .from("habits")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });

  const deleteHabit = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("habits").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      toast({ title: "Hábito eliminado" });
    },
  });

  const toggleCheckin = useMutation({
    mutationFn: async ({ habitId, date, completed }: { habitId: string; date: string; completed: boolean }) => {
      if (!user) throw new Error("No user");
      if (completed) {
        const { error } = await supabase
          .from("habit_checkins")
          .upsert({ habit_id: habitId, date, user_id: user.id, completed: true }, { onConflict: "habit_id,date" });
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("habit_checkins")
          .delete()
          .eq("habit_id", habitId)
          .eq("date", date);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habit_checkins"] });
    },
  });

  return { createHabit, updateHabit, deleteHabit, toggleCheckin };
}

// Books hooks
export function useBooks() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["books", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("user_id", user.id)
        .order("week", { ascending: true, nullsFirst: false });
      if (error) throw error;
      return data as Book[];
    },
    enabled: !!user,
  });
}

export function useBookMutations() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createBook = useMutation({
    mutationFn: async (book: Omit<Book, "id" | "user_id">) => {
      if (!user) throw new Error("No user");
      const { data, error } = await supabase
        .from("books")
        .insert({ ...book, user_id: user.id })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast({ title: "Libro agregado" });
    },
  });

  const updateBook = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Book> & { id: string }) => {
      const { data, error } = await supabase
        .from("books")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });

  const deleteBook = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("books").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast({ title: "Libro eliminado" });
    },
  });

  return { createBook, updateBook, deleteBook };
}

// Goals hooks
export function useGoals() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["goals", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("goals")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data as Goal[];
    },
    enabled: !!user,
  });
}

export function useGoalMonthlyTracking(goalId?: string) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["goal_monthly_tracking", user?.id, goalId],
    queryFn: async () => {
      if (!user) return [];
      let query = supabase
        .from("goal_monthly_tracking")
        .select("*")
        .eq("user_id", user.id);
      if (goalId) {
        query = query.eq("goal_id", goalId);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data as GoalMonthlyTracking[];
    },
    enabled: !!user,
  });
}

export function useGoalMutations() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createGoal = useMutation({
    mutationFn: async (goal: Omit<Goal, "id" | "user_id">) => {
      if (!user) throw new Error("No user");
      const { data, error } = await supabase
        .from("goals")
        .insert({ ...goal, user_id: user.id })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      toast({ title: "Objetivo creado" });
    },
  });

  const updateGoal = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Goal> & { id: string }) => {
      const { data, error } = await supabase
        .from("goals")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });

  const toggleMonthlyTracking = useMutation({
    mutationFn: async ({ goalId, month, completed, value }: { goalId: string; month: number; completed: boolean; value?: string }) => {
      if (!user) throw new Error("No user");
      const { error } = await supabase
        .from("goal_monthly_tracking")
        .upsert({ goal_id: goalId, month, user_id: user.id, completed, value }, { onConflict: "goal_id,month" });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goal_monthly_tracking"] });
    },
  });

  return { createGoal, updateGoal, toggleMonthlyTracking };
}

// Mood hooks
export function useMoodLogs() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["mood_logs", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("mood_logs")
        .select("*")
        .eq("user_id", user.id)
        .order("date", { ascending: false });
      if (error) throw error;
      return data as MoodLog[];
    },
    enabled: !!user,
  });
}

export function useMoodMutations() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const upsertMood = useMutation({
    mutationFn: async (mood: Omit<MoodLog, "id" | "user_id">) => {
      if (!user) throw new Error("No user");
      const { data, error } = await supabase
        .from("mood_logs")
        .upsert({ ...mood, user_id: user.id }, { onConflict: "user_id,date" })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mood_logs"] });
    },
  });

  return { upsertMood };
}

// Workout hooks
export function useWorkoutLogs() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["workout_logs", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("workout_logs")
        .select("*")
        .eq("user_id", user.id)
        .order("date", { ascending: false });
      if (error) throw error;
      return data as WorkoutLog[];
    },
    enabled: !!user,
  });
}

export function useExercises() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["exercises", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("exercises")
        .select("*")
        .eq("user_id", user.id)
        .order("name", { ascending: true });
      if (error) throw error;
      return data as Exercise[];
    },
    enabled: !!user,
  });
}

export function useExercisePhases() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["exercise_phases", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("exercise_phases")
        .select("*")
        .eq("user_id", user.id)
        .order("phase_number", { ascending: true });
      if (error) throw error;
      return data as ExercisePhase[];
    },
    enabled: !!user,
  });
}

export function useWorkoutMutations() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createWorkoutLog = useMutation({
    mutationFn: async (log: Omit<WorkoutLog, "id" | "user_id">) => {
      if (!user) throw new Error("No user");
      const { data, error } = await supabase
        .from("workout_logs")
        .insert({ ...log, user_id: user.id })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workout_logs"] });
      toast({ title: "Entrenamiento registrado" });
    },
  });

  return { createWorkoutLog };
}

// Daily checkins
export function useDailyCheckins() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["daily_checkins", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("daily_checkins")
        .select("*")
        .eq("user_id", user.id)
        .order("date", { ascending: false });
      if (error) throw error;
      return data as DailyCheckin[];
    },
    enabled: !!user,
  });
}

export function useDailyCheckinMutations() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const upsertCheckin = useMutation({
    mutationFn: async (checkin: Omit<DailyCheckin, "id" | "user_id">) => {
      if (!user) throw new Error("No user");
      const { data, error } = await supabase
        .from("daily_checkins")
        .upsert({ ...checkin, user_id: user.id }, { onConflict: "user_id,date" })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["daily_checkins"] });
    },
  });

  return { upsertCheckin };
}
