"use server";
import { getUserByEmail } from "@/data/user";
import { LoginSchema } from "@/lib/schemas";
import { signIn } from "@/auth";
import { z } from "zod";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export async function login(values: z.infer<typeof LoginSchema>) {
  const validatedValues = LoginSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: "Dados inválidos" };
  }

  const { email, password } = validatedValues.data;

  const user = await getUserByEmail(email);
  if (!user || !user.email || !user.password) {
    return { error: "Email ou senha inválidos" };
  }

  if (!user.emailVerified) {
    const verificationToken = await generateVerificationToken(user.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Confira seu email para verificar sua conta" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Email ou senha inválidos" };
        default:
          return { error: "Falha ao fazer login" };
      }
    }

    throw error;
  }

  return { success: "Login realizado com sucesso" };
}
