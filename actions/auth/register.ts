"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/lib/schemas";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { createUser, getUserByEmail, getUserByUsername } from "@/actions/user";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

type RegisterFormData = z.infer<typeof RegisterSchema>;

export async function register(values: RegisterFormData) {
  const validatedValues = await RegisterSchema.safeParseAsync(values);
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

  const user = await createUser({
    ...validatedValues.data,
    password: hashedPassword,
  });

  await db.account.create({
    data: {
      userId: user.id,
      type: "credentials",
      provider: "credentials",
      providerAccountId: user.id,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  redirect("/auth/success");
}
