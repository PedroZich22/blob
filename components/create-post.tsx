"use client";

import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
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
import { useSidebar } from "./ui/sidebar";

type PostSchemaData = z.infer<typeof PostSchema>;

export function CreatePost() {
  const currentUser = useCurrentUser();
  const queryClient = useQueryClient();
  const { open } = useSidebar();

  // if (!currentUser) return;

  const { data: interests } = useQuery({
    queryKey: ["interest"],
    queryFn: () => getInterests(),
  });

  const form = useForm<PostSchemaData>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      content: "",
      interests: [],
    },
  });

  const { mutate: create } = useMutation({
    mutationFn: (variables: { userId: string; data: PostSchemaData }) =>
      createPost(variables.userId, variables.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
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
    console.log(data);
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
          {open && "Postar"}
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
              name="interests"
              render={() => (
                <FormItem>
                  <FormLabel>Categorias</FormLabel>
                  <FormControl>
                    <Controller
                      control={form.control}
                      name="interests"
                      render={() => (
                        <MultipleSelector
                          emptyIndicator="Vazio."
                          defaultOptions={mapInterests}
                        />
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
