"use client";

import React, { Context } from "react";
import { useMultiStepForm } from "@/hooks/use-multi-step-form";
import { Form } from "@/components/ui/form";
import { UseMultiStepFormTypeOptions } from "@/types/multi-step-form";
import { cn } from "@/lib/utils";

interface MultiStepFormProps<T> {
  children: React.ReactNode;
  context: Context<T>;
  className?: string;
}
// biome-ignore lint: must be any as it is a any object
export function MultiStepForm<T extends UseMultiStepFormTypeOptions<any>>({
  children,
  context,
  className,
}: MultiStepFormProps<T>) {
  const { form, onSubmit, onErrors } = useMultiStepForm(context);

  return (
    <Form {...form}>
      <form
        onSubmit={form?.handleSubmit(onSubmit, onErrors)}
        className={cn(className)}
      >
        {children}
      </form>
    </Form>
  );
}
