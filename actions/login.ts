"use server";
import { LoginSchema } from "@/types/schemas";
import { z } from "zod";

export async function login(values: z.infer<typeof LoginSchema>) {
  const validatedValues = LoginSchema.safeParse(values);

  if (!validatedValues.success) {
    return new Error("Dados inválidos");
  }
}
