import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Target } from "lucide-react";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(4, "La contraseña debe tener al menos 4 caracteres"),
});

const signupSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(4, "La contraseña debe tener al menos 4 caracteres"),
  username: z.string().min(3, "El nombre debe tener al menos 3 caracteres").max(50),
});

export default function AuthPage() {
  const { user, signIn, signUp, resetPassword, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [tab, setTab] = useState<"login" | "signup" | "reset">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user && !loading) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    const { error } = await signIn(email, password);
    setIsSubmitting(false);

    if (error) {
      if (error.includes("Invalid login")) {
        toast({ title: "Error", description: "Email o contraseña incorrectos", variant: "destructive" });
      } else {
        toast({ title: "Error", description: error, variant: "destructive" });
      }
    } else {
      toast({ title: "Bienvenido", description: "Has iniciado sesión correctamente" });
      navigate("/");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = signupSchema.safeParse({ email, password, username });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    const { error } = await signUp(email, password, username);
    setIsSubmitting(false);

    if (error) {
      toast({ title: "Error", description: error, variant: "destructive" });
    } else {
      toast({ title: "Cuenta creada", description: "Tu cuenta ha sido creada. Ya puedes usar la app." });
      navigate("/");
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrors({ email: "Ingresa tu email" });
      return;
    }

    setIsSubmitting(true);
    const { error } = await resetPassword(email);
    setIsSubmitting(false);

    if (error) {
      toast({ title: "Error", description: error, variant: "destructive" });
    } else {
      toast({ title: "Email enviado", description: "Revisa tu bandeja de entrada para restablecer tu contraseña." });
      setTab("login");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Target className="h-8 w-8 text-primary" />
            <span className="text-2xl font-display font-bold">MAGI 2026</span>
          </div>
          <CardTitle className="text-xl font-display">
            {tab === "login" ? "Iniciar sesión" : tab === "signup" ? "Crear cuenta" : "Restablecer contraseña"}
          </CardTitle>
          <CardDescription>
            {tab === "login" 
              ? "Ingresa tus credenciales para acceder" 
              : tab === "signup" 
              ? "Crea tu cuenta para comenzar"
              : "Te enviaremos un enlace para restablecer tu contraseña"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="signup">Registrarse</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Contraseña</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isSubmitting}
                  />
                  {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Iniciar sesión
                </Button>
                <Button
                  type="button"
                  variant="link"
                  className="w-full text-sm"
                  onClick={() => setTab("reset")}
                >
                  Olvidé mi contraseña
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-username">Nombre de usuario</Label>
                  <Input
                    id="signup-username"
                    type="text"
                    placeholder="Tu nombre"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isSubmitting}
                  />
                  {errors.username && <p className="text-sm text-destructive">{errors.username}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Contraseña</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Mínimo 4 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isSubmitting}
                  />
                  {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Crear cuenta
                </Button>
              </form>
            </TabsContent>

            {tab === "reset" && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email">Email</Label>
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Enviar enlace
                </Button>
                <Button
                  type="button"
                  variant="link"
                  className="w-full text-sm"
                  onClick={() => setTab("login")}
                >
                  Volver al inicio de sesión
                </Button>
              </form>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
