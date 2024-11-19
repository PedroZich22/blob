"use client";

import { Input } from "@/components/ui/input";
import {
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { useFormContext } from "react-hook-form";

export function RegisterStepAccount() {
  const form = useFormContext();

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="Digite seu email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome de usuário</FormLabel>
            <FormControl>
              <Input placeholder="Digite seu nome de usuário" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Senha</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="Digite sua senha"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
