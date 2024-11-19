"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/lib/schemas";
import { createUser, getUserByEmail, getUserByUsername } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

type RegisterFormData = z.infer<typeof RegisterSchema>;

export async function register(values: RegisterFormData) {
  const validatedValues = RegisterSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: "Dados inválidos" };
  }

  const { email, password, username } = validatedValues.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUserByEmail = await getUserByEmail(email);
  if (existingUserByEmail) {
    return { error: "Email já cadastrado" };
  }

  const existingUserByUsername = await getUserByUsername(username);
  if (existingUserByUsername) {
    return { error: "Nome de usuário já cadastrado" };
  }

  await createUser({ email, password: hashedPassword, username });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confira seu email para verificar sua conta" };
}
