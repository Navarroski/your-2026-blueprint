import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { useMoodLogs, useMoodMutations } from "@/hooks/useCloudData";
import { format, subDays } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Activity, Battery, Brain, TrendingUp } from "lucide-react";

const moodLabels: Record<number, string> = {
  1: "Muy mal",
  2: "Mal",
  3: "Bajo",
  4: "Regular",
  5: "Neutral",
  6: "Bien",
  7: "Muy bien",
  8: "Genial",
  9: "Excelente",
  10: "Increíble",
};

const getMoodColor = (score: number) => {
  if (score <= 3) return "text-destructive";
  if (score <= 5) return "text-warning";
  if (score <= 7) return "text-chart-3";
  return "text-success";
};

export default function MoodPage() {
  const { data: moodLogs = [], isLoading } = useMoodLogs();
  const { upsertMood } = useMoodMutations();
  
  const today = format(new Date(), "yyyy-MM-dd");
  const todayMood = moodLogs.find(m => m.date === today);
  
  const [moodScore, setMoodScore] = useState(todayMood?.mood_score || 5);
  const [energyLevel, setEnergyLevel] = useState(todayMood?.energy_level || 5);
  const [stressLevel, setStressLevel] = useState(todayMood?.stress_level || 5);
  const [notes, setNotes] = useState(todayMood?.notes || "");

  const handleSave = () => {
    upsertMood.mutate({
      date: today,
      mood_score: moodScore,
      energy_level: energyLevel,
      stress_level: stressLevel,
      notes: notes || null,
    });
  };

  // Calculate averages
  const last7Days = moodLogs.filter(m => {
    const date = new Date(m.date);
    const weekAgo = subDays(new Date(), 7);
    return date >= weekAgo;
  });

  const avgMood = last7Days.length > 0 
    ? Math.round(last7Days.reduce((acc, m) => acc + m.mood_score, 0) / last7Days.length * 10) / 10
    : 0;
  const avgEnergy = last7Days.length > 0 
    ? Math.round(last7Days.filter(m => m.energy_level).reduce((acc, m) => acc + (m.energy_level || 0), 0) / last7Days.filter(m => m.energy_level).length * 10) / 10
    : 0;
  const avgStress = last7Days.length > 0 
    ? Math.round(last7Days.filter(m => m.stress_level).reduce((acc, m) => acc + (m.stress_level || 0), 0) / last7Days.filter(m => m.stress_level).length * 10) / 10
    : 0;

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl lg:text-4xl font-display font-bold">Mood Tracker</h1>
          <p className="text-muted-foreground mt-1">Registra tu estado de ánimo, energía y estrés</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Brain className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className={cn("text-2xl font-display font-bold", getMoodColor(avgMood))}>{avgMood || "-"}</p>
                <p className="text-xs text-muted-foreground">Mood promedio</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Battery className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold">{avgEnergy || "-"}</p>
                <p className="text-xs text-muted-foreground">Energía promedio</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <Activity className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold">{avgStress || "-"}</p>
                <p className="text-xs text-muted-foreground">Estrés promedio</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-chart-3/10">
                <TrendingUp className="h-5 w-5 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold">{moodLogs.length}</p>
                <p className="text-xs text-muted-foreground">Días registrados</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Today's Entry */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display flex items-center justify-between">
              <span>Registro de hoy</span>
              <span className="text-sm font-normal text-muted-foreground">
                {format(new Date(), "EEEE, d MMMM yyyy", { locale: es })}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Estado de ánimo</label>
                <span className={cn("text-lg font-bold", getMoodColor(moodScore))}>
                  {moodScore} - {moodLabels[moodScore]}
                </span>
              </div>
              <Slider
                value={[moodScore]}
                onValueChange={([v]) => setMoodScore(v)}
                min={1}
                max={10}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Muy mal</span>
                <span>Increíble</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Nivel de energía</label>
                <span className="text-lg font-bold">{energyLevel}</span>
              </div>
              <Slider
                value={[energyLevel]}
                onValueChange={([v]) => setEnergyLevel(v)}
                min={1}
                max={10}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Agotado</span>
                <span>Muy energético</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Nivel de estrés</label>
                <span className="text-lg font-bold">{stressLevel}</span>
              </div>
              <Slider
                value={[stressLevel]}
                onValueChange={([v]) => setStressLevel(v)}
                min={1}
                max={10}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Relajado</span>
                <span>Muy estresado</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Notas del día</label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="¿Cómo fue tu día? ¿Qué factores influyeron en tu estado?"
                rows={3}
              />
            </div>

            <Button onClick={handleSave} className="w-full" disabled={upsertMood.isPending}>
              {todayMood ? "Actualizar registro" : "Guardar registro"}
            </Button>
          </CardContent>
        </Card>

        {/* History */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Historial reciente</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-center text-muted-foreground py-8">Cargando...</p>
            ) : moodLogs.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No hay registros aún. Comienza guardando el de hoy.
              </p>
            ) : (
              <div className="space-y-3">
                {moodLogs.slice(0, 14).map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-center min-w-16">
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(log.date), "EEE", { locale: es })}
                        </p>
                        <p className="font-medium">{format(new Date(log.date), "d MMM")}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className={cn("text-xl font-bold", getMoodColor(log.mood_score))}>
                            {log.mood_score}
                          </p>
                          <p className="text-xs text-muted-foreground">Mood</p>
                        </div>
                        {log.energy_level && (
                          <div className="text-center">
                            <p className="text-xl font-bold">{log.energy_level}</p>
                            <p className="text-xs text-muted-foreground">Energía</p>
                          </div>
                        )}
                        {log.stress_level && (
                          <div className="text-center">
                            <p className="text-xl font-bold">{log.stress_level}</p>
                            <p className="text-xs text-muted-foreground">Estrés</p>
                          </div>
                        )}
                      </div>
                    </div>
                    {log.notes && (
                      <p className="text-sm text-muted-foreground max-w-xs truncate hidden md:block">
                        {log.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
