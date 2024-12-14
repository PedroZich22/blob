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
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function RegisterForm() {
  const { CurrentForm, currentStepTitle, currentStepDescription } =
    useMultiStepForm(RegisterFormContext);

  return (
    <Card className="w-full md:max-w-md mx-auto mt-10">
      <MultiStepForm context={RegisterFormContext}>
        <CardHeader>
          <MultiStepNavbar context={RegisterFormContext} />
          <CardTitle className="text-2xl">{currentStepTitle}</CardTitle>
          <CardDescription>{currentStepDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <CurrentForm />
        </CardContent>
        <CardFooter className="flex flex-col">
          <MultiStepNavButtons
            context={RegisterFormContext}
            nextLabel="Continuar"
            previousLabel="Voltar"
            endStepLabel="Finalizar"
          />
          <div className="py-4 w-full">
            <Separator />
          </div>
          <div className="flex items-center justify-center text-sm text-muted-foreground">
            <p>Já tem uma conta?&nbsp;</p>
            <Button variant="link" className="p-0" asChild>
              <Link href="/auth/login">Faça login</Link>
            </Button>
          </div>
        </CardFooter>
      </MultiStepForm>
    </Card>
  );
}
