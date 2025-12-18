import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CalendarPage() {
  const { habits, books } = useApp();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const firstDayOfWeek = monthStart.getDay();
  const paddingDays = Array(firstDayOfWeek).fill(null);

  const getCompletedHabitsForDay = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return habits.filter(h => h.completedDates.includes(dateStr)).length;
  };

  const getBookForWeek = (date: Date) => {
    return books.find(b => {
      const start = parseISO(b.startDate);
      const end = parseISO(b.endDate);
      return date >= start && date <= end;
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-display font-bold">Calendario 2026</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-medium min-w-32 text-center">
              {format(currentMonth, "MMMM yyyy", { locale: es })}
            </span>
            <Button variant="outline" size="icon" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card className="p-4">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map(day => (
              <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {paddingDays.map((_, i) => (
              <div key={`pad-${i}`} className="aspect-square" />
            ))}
            {days.map(day => {
              const completed = getCompletedHabitsForDay(day);
              const book = getBookForWeek(day);
              const today = isToday(day);

              return (
                <div
                  key={day.toISOString()}
                  className={cn(
                    "aspect-square p-1 rounded-lg border transition-colors",
                    today ? "border-primary bg-primary/10" : "border-transparent hover:bg-muted",
                    completed > 0 && "bg-success/10"
                  )}
                >
                  <div className="text-xs font-medium">{format(day, "d")}</div>
                  {completed > 0 && (
                    <div className="flex items-center gap-0.5 mt-1">
                      <Flame className="h-3 w-3 text-primary" />
                      <span className="text-xs">{completed}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
