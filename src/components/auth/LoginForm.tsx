import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { api } from "@/lib/api"; // Importamos el servicio API

// Esquema de validación (se mantiene igual)
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El email es requerido")
    .refine((value) => {
      return value === "admin" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }, "Formato de email inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      // CAMBIO CLAVE: Usamos api.auth.login (no api.login)
      const response = await api.auth.login({
        email: data.email,
        password: data.password
      });
      
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido/a de vuelta",
      });
      navigate("/");
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error de autenticación",
        description: "Credenciales incorrectas",
      });
    } finally {
      setIsLoading(false);
    }
  };

  /* 
   * El resto del formulario (JSX) se mantiene EXACTAMENTE IGUAL
   * No necesitas modificar nada más
   */
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="tu@email.com o admin"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...field}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    </span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;