"use client";

import { z } from "zod";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { login } from "@/actions/login";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import { LoginSchema } from "@/lib/schemas";

export function LoginForm() {
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values).then((result) => {
        if (result?.error) {
          toast({
            variant: "destructive",
            title: "Erro ao realizar login",
            description: result.error,
          });
        }

        if (result?.success) {
          toast({
            variant: "success",
            title: "Login realizado com sucesso",
            description: result.success,
          });
        }
      });
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Digite seu email"
                    {...field}
                  />
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
                    disabled={isPending}
                    placeholder="Digite sua senha"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </Form>
      <div className="py-4">
        <Separator />
      </div>
      <div className="flex items-center justify-center text-sm text-muted-foreground">
        <p>Não tem uma conta?</p>
        <Button variant="link" asChild>
          <Link href="/auth/register">Registre-se</Link>
        </Button>
      </div>
    </div>
  );
}
