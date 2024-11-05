import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(1, { message: "Senha é obrigatória" }),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  username: z
    .string()
    .min(3, { message: "Username deve ter no mínimo 3 caracteres" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username deve conter apenas letras, números e _",
    }),
  password: z
    .string()
    .min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
});