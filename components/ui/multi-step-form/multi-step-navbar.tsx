"use client";

import type { Context } from "react";

import { cn } from "@/lib/utils";
import { useMultiStepForm } from "@/hooks/use-multi-step-form";
import type { UseMultiStepFormTypeOptions } from "@/types/multi-step-form";
import { Button } from "../button";

interface MultiStepNavBarProps<T> extends React.HTMLAttributes<HTMLElement> {
  context: Context<T>;
}
// biome-ignore lint: must be any as it is a any object
export function MultiStepNavbar<T extends UseMultiStepFormTypeOptions<any>>({
  className,
  context,
  ...props
}: MultiStepNavBarProps<T>) {
  const { titles, currentStep, goToStep } = useMultiStepForm(context);

  return (
    <nav aria-label="Form progress" role="navigation">
      <ol
        className={cn(
          "flex items-center justify-between gap-2 mb-4",
          className
        )}
        {...props}
      >
        {titles.map((title, i) => (
          <li key={i} className="flex flex-col items-center w-full">
            {i <= currentStep && (
              <Button
                onClick={() => goToStep(i)}
                className="w-full h-2 p-0 bg-primary rounded-full mt-1"
                aria-label={`Go to step ${i + 1} ǀ ${title}`}
              >
                <span className="sr-only">
                  Step {i + 1} | {title}
                </span>
                {i}
              </Button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
