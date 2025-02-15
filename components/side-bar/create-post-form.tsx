"use client";

import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import MultipleSelector from "../ui/multiple-select";
import { Textarea } from "../ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { getInterests } from "@/actions/interests";
import { createBlob } from "@/actions/blob";
import { BlobSchema } from "@/lib/schemas";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type BlobSchemaData = z.infer<typeof BlobSchema>;

export function CreateBlobForm() {
  const currentUser = useCurrentUser();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<BlobSchemaData>({
    resolver: zodResolver(BlobSchema),
    defaultValues: {
      content: "",
      interests: [],
    },
  });

  const { data: interests } = useQuery({
    queryKey: ["interest"],
    queryFn: () => getInterests(),
  });

  const { mutate: create } = useMutation({
    mutationFn: (variables: { userId: string; data: BlobSchemaData }) =>
      createBlob({ blob: variables.data, userId: variables.userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blob"] });
      toast({
        variant: "success",
        title: "Blob criado com sucesso",
        description: "Seu blob foi criado e compartilhado com sucesso.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Erro ao criar blob",
        description: "Ocorreu um erro ao criar o blob. Tente novamente.",
      });
      console.error("Error creating blob:", error);
    },
  });

  function onSubmit(data: BlobSchemaData) {
    if (!currentUser?.id) return router.push("/auth/login");

    create({ userId: currentUser.id, data });
  }

  const mapInterests = interests?.map((interest) => ({
    value: interest.id,
    label: interest.name,
  }));

  return (
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
              <FormLabel>Conteúdo do blob</FormLabel>
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
        <Button type="submit">blobar</Button>
      </form>
    </Form>
  );
}
