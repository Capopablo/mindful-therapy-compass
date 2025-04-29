
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthGuard from "./components/auth/AuthGuard";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import NewPatient from "./pages/NewPatient";
import NewSession from "./pages/NewSession";
import PatientHistory from "./pages/PatientHistory";
import SearchPatients from "./pages/SearchPatients";
import Statistics from "./pages/Statistics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/register" element={<Register />} />
          
          {/* Rutas protegidas */}
          <Route path="/" element={
            <AuthGuard>
              <Index />
            </AuthGuard>
          } />
          <Route path="/new-patient" element={
            <AuthGuard>
              <NewPatient />
            </AuthGuard>
          } />
          <Route path="/new-session" element={
            <AuthGuard>
              <NewSession />
            </AuthGuard>
          } />
          <Route path="/patient-history" element={
            <AuthGuard>
              <PatientHistory />
            </AuthGuard>
          } />
          <Route path="/search-patients" element={
            <AuthGuard>
              <SearchPatients />
            </AuthGuard>
          } />
          <Route path="/statistics" element={
            <AuthGuard>
              <Statistics />
            </AuthGuard>
          } />
          
          {/* Ruta por defecto a login */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
