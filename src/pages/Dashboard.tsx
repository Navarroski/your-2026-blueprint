import { useApp } from "@/context/AppContext";
import { MainLayout } from "@/components/layout/MainLayout";
import { StatCard } from "@/components/ui/stat-card";
import { ProgressRing } from "@/components/ui/progress-ring";
import { StreakBadge } from "@/components/ui/streak-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
  BookOpen,
  Dumbbell,
  Target,
  CheckSquare,
  Flame,
  Calendar,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { format, differenceInDays, parseISO, startOfYear } from "date-fns";
import { es } from "date-fns/locale";

export default function Dashboard() {
  const {
    habits,
    books,
    goals,
    toggleHabitComplete,
    getTodayCompletion,
    getWeeklyStats,
    getStreakForHabit,
  } = useApp();

  const today = new Date();
  const todayStr = format(today, "yyyy-MM-dd");
  const { completed: todayCompleted, total: todayTotal, percentage } = getTodayCompletion();
  const weeklyStats = getWeeklyStats();
  
  // Calculate days in year
  const yearStart = new Date(2026, 0, 1);
  const yearEnd = new Date(2026, 11, 31);
  const totalDays = differenceInDays(yearEnd, yearStart) + 1;
  const daysElapsed = Math.max(0, differenceInDays(today, yearStart) + 1);
  const yearProgress = Math.min((daysElapsed / totalDays) * 100, 100);

  // Current book
  const currentBook = books.find((b) => {
    const start = parseISO(b.startDate);
    const end = parseISO(b.endDate);
    return today >= start && today <= end && !b.completed;
  }) || books.find((b) => !b.completed);

  // Books completed
  const booksCompleted = books.filter((b) => b.completed).length;

  // Goals progress
  const principalGoals = goals.filter((g) => g.category === "principal");
  const goalsInProgress = principalGoals.filter((g) => g.status === "in_progress").length;
  const goalsCompleted = principalGoals.filter((g) => g.status === "completed").length;

  // Daily habits for today
  const dailyHabits = habits.filter((h) => h.active && h.frequency === "daily");

  // Best streak
  const bestStreak = Math.max(...habits.map((h) => getStreakForHabit(h.id)), 0);

  // Current phase based on date
  const getCurrentPhase = () => {
    const month = today.getMonth();
    if (month < 3) return { phase: 1, name: "Calistenia + Cargas" };
    if (month < 6) return { phase: 2, name: "Calistenia Avanzada" };
    if (month < 9) return { phase: 3, name: "Transición Gimnasio" };
    return { phase: 4, name: "Consolidación" };
  };
  const currentPhase = getCurrentPhase();

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold">
              Buenos días, Miguel
            </h1>
            <p className="text-muted-foreground mt-1">
              {format(today, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <StreakBadge count={bestStreak} size="lg" />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Progreso hoy"
            value={`${todayCompleted}/${todayTotal}`}
            subtitle="hábitos completados"
            icon={CheckSquare}
            variant="primary"
          />
          <StatCard
            title="Libros leídos"
            value={booksCompleted}
            subtitle={`de 52 (${Math.round((booksCompleted / 52) * 100)}%)`}
            icon={BookOpen}
          />
          <StatCard
            title="Objetivos"
            value={goalsCompleted}
            subtitle={`de ${principalGoals.length} principales`}
            icon={Target}
          />
          <StatCard
            title="Fase actual"
            value={`Fase ${currentPhase.phase}`}
            subtitle={currentPhase.name}
            icon={Dumbbell}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Today's Progress */}
          <Card className="lg:col-span-2 card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-display">Hábitos de hoy</CardTitle>
              <Link to="/habits">
                <Button variant="ghost" size="sm" className="gap-1">
                  Ver todos <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {dailyHabits.slice(0, 5).map((habit) => {
                const isCompleted = habit.completedDates.includes(todayStr);
                const streak = getStreakForHabit(habit.id);
                return (
                  <div
                    key={habit.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={isCompleted}
                        onCheckedChange={() => toggleHabitComplete(habit.id, todayStr)}
                        className="h-5 w-5"
                      />
                      <div>
                        <p className={`font-medium ${isCompleted ? "line-through text-muted-foreground" : ""}`}>
                          {habit.name}
                        </p>
                        <p className="text-xs text-muted-foreground">{habit.notes}</p>
                      </div>
                    </div>
                    {streak > 0 && <StreakBadge count={streak} size="sm" />}
                  </div>
                );
              })}
              {dailyHabits.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No hay hábitos diarios configurados
                </p>
              )}
            </CardContent>
          </Card>

          {/* Year Progress */}
          <Card className="card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-display flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Progreso 2026
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center py-4">
              <ProgressRing
                value={yearProgress}
                size={140}
                strokeWidth={12}
                label="del año"
              />
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Día {daysElapsed} de {totalDays}
                </p>
              </div>
              <div className="w-full mt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Semana actual</span>
                  <span className="font-medium">
                    {weeklyStats.completed}/{weeklyStats.total}
                  </span>
                </div>
                <Progress
                  value={(weeklyStats.completed / Math.max(weeklyStats.total, 1)) * 100}
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Book & Goals */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Current Book */}
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-display flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Lectura actual
              </CardTitle>
              <Link to="/reading">
                <Button variant="ghost" size="sm" className="gap-1">
                  Ver plan <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {currentBook ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-display font-semibold">
                      {currentBook.title}
                    </h3>
                    <p className="text-muted-foreground">{currentBook.author}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Semana {currentBook.week}</Badge>
                    <Badge variant="outline">{currentBook.pages} páginas</Badge>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                      {currentBook.blockName}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {currentBook.reason}
                  </p>
                  <div className="text-sm text-muted-foreground">
                    {format(parseISO(currentBook.startDate), "d MMM", { locale: es })} -{" "}
                    {format(parseISO(currentBook.endDate), "d MMM", { locale: es })}
                  </div>
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No hay libro asignado para esta semana
                </p>
              )}
            </CardContent>
          </Card>

          {/* Goals Overview */}
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-display flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Objetivos principales
              </CardTitle>
              <Link to="/goals">
                <Button variant="ghost" size="sm" className="gap-1">
                  Ver todos <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {principalGoals.slice(0, 4).map((goal) => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium truncate pr-4">{goal.title}</p>
                    <Badge
                      variant={
                        goal.status === "completed"
                          ? "default"
                          : goal.status === "in_progress"
                          ? "secondary"
                          : "outline"
                      }
                      className={
                        goal.status === "completed"
                          ? "bg-success text-success-foreground"
                          : ""
                      }
                    >
                      {goal.progress}%
                    </Badge>
                  </div>
                  <Progress value={goal.progress} className="h-1.5" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/habits" className="block">
            <Card className="p-4 card-hover cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <CheckSquare className="h-5 w-5 text-primary" />
                </div>
                <span className="font-medium">Check-in diario</span>
              </div>
            </Card>
          </Link>
          <Link to="/exercise" className="block">
            <Card className="p-4 card-hover cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-success/10 group-hover:bg-success/20 transition-colors">
                  <Dumbbell className="h-5 w-5 text-success" />
                </div>
                <span className="font-medium">Registrar entreno</span>
              </div>
            </Card>
          </Link>
          <Link to="/reading" className="block">
            <Card className="p-4 card-hover cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-chart-3/10 group-hover:bg-chart-3/20 transition-colors">
                  <BookOpen className="h-5 w-5 text-chart-3" />
                </div>
                <span className="font-medium">Actualizar lectura</span>
              </div>
            </Card>
          </Link>
          <Link to="/goals" className="block">
            <Card className="p-4 card-hover cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-chart-4/10 group-hover:bg-chart-4/20 transition-colors">
                  <TrendingUp className="h-5 w-5 text-chart-4" />
                </div>
                <span className="font-medium">Ver progreso</span>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
