import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { Moon, Sun, Download, Database } from "lucide-react";

export default function SettingsPage() {
  const { darkMode, toggleDarkMode, habits, books, goals } = useApp();

  const exportData = () => {
    const data = { habits, books, goals, exportDate: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `magi-2026-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in max-w-2xl">
        <h1 className="text-3xl font-display font-bold">Configuración</h1>
        
        <Card>
          <CardHeader><CardTitle>Apariencia</CardTitle></CardHeader>
          <CardContent>
            <Button variant="outline" onClick={toggleDarkMode} className="w-full justify-start gap-3">
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              {darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Datos</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" onClick={exportData} className="w-full justify-start gap-3">
              <Download className="h-5 w-5" /> Exportar datos (JSON)
            </Button>
            <p className="text-sm text-muted-foreground">
              Los datos se guardan automáticamente en tu navegador.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Acerca de</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              <strong>MAGI 2026</strong> — Dashboard personal de Miguel Molina Navarro.<br />
              Seguimiento de hábitos, lectura, ejercicio y objetivos anuales.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
