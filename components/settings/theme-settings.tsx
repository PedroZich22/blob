"use client";

import { useTheme } from "next-themes";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Laptop, Moon, Sun } from "lucide-react";

export function ThemeSettings() {
  const { theme, setTheme } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tema e Aparência</CardTitle>
        <CardDescription>
          Escolha como você quer que o aplicativo apareça para você. 
          Você pode escolher entre modo claro, escuro ou seguir as configurações do seu sistema.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          defaultValue={theme}
          onValueChange={setTheme}
          className="grid grid-cols-3 gap-4"
        >
          <Label
            htmlFor="light"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
          >
            <RadioGroupItem value="light" id="light" className="sr-only" />
            <Sun className="h-6 w-6 mb-2" />
            <span>Modo Claro</span>
          </Label>
          <Label
            htmlFor="dark"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
          >
            <RadioGroupItem value="dark" id="dark" className="sr-only" />
            <Moon className="h-6 w-6 mb-2" />
            <span>Modo Escuro</span>
          </Label>
          <Label
            htmlFor="system"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
          >
            <RadioGroupItem value="system" id="system" className="sr-only" />
            <Laptop className="h-6 w-6 mb-2" />
            <span>Sistema</span>
          </Label>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
