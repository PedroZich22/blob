"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Icons } from "@/components/icons";
import { CircleDot, User, UserCircle, UserRound } from "lucide-react";

const avatarIcons = [
  { icon: User, label: "User" },
  { icon: UserCircle, label: "Circle" },
  { icon: UserRound, label: "Round" },
  { icon: CircleDot, label: "Dot" },
];

const avatarColors = [
  { value: "cyan", label: "Cyan", class: "bg-cyan-500" },
  { value: "sky", label: "Sky", class: "bg-sky-500" },
  { value: "blue", label: "Blue", class: "bg-blue-500" },
  { value: "violet", label: "Violet", class: "bg-violet-500" },
];

interface StepProfileProps {
  onNext: () => void;
  onPrevious: () => void;
  isLoading: boolean;
}

export function RegisterStepProfile({
  onNext,
  onPrevious,
  isLoading,
}: StepProfileProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Ícone do perfil</Label>
        <RadioGroup defaultValue="user" className="grid grid-cols-4 gap-2">
          {avatarIcons.map((item) => {
            const Icon = item.icon;
            return (
              <Label
                key={item.label}
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem
                  value={item.label.toLowerCase()}
                  className="sr-only"
                />
                <Icon className="h-6 w-6 mb-2" />
                <span className="text-xs">{item.label}</span>
              </Label>
            );
          })}
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label>Cor do avatar</Label>
        <RadioGroup defaultValue="cyan" className="grid grid-cols-4 gap-2">
          {avatarColors.map((color) => (
            <Label
              key={color.value}
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value={color.value} className="sr-only" />
              <div className={`h-6 w-6 rounded-full ${color.class} mb-2`} />
              <span className="text-xs">{color.label}</span>
            </Label>
          ))}
        </RadioGroup>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={onPrevious} className="w-full">
          Voltar
        </Button>
        <Button onClick={onNext} className="w-full" disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Continuar
        </Button>
      </div>
    </div>
  );
}
