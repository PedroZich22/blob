"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email("Email inválido"),
  username: z
    .string()
    .min(3, "Username deve ter no mínimo 3 caracteres")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username deve conter apenas letras, números e _"
    ),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
});

interface StepAccountProps {
  onNext: () => void;
  isLoading: boolean;
}

export function RegisterStepAccount({ onNext, isLoading }: StepAccountProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <div className="grid gap-4">
      <Button variant="outline" className="w-full">
        <Icons.google className="mr-2 h-4 w-4" />
        Continuar com Google
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Ou continue com email
          </span>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onNext)} className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <p className="text-sm text-destructive">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="username">Nome de usuário</Label>
          <Input
            id="username"
            placeholder="seunome"
            {...form.register("username")}
          />
          {form.formState.errors.username && (
            <p className="text-sm text-destructive">
              {form.formState.errors.username.message}
            </p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" {...form.register("password")} />
          {form.formState.errors.password && (
            <p className="text-sm text-destructive">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Continuar
        </Button>
      </form>
    </div>
  );
}
