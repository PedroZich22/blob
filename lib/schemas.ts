import { z } from "zod";

import { getUserByEmail, getUserByUsername } from "@/actions/user";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(1, { message: "Senha é obrigatória" }),
});

export const RegisterSchema = z.object({
  email: z
    .string()
    .email({ message: "Email inválido" })
    .refine(async (value) => (await getUserByEmail(value)) === null, {
      message: "Email já está em uso",
    }),
  username: z
    .string()
    .min(3, { message: "Username deve ter no mínimo 3 caracteres" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username deve conter apenas letras, números e _",
    })
    .refine(async (value) => (await getUserByUsername(value)) === null, {
      message: "Username já está em uso",
    }),
  password: z
    .string()
    .min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
  avatar: z.object({
    icon: z.string(),
    color: z.string(),
  }),
  interests: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Selecione pelo menos um interesse",
  }),
});

export const EditProfileSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  username: z
    .string()
    .min(3, { message: "Username deve ter no mínimo 3 caracteres" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username deve conter apenas letras, números e _",
    })
    .refine(async (value) => (await getUserByUsername(value)) === null, {
      message: "Username já está em uso",
    }),
  bio: z
    .string()
    .max(160, { message: "Bio deve ter no máximo 160 caracteres" }),
  avatar: z.object({
    icon: z.string(),
    color: z.string(),
  }),
});

export const PostSchema = z.object({
  content: z.string().min(1, "O conteúdo do post é obrigatório"),
  categories: z.array(z.string()),
});
