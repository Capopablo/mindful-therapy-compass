
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import LoginForm from "@/components/auth/LoginForm";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

const Auth = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6">
      <div className="container mx-auto max-w-md">
        <div className="text-center mb-12 mt-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 text-transparent bg-clip-text mb-4">
            aPSIstance
          </h1>
          <p className="text-slate-600 text-lg md:text-xl">
            Gestión eficiente para un acompañamiento de calidad.
          </p>
        </div>

        <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm border border-slate-200">
          <div className="space-y-4 text-center">
            <h2 className="text-xl font-semibold text-slate-800">
              Iniciar Sesión
            </h2>
            <p className="text-sm text-slate-600">
              Accede a tu cuenta
            </p>
            <div className="pt-2">
              <LoginForm />

              <div className="mt-4 text-center space-y-2">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="link" className="text-sm text-blue-600">
                      Olvidé mi contraseña
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Recuperar Contraseña</DialogTitle>
                    </DialogHeader>
                    <ForgotPasswordForm onComplete={() => setIsDialogOpen(false)} />
                  </DialogContent>
                </Dialog>
                
                <div className="pt-1">
                  <Link to="/register">
                    <Button variant="link" className="text-sm text-blue-600">
                      Registrarse
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
