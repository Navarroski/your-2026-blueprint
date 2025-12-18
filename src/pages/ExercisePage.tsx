import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dumbbell, Calendar, ChevronRight, Flame, Target } from "lucide-react";
import { exercisePhases, exercises, categoryLabels, categoryColors, ExerciseCategory } from "@/data/exercisePlan";
import { cn } from "@/lib/utils";

export default function ExercisePage() {
  const [selectedPhase, setSelectedPhase] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory | "all">("all");
  
  const today = new Date();
  const month = today.getMonth();
  const currentPhaseId = month < 3 ? 1 : month < 6 ? 2 : month < 9 ? 3 : 4;
  
  const filteredExercises = exercises.filter(e => 
    selectedCategory === "all" || e.category === selectedCategory
  );

  const phase = exercisePhases.find(p => p.id === selectedPhase)!;

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl lg:text-4xl font-display font-bold">Plan de Ejercicio 2026</h1>
          <p className="text-muted-foreground mt-1">Condicionamiento físico progresivo — 4 fases anuales</p>
        </div>

        {/* Phases */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {exercisePhases.map((p) => (
            <Card
              key={p.id}
              className={cn(
                "cursor-pointer card-hover",
                selectedPhase === p.id && "border-primary bg-primary/5",
                currentPhaseId === p.id && "ring-2 ring-primary/50"
              )}
              onClick={() => setSelectedPhase(p.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={currentPhaseId === p.id ? "default" : "secondary"}>
                    Fase {p.id}
                  </Badge>
                  {currentPhaseId === p.id && <Flame className="h-4 w-4 text-primary" />}
                </div>
                <h3 className="font-semibold mb-1">{p.name}</h3>
                <p className="text-xs text-muted-foreground">{p.months}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Phase Details */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              {phase.name} — {phase.duration}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{phase.description}</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Objetivos</h4>
                <ul className="space-y-1">
                  {phase.objectives.map((obj, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                      <ChevronRight className="h-3 w-3 text-primary" /> {obj}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Estructura semanal</h4>
                <ul className="space-y-1">
                  {phase.weeklyStructure.map((item, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-3 w-3 text-primary" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Exercise Library */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Biblioteca de Ejercicios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              <Button variant={selectedCategory === "all" ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory("all")}>
                Todos
              </Button>
              {(Object.keys(categoryLabels) as ExerciseCategory[]).map((cat) => (
                <Button key={cat} variant={selectedCategory === cat ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory(cat)}>
                  {categoryLabels[cat]}
                </Button>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredExercises.map((ex) => (
                <div key={ex.id} className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{ex.name}</h4>
                    <Badge variant="outline" className={categoryColors[ex.category]}>
                      {categoryLabels[ex.category].split(" ")[0]}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{ex.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
