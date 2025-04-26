
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PatientCard from "@/components/PatientCard";

const Index = () => {
  const patients = [
    { id: 1, name: "Juan Pérez", age: 32, nextSession: "28/04/2025" },
    { id: 2, name: "María García", age: 28, nextSession: "29/04/2025" },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Portal del Terapeuta</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Paciente
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patients.map((patient) => (
          <PatientCard
            key={patient.id}
            name={patient.name}
            age={patient.age}
            nextSession={patient.nextSession}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
