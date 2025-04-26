
import { useState } from "react";

interface EmotionalRatingProps {
  label: string;
  onChange: (value: number) => void;
  value?: number;
}

const EmotionalRating = ({ label, onChange, value }: EmotionalRatingProps) => {
  const [selectedValue, setSelectedValue] = useState<number | undefined>(value);

  const levels = [
    { value: 1, color: "bg-red-500", label: "Muy bajo" },
    { value: 2, color: "bg-orange-400", label: "Bajo" },
    { value: 3, color: "bg-yellow-400", label: "Normal" },
    { value: 4, color: "bg-green-400", label: "Bueno" },
    { value: 5, color: "bg-green-600", label: "Excelente" },
  ];

  const handleSelect = (level: number) => {
    setSelectedValue(level);
    onChange(level);
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{label}</p>
      <div className="flex gap-2 flex-wrap">
        {levels.map((level) => (
          <button
            key={level.value}
            type="button"
            onClick={() => handleSelect(level.value)}
            className={`h-8 w-8 rounded-full transition-all ${
              level.color
            } ${
              selectedValue === level.value
                ? "ring-2 ring-offset-2 ring-slate-950/10"
                : "opacity-70 hover:opacity-100"
            }`}
            title={level.label}
            aria-label={`${level.label} - ${level.value}`}
          />
        ))}
      </div>
    </div>
  );
};

export default EmotionalRating;
