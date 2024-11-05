"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Icons } from "@/components/icons";
import { AVATAR_ICONS, AVATAR_COLORS } from "@/lib/constants/avatar-options";

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
  const handleChange = (type: "icon" | "color", value: string) => {
    const currentIcon = type === "icon" ? value : undefined;
    const currentColor = type === "color" ? value : undefined;

    // onAvatarChange({
    //   iconId: currentIcon || "user",
    //   colorId: currentColor || "cyan",
    // });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Ícone do perfil</Label>
        <RadioGroup
          defaultValue="user"
          className="grid grid-cols-4 gap-2"
          onValueChange={(value) => handleChange("icon", value)}
        >
          {AVATAR_ICONS.map((item) => {
            const Icon = item.icon;
            return (
              <Label
                key={item.id}
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem value={item.id} className="sr-only" />
                <Icon className="h-6 w-6 mb-2" />
                <span className="text-xs">{item.label}</span>
              </Label>
            );
          })}
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label>Cor do avatar</Label>
        <RadioGroup
          defaultValue="cyan"
          className="grid grid-cols-4 gap-2"
          onValueChange={(value) => handleChange("color", value)}
        >
          {AVATAR_COLORS.map((color) => (
            <Label
              key={color.id}
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value={color.id} className="sr-only" />
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
