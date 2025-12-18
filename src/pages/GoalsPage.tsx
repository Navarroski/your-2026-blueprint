import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, Trophy, Circle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function GoalsPage() {
  const { goals, updateGoalProgress, setGoals } = useApp();
  const [tab, setTab] = useState("principal");

  const principalGoals = goals.filter(g => g.category === "principal");
  const generalGoals = goals.filter(g => g.category === "general");
  
  const completedPrincipal = principalGoals.filter(g => g.status === "completed").length;
  const completedGeneral = generalGoals.filter(g => g.status === "completed").length;

  const toggleMilestone = (goalId: string, milestoneId: string) => {
    setGoals(goals.map(g => {
      if (g.id !== goalId) return g;
      const milestones = g.milestones.map(m => 
        m.id === milestoneId ? { ...m, completed: !m.completed } : m
      );
      const completedCount = milestones.filter(m => m.completed).length;
      const progress = milestones.length > 0 ? Math.round((completedCount / milestones.length) * 100) : g.progress;
      return { ...g, milestones, progress, status: progress === 100 ? "completed" : progress > 0 ? "in_progress" : "not_started" };
    }));
  };

  const statusColors = {
    not_started: "bg-muted text-muted-foreground",
    in_progress: "bg-primary/20 text-primary",
    completed: "bg-success/20 text-success",
  };

  const GoalCard = ({ goal }: { goal: typeof goals[0] }) => (
    <Card className={cn("card-hover", goal.status === "completed" && "border-success/30 bg-success/5")}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <Badge className={statusColors[goal.status]}>
            {goal.status === "completed" ? "Completado" : goal.status === "in_progress" ? "En progreso" : "Pendiente"}
          </Badge>
          <span className="text-lg font-bold">{goal.progress}%</span>
        </div>
        <h3 className="font-display font-semibold text-lg mb-2">{goal.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{goal.description}</p>
        <Progress value={goal.progress} className="h-2 mb-4" />
        {goal.milestones.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Hitos:</p>
            {goal.milestones.map((m) => (
              <button
                key={m.id}
                onClick={() => toggleMilestone(goal.id, m.id)}
                className="flex items-center gap-2 w-full text-left text-sm hover:bg-muted p-1 rounded"
              >
                {m.completed ? (
                  <CheckCircle2 className="h-4 w-4 text-success" />
                ) : (
                  <Circle className="h-4 w-4 text-muted-foreground" />
                )}
                <span className={m.completed ? "line-through text-muted-foreground" : ""}>{m.title}</span>
              </button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl lg:text-4xl font-display font-bold">Objetivos 2026</h1>
          <p className="text-muted-foreground mt-1">10 objetivos principales + 10 generales</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10"><Target className="h-5 w-5 text-primary" /></div>
              <div>
                <p className="text-2xl font-display font-bold">{completedPrincipal}/10</p>
                <p className="text-xs text-muted-foreground">Principales</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10"><Trophy className="h-5 w-5 text-success" /></div>
              <div>
                <p className="text-2xl font-display font-bold">{completedGeneral}/10</p>
                <p className="text-xs text-muted-foreground">Generales</p>
              </div>
            </div>
          </Card>
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="principal">Principales ({principalGoals.length})</TabsTrigger>
            <TabsTrigger value="general">Generales ({generalGoals.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="principal" className="mt-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {principalGoals.map(goal => <GoalCard key={goal.id} goal={goal} />)}
            </div>
          </TabsContent>
          <TabsContent value="general" className="mt-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {generalGoals.map(goal => <GoalCard key={goal.id} goal={goal} />)}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
