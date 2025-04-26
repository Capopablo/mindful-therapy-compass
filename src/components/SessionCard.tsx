
import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface SessionCardProps {
  id: string;
  date: Date;
  summary: string;
  therapistRating?: number;
  patientRating?: number;
}

const SessionCard = ({
  id,
  date,
  summary,
  therapistRating,
  patientRating,
}: SessionCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getRatingColor = (rating?: number) => {
    if (!rating) return "bg-gray-200";
    
    const colors = {
      1: "bg-red-500",
      2: "bg-orange-400",
      3: "bg-yellow-400",
      4: "bg-green-400",
      5: "bg-green-600",
    };
    
    return colors[rating as keyof typeof colors] || "bg-gray-200";
  };

  return (
    <Card className="overflow-hidden">
      <div
        className="p-4 cursor-pointer flex justify-between items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <p className="font-medium">
            Sesión {format(date, "PPP", { locale: es })}
          </p>
          <p className="text-sm text-slate-500">
            {format(date, "p", { locale: es })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div
              className={`h-3 w-3 rounded-full ${getRatingColor(therapistRating)}`}
              title="Evaluación del terapeuta"
            />
            <div
              className={`h-3 w-3 rounded-full ${getRatingColor(patientRating)}`}
              title="Estado emocional del paciente"
            />
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {isExpanded && (
        <CardContent className="pb-4 pt-0">
          <div className="border-t pt-3">
            <p className="text-sm leading-relaxed">{summary}</p>
            
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
              <div>
                <p>Evaluación del terapeuta:</p>
                <div className={`h-5 w-5 rounded-full mt-1 ${getRatingColor(therapistRating)}`} />
              </div>
              <div>
                <p>Estado emocional del paciente:</p>
                <div className={`h-5 w-5 rounded-full mt-1 ${getRatingColor(patientRating)}`} />
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default SessionCard;
