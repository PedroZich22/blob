"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Label } from "@/components/ui/label";
import { CategoryItem } from "@/components/category-item";

interface StepInterestsProps {
  onNext: () => void;
  onPrevious: () => void;
  isLoading: boolean;
  isLastStep: boolean;
}

const interests = [
  { id: "1", name: "desenvolvimento", count: 1234 },
  { id: "2", name: "tech", count: 856, color: "blue" },
  { id: "3", name: "dev", count: 654, color: "cyan" },
  { id: "4", name: "ai", count: 432, color: "violet" },
  { id: "5", name: "design", count: 345, color: "pink" },
  { id: "6", name: "ux", count: 234, color: "rose" },
  { id: "7", name: "blockchain", count: 198, color: "orange" },
  { id: "8", name: "cloud", count: 187, color: "sky" },
  { id: "9", name: "devops", count: 165, color: "emerald" },
];

export function RegisterStepInterests({
  onNext,
  onPrevious,
  isLoading,
  isLastStep,
}: StepInterestsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Escolha seus interesses</Label>
        <div className="grid grid-cols-2 gap-2">
          {interests.map((interest) => (
            <CategoryItem
              key={interest.id}
              category={interest}
              onClick={() => {}}
              variant="trending"
            />
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={onPrevious} className="w-full">
          Voltar
        </Button>
        <Button onClick={onNext} className="w-full" disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          {isLastStep ? "Concluir" : "Continuar"}
        </Button>
      </div>
    </div>
  );
}
