"use client";

import * as z from "zod";
import { RegisterSchema } from "@/types/schemas";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { register } from "@/actions/register";
import { useToast } from "@/hooks/use-toast";

export function RegisterStepAccount() {
  const { toast } = useToast();
  const form = useForm<z.z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    register(values)
      .then(() => {
        toast({
          variant: "success",
          title: "Cadastro realizado com sucesso",
          description: "Você foi redirecionado para a página inicial",
        });
      })
      .catch((error) => {
        console.log(error);
        toast({
          variant: "destructive",
          title: "Erro ao realizar cadastro",
          description: error.message,
        });
      });
  };

  return (
    <div className="space-y-7">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          <Button type="submit" className="w-full">
            Continuar
          </Button>
        </form>
      </Form>

      <Separator />

      <Button variant="outline" className="w-full">
        <Icons.google className="mr-2 size-4" />
        Continuar com Google
      </Button>

      <div className="flex items-center justify-center">
        <p>Já tem uma conta?&nbsp;</p>
        <Link href="/login">
          <span className="underline text-primary">Entrar</span>
        </Link>
      </div>
    </div>
  );
}
