
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PatientCardProps {
  name: string;
  age: number;
  nextSession?: string;
}

const PatientCard = ({ name, age, nextSession }: PatientCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Edad: {age}</p>
        {nextSession && (
          <p className="text-sm text-muted-foreground">
            Próxima sesión: {nextSession}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default PatientCard;
