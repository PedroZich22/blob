"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { RegisterStepAccount } from "./register-steps/step-account";
import { RegisterStepProfile } from "./register-steps/step-profile";
import { RegisterStepInterests } from "./register-steps/step-interests";

const steps = [
  {
    id: "account",
    name: "Conta",
    fields: ["email", "username", "password"],
  },
  {
    id: "profile",
    name: "Perfil",
    fields: ["avatar", "icon", "color"],
  },
  {
    id: "interests",
    name: "Interesses",
    fields: ["interests"],
  },
] as const;

export function RegisterWizard() {
  const [step, setStep] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleNext = async () => {
    if (step === steps.length - 1) {
      setIsLoading(true);
      // Aqui você implementaria a lógica de registro
      try {
        // await register(formData)
        // router.push('/login')
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setStep((s) => Math.min(s + 1, steps.length - 1));
    }
  };

  const handlePrevious = () => {
    setStep((s) => Math.max(s - 1, 0));
  };

  // Renderiza o passo atual
  const CurrentStepComponent = {
    0: RegisterStepAccount,
    1: RegisterStepProfile,
    2: RegisterStepInterests,
  }[step];

  return (
    <Card className="w-[380px]">
      <CardHeader>
        {/* Indicador de progresso */}
        <div className="flex items-center gap-4 mb-4">
          {steps.map((s, i) => (
            <div
              key={s.id}
              className={cn(
                "flex-1 h-2 rounded-full",
                step >= i ? "bg-primary" : "bg-muted"
              )}
            />
          ))}
        </div>
        <CardTitle className="text-2xl">{steps[step].name}</CardTitle>
        <CardDescription>
          {step === 0 && "Crie sua conta para começar"}
          {step === 1 && "Personalize seu perfil"}
          {step === 2 && "Escolha seus tópicos de interesse"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {CurrentStepComponent && (
          <CurrentStepComponent
            onNext={handleNext}
            onPrevious={handlePrevious}
            isLastStep={step === steps.length - 1}
            isLoading={isLoading}
          />
        )}
      </CardContent>
    </Card>
  );
}
