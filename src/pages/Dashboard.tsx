import { useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StatCard } from "@/components/ui/stat-card";
import { StreakBadge } from "@/components/ui/streak-badge";
import { useAuth } from "@/hooks/useAuth";
import { useSeedData } from "@/hooks/useSeedData";
import { useHabits, useHabitCheckins, useBooks, useGoals, useMoodLogs, useHabitMutations } from "@/hooks/useCloudData";
import { format, subDays } from "date-fns";
import { es } from "date-fns/locale";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Target, BookOpen, Dumbbell, Flame, Calendar, CheckCircle2, Brain } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const { seedData } = useSeedData();
  const { data: habits = [], isLoading: habitsLoading } = useHabits();
  const { data: habitCheckins = [] } = useHabitCheckins();
  const { data: books = [] } = useBooks();
  const { data: goals = [] } = useGoals();
  const { data: moodLogs = [] } = useMoodLogs();
  const { toggleCheckin } = useHabitMutations();

  const today = format(new Date(), "yyyy-MM-dd");
  const todayCheckins = habitCheckins.filter(c => c.date === today && c.completed);

  useEffect(() => {
    if (user && habits.length === 0 && !habitsLoading) {
      seedData.mutate();
    }
  }, [user, habits.length, habitsLoading]);

  const dailyHabits = habits.filter(h => h.active && h.frequency === "daily");
  const completedToday = todayCheckins.length;
  const totalToday = dailyHabits.length;
  const completionPercentage = totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0;
  const completedBooks = books.filter(b => b.completed).length;
  const totalBooks = books.filter(b => !b.is_extra).length;
  const completedGoals = goals.filter(g => g.status === "completed").length;

  const getStreak = () => {
    let streak = 0;
    for (let i = 0; i < 365; i++) {
      const date = format(subDays(new Date(), i), "yyyy-MM-dd");
      if (habitCheckins.some(c => c.date === date && c.completed)) streak++;
      else if (i > 0) break;
    }
    return streak;
  };

  const streak = getStreak();
  const todayMood = moodLogs.find(m => m.date === today);
  const currentBook = books.find(b => !b.completed && b.start_date && b.end_date && new Date() >= new Date(b.start_date) && new Date() <= new Date(b.end_date));

  const handleToggleHabit = (habitId: string, isCompleted: boolean) => {
    toggleCheckin.mutate({ habitId, date: today, completed: !isCompleted });
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold">Buenos días</h1>
            <p className="text-muted-foreground mt-1">{format(new Date(), "EEEE, d 'de' MMMM yyyy", { locale: es })}</p>
          </div>
          <div className="flex items-center gap-3">
            <StreakBadge count={streak} />
            <Link to="/mood">
              <Button variant="outline" className="gap-2">
                <Brain className="h-4 w-4" />
                {todayMood ? `Mood: ${todayMood.mood_score}` : "Registrar mood"}
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Hábitos hoy" value={`${completedToday}/${totalToday}`} subtitle={`${completionPercentage}% completado`} icon={CheckCircle2} />
          <StatCard title="Libros leídos" value={`${completedBooks}/${totalBooks}`} subtitle={`${Math.round((completedBooks / Math.max(totalBooks, 1)) * 100)}% del plan`} icon={BookOpen} />
          <StatCard title="Objetivos" value={`${completedGoals}/${goals.length}`} subtitle="completados" icon={Target} />
          <StatCard title="Racha actual" value={`${streak} días`} subtitle="consecutivos" icon={Flame} />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-display">Hábitos de hoy</CardTitle>
              <Link to="/habits"><Button variant="ghost" size="sm">Ver todos</Button></Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {dailyHabits.slice(0, 6).map((habit) => {
                const isCompleted = todayCheckins.some(c => c.habit_id === habit.id);
                return (
                  <div key={habit.id} className={cn("flex items-center gap-4 p-3 rounded-lg transition-colors", isCompleted ? "bg-success/10" : "bg-muted/50 hover:bg-muted")}>
                    <Checkbox checked={isCompleted} onCheckedChange={() => handleToggleHabit(habit.id, isCompleted)} className="h-5 w-5" />
                    <span className={cn("flex-1 font-medium", isCompleted && "line-through text-muted-foreground")}>{habit.name}</span>
                  </div>
                );
              })}
              {dailyHabits.length === 0 && <p className="text-center text-muted-foreground py-4">Cargando hábitos...</p>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-display">Lectura actual</CardTitle>
              <Link to="/reading"><Button variant="ghost" size="sm">Ver plan</Button></Link>
            </CardHeader>
            <CardContent>
              {currentBook ? (
                <div className="space-y-3">
                  <h3 className="font-semibold">{currentBook.title}</h3>
                  <p className="text-sm text-muted-foreground">{currentBook.author}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span>{currentBook.pages} páginas</span>
                    <span className="text-muted-foreground">Semana {currentBook.week}</span>
                  </div>
                  <Progress value={(currentBook.current_page / (currentBook.pages || 1)) * 100} className="h-2" />
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-4">No hay libro en curso</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link to="/habits"><Button variant="outline" className="w-full h-auto py-4 flex-col gap-2"><CheckCircle2 className="h-5 w-5" /><span>Hábitos</span></Button></Link>
          <Link to="/reading"><Button variant="outline" className="w-full h-auto py-4 flex-col gap-2"><BookOpen className="h-5 w-5" /><span>Lectura</span></Button></Link>
          <Link to="/exercise"><Button variant="outline" className="w-full h-auto py-4 flex-col gap-2"><Dumbbell className="h-5 w-5" /><span>Ejercicio</span></Button></Link>
          <Link to="/calendar"><Button variant="outline" className="w-full h-auto py-4 flex-col gap-2"><Calendar className="h-5 w-5" /><span>Calendario</span></Button></Link>
        </div>
      </div>
    </MainLayout>
  );
}
