import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { books as initialBooks, readingBlocks } from "@/data/readingPlan";
import { exercisePhases as initialPhases, exercises as initialExercises } from "@/data/exercisePlan";
import { initialGoals } from "@/data/goals";
import { initialHabits } from "@/data/habits";

export function useSeedData() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const seedData = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("No user");

      // Check if user already has data
      const { count: habitsCount } = await supabase
        .from("habits")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);

      if (habitsCount && habitsCount > 0) {
        return { seeded: false, message: "Data already exists" };
      }

      // Seed habits
      const habitsToInsert = initialHabits.map(h => ({
        user_id: user.id,
        name: h.name,
        description: h.notes || null,
        category: h.category,
        frequency: h.frequency,
        frequency_days: h.targetDays || [],
        time_of_day: h.timeOfDay,
        active: h.active,
      }));
      await supabase.from("habits").insert(habitsToInsert);

      // Seed books
      const booksToInsert = initialBooks.map(b => ({
        user_id: user.id,
        title: b.title,
        author: b.author,
        pages: b.pages,
        week: b.week,
        block: b.blockName,
        start_date: b.startDate,
        end_date: b.endDate,
        completed: false,
        current_page: 0,
        rating: null,
        notes: b.reason || null,
        is_extra: false,
      }));
      await supabase.from("books").insert(booksToInsert);

      // Seed goals
      const goalsToInsert = initialGoals.map(g => ({
        user_id: user.id,
        title: g.title,
        description: g.description,
        category: g.category,
        status: "not_started",
        has_monthly_tracking: g.title.toLowerCase().includes("receta") || g.title.toLowerCase().includes("mes"),
        progress: 0,
        completed: false,
        notes: null,
      }));
      await supabase.from("goals").insert(goalsToInsert);

      // Seed exercise phases
      const phasesToInsert = initialPhases.map(p => ({
        user_id: user.id,
        name: p.name,
        description: p.description,
        phase_number: p.id,
      }));
      await supabase.from("exercise_phases").insert(phasesToInsert);

      // Seed exercises
      const exercisesToInsert = initialExercises.map(e => ({
        user_id: user.id,
        name: e.name,
        category: e.category,
        description: e.description,
        target_muscles: e.targetMuscles || [],
      }));
      await supabase.from("exercises").insert(exercisesToInsert);

      return { seeded: true, message: "Data seeded successfully" };
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return { seedData };
}
