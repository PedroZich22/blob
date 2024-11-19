"use client";

import type { Context } from "react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { useMultiStepForm } from "@/hooks/use-multi-step-form";
import type { UseMultiStepFormTypeOptions } from "@/types/multi-step-form";

interface MultiStepNavButtonsProps<T> {
  previousLabel: string;
  nextLabel: string;
  endStepLabel: string;
  context: Context<T>;
}
// biome-ignore lint: must be any as it is a any object
export function MultiStepNavButtons<
  T extends UseMultiStepFormTypeOptions<any>
>({
  previousLabel,
  nextLabel,
  endStepLabel,
  context,
}: MultiStepNavButtonsProps<T>) {
  const { isFirstStep, isLastStep, previousStep } = useMultiStepForm(context);

  return (
    <div className="flex flex-row items-center gap-4 justify-between w-full">
      <Button
        variant="outline"
        onClick={previousStep}
        className={cn(`${isFirstStep ? "invisible" : "visible"}`, "w-full")}
      >
        {previousLabel}
      </Button>
      <Button type="submit" className="w-full">
        {`${isLastStep ? endStepLabel : nextLabel}`}
      </Button>
    </div>
  );
}
