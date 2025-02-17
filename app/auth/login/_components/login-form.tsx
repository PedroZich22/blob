"use client";

import { z } from "zod";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { login } from "@/actions/auth/login";
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
import { GoogleLoginButton } from "../../_components/google-login-button";
import { useRouter } from "next/navigation";

type LoginFormValues = z.infer<typeof LoginSchema>;

export function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    startTransition(async () => {
      const result = await login(values);

      if (result?.error) {
        toast({
          variant: "destructive",
          title: "Erro ao realizar login",
          description: result.error,
        });
      } else {
        toast({
          variant: "success",
          title: "Login realizado com sucesso",
          description: result.success,
        });

        router.push("/");
        router.refresh();
      }
    });
  };

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
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
          </div>
          <Button disabled={isPending} type="submit" className="w-full mt-6">
            {isPending ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </Form>
      <div className="py-2">
        <Separator />
      </div>
      <GoogleLoginButton />
      <div className="flex items-center justify-center text-sm text-muted-foreground">
        <p>Não tem uma conta?&nbsp;</p>
        <Button variant="link" className="p-0" asChild>
          <Link href="/auth/register">Registre-se</Link>
        </Button>
      </div>
    </div>
  );
}
