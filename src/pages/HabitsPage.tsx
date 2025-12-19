import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { StreakBadge } from "@/components/ui/streak-badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Search, Filter, Flame, Clock, Calendar, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { format, subDays, addDays } from "date-fns";
import { es } from "date-fns/locale";
import { useHabits, useHabitCheckins, useHabitMutations, Habit } from "@/hooks/useCloudData";
import { cn } from "@/lib/utils";

const categoryLabels: Record<string, { label: string; color: string }> = {
  personal: { label: "Personal", color: "bg-primary/10 text-primary border-primary/30" },
  health: { label: "Salud", color: "bg-success/10 text-success border-success/30" },
  work: { label: "Trabajo", color: "bg-chart-3/10 text-chart-3 border-chart-3/30" },
  learning: { label: "Aprendizaje", color: "bg-chart-4/10 text-chart-4 border-chart-4/30" },
  finance: { label: "Finanzas", color: "bg-warning/10 text-warning border-warning/30" },
  social: { label: "Social", color: "bg-chart-5/10 text-chart-5 border-chart-5/30" },
  general: { label: "General", color: "bg-muted text-muted-foreground" },
};

export default function HabitsPage() {
  const { data: habits = [], isLoading } = useHabits();
  const { data: allCheckins = [] } = useHabitCheckins();
  const { createHabit, updateHabit, deleteHabit, toggleCheckin } = useHabitMutations();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isAddingHabit, setIsAddingHabit] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [newHabit, setNewHabit] = useState({
    name: "",
    category: "personal",
    frequency: "daily",
    time_of_day: "anytime",
    description: "",
  });

  const dateStr = format(selectedDate, "yyyy-MM-dd");

  const filteredHabits = habits.filter((h) => {
    if (!h.active) return false;
    if (search && !h.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (categoryFilter !== "all" && h.category !== categoryFilter) return false;
    
    if (h.frequency === "weekly" && h.frequency_days.length > 0) {
      return h.frequency_days.includes(selectedDate.getDay());
    }
    
    return h.frequency === "daily" || h.frequency === "monthly";
  });

  const handleAddHabit = () => {
    createHabit.mutate({
      name: newHabit.name,
      category: newHabit.category,
      frequency: newHabit.frequency,
      time_of_day: newHabit.time_of_day,
      description: newHabit.description || null,
      frequency_days: [],
      active: true,
    });
    setNewHabit({ name: "", category: "personal", frequency: "daily", time_of_day: "anytime", description: "" });
    setIsAddingHabit(false);
  };

  const handleUpdateHabit = () => {
    if (!editingHabit) return;
    updateHabit.mutate({
      id: editingHabit.id,
      name: editingHabit.name,
      category: editingHabit.category,
      frequency: editingHabit.frequency,
      time_of_day: editingHabit.time_of_day,
      description: editingHabit.description,
    });
    setEditingHabit(null);
  };

  const handleDeleteHabit = (id: string) => {
    if (confirm("¿Eliminar este hábito?")) {
      deleteHabit.mutate(id);
    }
  };

  const handleToggleComplete = (habitId: string, isCompleted: boolean) => {
    toggleCheckin.mutate({ habitId, date: dateStr, completed: !isCompleted });
  };

  // Calculate streak for habit
  const getStreakForHabit = (habitId: string): number => {
    const habitCheckins = allCheckins.filter(c => c.habit_id === habitId && c.completed);
    const sortedDates = habitCheckins.map(c => c.date).sort().reverse();
    if (sortedDates.length === 0) return 0;
    
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      const checkDateStr = format(checkDate, "yyyy-MM-dd");
      
      if (sortedDates.includes(checkDateStr)) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }
    return streak;
  };

  const last7Days = Array.from({ length: 7 }, (_, i) => subDays(selectedDate, 6 - i));

  // Stats
  const todayHabits = filteredHabits.filter(h => h.frequency === "daily").length;
  const dayCheckins = allCheckins.filter(c => c.date === dateStr && c.completed);
  const completedToday = dayCheckins.length;
  const totalStreakDays = habits.reduce((acc, h) => acc + getStreakForHabit(h.id), 0);

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold">Hábitos</h1>
            <p className="text-muted-foreground mt-1">
              Seguimiento de tus hábitos diarios y semanales
            </p>
          </div>
          <Dialog open={isAddingHabit} onOpenChange={setIsAddingHabit}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nuevo hábito
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="font-display">Agregar nuevo hábito</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nombre</label>
                  <Input
                    value={newHabit.name}
                    onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
                    placeholder="Ej: Meditar 10 minutos"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Categoría</label>
                    <Select value={newHabit.category} onValueChange={(v) => setNewHabit({ ...newHabit, category: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {Object.entries(categoryLabels).map(([key, { label }]) => (
                          <SelectItem key={key} value={key}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Frecuencia</label>
                    <Select value={newHabit.frequency} onValueChange={(v) => setNewHabit({ ...newHabit, frequency: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Diario</SelectItem>
                        <SelectItem value="weekly">Semanal</SelectItem>
                        <SelectItem value="monthly">Mensual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Momento del día</label>
                  <Select value={newHabit.time_of_day} onValueChange={(v) => setNewHabit({ ...newHabit, time_of_day: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Mañana</SelectItem>
                      <SelectItem value="afternoon">Tarde</SelectItem>
                      <SelectItem value="evening">Noche</SelectItem>
                      <SelectItem value="anytime">Cualquier hora</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Descripción</label>
                  <Textarea
                    value={newHabit.description}
                    onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
                    placeholder="Descripción o recordatorio..."
                    rows={2}
                  />
                </div>
                <Button onClick={handleAddHabit} className="w-full" disabled={!newHabit.name || createHabit.isPending}>
                  Agregar hábito
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Flame className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold">{totalStreakDays}</p>
                <p className="text-xs text-muted-foreground">Total rachas</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Calendar className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold">{completedToday}/{todayHabits}</p>
                <p className="text-xs text-muted-foreground">Hoy completados</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-chart-3/10">
                <Clock className="h-5 w-5 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold">{habits.filter(h => h.active).length}</p>
                <p className="text-xs text-muted-foreground">Hábitos activos</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-chart-4/10">
                <Flame className="h-5 w-5 text-chart-4" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold">
                  {Math.max(...habits.map(h => getStreakForHabit(h.id)), 0)}
                </p>
                <p className="text-xs text-muted-foreground">Mejor racha</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Mini Calendar */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold">Últimos 7 días</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedDate(subDays(selectedDate, 7))}>
                Anterior
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSelectedDate(new Date())}>
                Hoy
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSelectedDate(addDays(selectedDate, 7))}>
                Siguiente
              </Button>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {last7Days.map((day) => {
              const dayStr = format(day, "yyyy-MM-dd");
              const isToday = dayStr === format(new Date(), "yyyy-MM-dd");
              const isSelected = dayStr === dateStr;
              const dayCompletedCheckins = allCheckins.filter(c => c.date === dayStr && c.completed);
              
              return (
                <button
                  key={dayStr}
                  onClick={() => setSelectedDate(day)}
                  className={cn(
                    "flex-shrink-0 w-16 p-3 rounded-lg text-center transition-all",
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : isToday
                      ? "bg-primary/10 border border-primary"
                      : "bg-muted hover:bg-muted/80"
                  )}
                >
                  <p className="text-xs font-medium uppercase">{format(day, "EEE", { locale: es })}</p>
                  <p className="text-lg font-bold">{format(day, "d")}</p>
                  <div className="flex justify-center gap-0.5 mt-1">
                    {dayCompletedCheckins.length > 0 && (
                      <div className={cn("w-2 h-2 rounded-full", isSelected ? "bg-primary-foreground" : "bg-success")} />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar hábitos..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              {Object.entries(categoryLabels).map(([key, { label }]) => (
                <SelectItem key={key} value={key}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Habits List */}
        <div className="space-y-3">
          {isLoading ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">Cargando hábitos...</p>
            </Card>
          ) : filteredHabits.map((habit) => {
            const isCompleted = dayCheckins.some(c => c.habit_id === habit.id);
            const streak = getStreakForHabit(habit.id);
            const category = categoryLabels[habit.category] || categoryLabels.general;

            return (
              <Card key={habit.id} className={cn("p-4 card-hover transition-all", isCompleted && "bg-success/5 border-success/20")}>
                <div className="flex items-center gap-4">
                  <Checkbox
                    checked={isCompleted}
                    onCheckedChange={() => handleToggleComplete(habit.id, isCompleted)}
                    className="h-6 w-6"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className={cn("font-medium", isCompleted && "line-through text-muted-foreground")}>
                        {habit.name}
                      </h3>
                      <Badge variant="outline" className={category.color}>{category.label}</Badge>
                    </div>
                    {habit.description && (
                      <p className="text-sm text-muted-foreground mt-1 truncate">{habit.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="hidden sm:flex">
                      {habit.frequency === "daily" ? "Diario" : habit.frequency === "weekly" ? "Semanal" : "Mensual"}
                    </Badge>
                    <StreakBadge count={streak} size="sm" />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditingHabit(habit)}>
                          <Pencil className="h-4 w-4 mr-2" /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteHabit(habit.id)} className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" /> Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </Card>
            );
          })}

          {filteredHabits.length === 0 && !isLoading && (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No hay hábitos que coincidan con tu búsqueda</p>
            </Card>
          )}
        </div>

        {/* Edit Dialog */}
        <Dialog open={!!editingHabit} onOpenChange={() => setEditingHabit(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-display">Editar hábito</DialogTitle>
            </DialogHeader>
            {editingHabit && (
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nombre</label>
                  <Input
                    value={editingHabit.name}
                    onChange={(e) => setEditingHabit({ ...editingHabit, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Categoría</label>
                    <Select value={editingHabit.category} onValueChange={(v) => setEditingHabit({ ...editingHabit, category: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {Object.entries(categoryLabels).map(([key, { label }]) => (
                          <SelectItem key={key} value={key}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Frecuencia</label>
                    <Select value={editingHabit.frequency} onValueChange={(v) => setEditingHabit({ ...editingHabit, frequency: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Diario</SelectItem>
                        <SelectItem value="weekly">Semanal</SelectItem>
                        <SelectItem value="monthly">Mensual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Descripción</label>
                  <Textarea
                    value={editingHabit.description || ""}
                    onChange={(e) => setEditingHabit({ ...editingHabit, description: e.target.value })}
                    rows={2}
                  />
                </div>
                <Button onClick={handleUpdateHabit} className="w-full" disabled={updateHabit.isPending}>
                  Guardar cambios
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
