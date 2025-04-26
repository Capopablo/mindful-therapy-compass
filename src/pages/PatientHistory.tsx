
import { useState } from "react";
import { Search } from "lucide-react";
import PageContainer from "@/components/PageContainer";
import SessionCard from "@/components/SessionCard";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

// Mock de datos para mostrar
const mockPatients = [
  { id: "1", name: "Juan Pérez" },
  { id: "2", name: "María García" },
  { id: "3", name: "Carlos López" },
];

const mockSessions = {
  "1": [
    {
      id: "101",
      date: new Date(2025, 3, 25, 14, 30),
      summary: "El paciente reporta mejoras en su estado de ánimo. Continuamos trabajando en técnicas de respiración y mindfulness.",
      therapistRating: 4,
      patientRating: 3,
    },
    {
      id: "102",
      date: new Date(2025, 3, 18, 15, 0),
      summary: "Abordamos conflictos familiares. El paciente muestra resistencia a implementar las estrategias discutidas previamente.",
      therapistRating: 2,
      patientRating: 2,
    },
    {
      id: "103",
      date: new Date(2025, 3, 11, 14, 30),
      summary: "Primera sesión. Evaluación inicial y establecimiento de objetivos terapéuticos.",
      therapistRating: 3,
      patientRating: 3,
    },
  ],
  "2": [
    {
      id: "201",
      date: new Date(2025, 3, 24, 10, 0),
      summary: "La paciente reporta avances significativos en su manejo de ansiedad social.",
      therapistRating: 5,
      patientRating: 4,
    },
  ],
  "3": [] // Sin sesiones para este paciente
};

const PatientHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  
  const filteredPatients = mockPatients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const sessions = selectedPatient ? mockSessions[selectedPatient as keyof typeof mockSessions] || [] : [];

  return (
    <PageContainer 
      title="Historial del Paciente"
      subtitle="Consulta el historial completo de sesiones"
    >
      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Buscar paciente por nombre"
            className="pl-9"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedPatient(null);
            }}
          />
        </div>

        {searchTerm && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-slate-500">Resultados de búsqueda</h3>
            {filteredPatients.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {filteredPatients.map((patient) => (
                  <Card
                    key={patient.id}
                    className={`p-3 cursor-pointer transition-all ${
                      selectedPatient === patient.id
                        ? "border-blue-500 bg-blue-50/50"
                        : "hover:bg-slate-50"
                    }`}
                    onClick={() => setSelectedPatient(patient.id)}
                  >
                    <p className="font-medium">{patient.name}</p>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center p-6 text-slate-500">No se encontraron pacientes con ese nombre</p>
            )}
          </div>
        )}

        {selectedPatient && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              Historial de {mockPatients.find((p) => p.id === selectedPatient)?.name}
            </h2>
            
            {sessions.length > 0 ? (
              <div className="space-y-3">
                {sessions.map((session) => (
                  <SessionCard
                    key={session.id}
                    id={session.id}
                    date={session.date}
                    summary={session.summary}
                    therapistRating={session.therapistRating}
                    patientRating={session.patientRating}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center p-12 bg-white/50 rounded-lg border border-slate-200">
                <p className="text-slate-500">Este paciente aún no tiene sesiones registradas</p>
              </div>
            )}
          </div>
        )}

        {!searchTerm && !selectedPatient && (
          <div className="text-center p-12 bg-white/50 rounded-lg border border-slate-200">
            <p className="text-slate-500">Busca un paciente por nombre para ver su historial</p>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default PatientHistory;
