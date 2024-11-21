"use client";

import { MultiStepNavButtons } from "@/components/ui/multi-step-form/multi-step-buttons";
import { MultiStepNavbar } from "@/components/ui/multi-step-form/multi-step-navbar";
import { useMultiStepForm } from "@/hooks/use-multi-step-form";
import { RegisterFormContext } from "./multi-step-register-config";
import { MultiStepForm } from "@/components/ui/multi-step-form/multi-step-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function RegisterForm() {
  const { CurrentForm, currentStepTitle, currentStepDescription } =
    useMultiStepForm(RegisterFormContext);

  return (
    <MultiStepForm context={RegisterFormContext}>
      <Card className="w-full md:w-[478px] shadow-lg h-full">
        <CardHeader>
          <MultiStepNavbar context={RegisterFormContext} />
          <CardTitle className="text-2xl">{currentStepTitle}</CardTitle>
          <CardDescription>{currentStepDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <CurrentForm />
        </CardContent>
        <CardFooter>
          <MultiStepNavButtons
            context={RegisterFormContext}
            nextLabel="Continuar"
            previousLabel="Voltar"
            endStepLabel="Finalizar"
          />
        </CardFooter>
      </Card>
    </MultiStepForm>
  );
}
