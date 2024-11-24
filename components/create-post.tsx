"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PostSchema } from "@/lib/schemas";
import { useCurrentUser } from "@/hooks/use-current-user";
import { createPost } from "@/actions/post";
import { getInterests } from "@/actions/interests";
import MultipleSelector from "./ui/multiple-select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { PencilLine } from "lucide-react";

type PostSchemaData = z.infer<typeof PostSchema>;

export function CreatePost() {
  const currentUser = useCurrentUser();

  if (!currentUser) return;

  const { data: interests } = useQuery({
    queryKey: ["interest"],
    queryFn: () => getInterests(),
  });

  const form = useForm<PostSchemaData>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      content: "",
      categories: [],
    },
  });

  const { mutate: create, isPending } = useMutation({
    mutationFn: (variables: { userId: string; data: PostSchemaData }) =>
      createPost(variables.userId, variables.data),
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Post criado com sucesso",
        description: "Seu post foi criado e compartilhado com sucesso.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Erro ao criar post",
        description: "Ocorreu um erro ao criar o post. Tente novamente.",
      });
      console.error("Error creating post:", error);
    },
  });

  function onSubmit(data: PostSchemaData) {
    if (!currentUser?.id) return;

    create({ userId: currentUser.id, data });
  }

  const mapInterests = interests?.map((interest) => ({
    label: interest.name,
    value: interest.id,
  }));

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="gooeyRight" className="w-full">
          Postar
          <PencilLine className="size-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crie um post</DialogTitle>
          <DialogDescription>
            Escreva o que está pensando para o mundo.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categorias</FormLabel>
                  <FormControl>
                    <Controller
                      control={form.control}
                      name="categories"
                      render={({ field }) => (
                        <MultipleSelector defaultOptions={mapInterests} />
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conteúdo do Post</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="O que está acontecendo?"
                      className="resize-none h-52"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="ghost">
                  Cancelar
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit">Postar</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
