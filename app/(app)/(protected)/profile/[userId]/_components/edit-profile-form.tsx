"use client";

import { updateUser } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EditProfileSchema } from "@/lib/schemas";
import { User } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

type EditProfileFormValues = z.infer<typeof EditProfileSchema>;

export function EditProfileForm({ user }: { user: User }) {
  const queryClient = useQueryClient();
  const form = useForm<EditProfileFormValues>({
    defaultValues: {
      name: user.name || "",
      username: user.username || "",
      bio: user.bio || "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: (variables: { userId: string; user: EditProfileFormValues }) =>
      updateUser(variables.userId, variables.user),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["user", variables.userId] });
    },
  });

  function onSubmit(values: EditProfileFormValues) {
    mutate({ userId: user.id, user: values });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu nome" {...field} />
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
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biografia</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Digite sua biografia"
                  className="resize-none h-20"
                  {...field}
                />
              </FormControl>
              {/* 
              TODO: add @mention feature

              <FormDescription>
                É possível <span>@mensionar</span> outro usuário.
              </FormDescription>
              
              */}
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit">Salvar</Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
}
