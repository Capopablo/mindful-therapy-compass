
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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

// Esquema de validación
const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "El email es requerido")
    .email("Formato de email inválido"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordFormProps {
  onComplete?: () => void;
}

const ForgotPasswordForm = ({ onComplete }: ForgotPasswordFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    // Aquí iría la lógica para enviar el email de recuperación
    try {
      console.log("Password reset requested for:", data.email);
      
      // Simulación de envío de email
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Correo enviado",
        description: "Te hemos enviado instrucciones para recuperar tu contraseña",
      });
      
      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error("Error al solicitar recuperación de contraseña:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo enviar el correo de recuperación",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
                  type="email"
                  placeholder="tu@email.com"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Enviando..." : "Enviar instrucciones"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
