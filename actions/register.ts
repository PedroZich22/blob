"use server";
import { z } from "zod";
import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";
import { RegisterSchema } from "@/types/schemas";
import { getUserByEmail, getUserByUsername } from "@/data/user";

export async function register(values: z.infer<typeof RegisterSchema>) {
  const validatedValues = RegisterSchema.safeParse(values);

  if (!validatedValues.success) {
    return new Error("Dados inválidos");
  }

  const { email, password, username } = validatedValues.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUserByEmail = await getUserByEmail(email);

  if (existingUserByEmail) {
    return new Error("Email já cadastrado");
  }

  const existingUserByUsername = await getUserByUsername(username);

  if (existingUserByUsername) {
    return new Error("Nome de usuário já cadastrado");
  }

  await prisma.user.create({
    data: { email, password: hashedPassword, username },
  });

  // TODO: Send email with verification token
}
