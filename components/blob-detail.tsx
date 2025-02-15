"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Fragment, useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { createComment, getCommentsByBlobId } from "@/actions/comment";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UserAvatar } from "./user-avatar";
import { ExtendedBlob } from "@/types/db";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { Form } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormField, FormItem, FormControl, FormMessage } from "./ui/form";
import { Blob } from "./blob";
import { formatDateDistanceToNowWithSuffix } from "@/lib/formatter";
import { Comment } from "./comment";

const commentFormSchema = z.object({
  content: z.string().min(1, "O comentário não pode estar vazio"),
});

type CommentFormValues = z.infer<typeof commentFormSchema>;

interface BlobDetailProps {
  blob: ExtendedBlob;
}

export function BlobDetail({ blob }: BlobDetailProps) {
  const [isCommenting, setIsCommenting] = useState(false);
  const queryClient = useQueryClient();
  const user = useCurrentUser();
  const router = useRouter();

  const {
    data: comments,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["comments", blob.id],
    queryFn: () => getCommentsByBlobId(blob.id),
    enabled: !!blob.id,
  });

  const { mutate: createCommentMutation, isPending: isCreating } = useMutation({
    mutationFn: (content: string) => {
      return createComment({
        userId: user?.id!,
        blobId: blob.id,
        comment: { content },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", blob.id] });
      form.reset();
      setIsCommenting(false);
      toast.success("Comentário adicionado!");
    },
    onError: (error: Error) => {
      toast.error("Erro ao adicionar comentário: " + error.message);
    },
  });

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      content: "",
    },
  });

  async function onSubmit(data: CommentFormValues) {
    if (!user?.id) return router.push("/auth/login");

    createCommentMutation(data.content);
  }

  if (isLoading) return <div>Carregando comentários...</div>;
  if (isError) return <div>Erro ao carregar comentários</div>;

  return (
    <Fragment>
      {/* Blob header remains unchanged */}
      <Blob blob={blob} />

      {/* Comment area */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          <UserAvatar user={user} />
          <div className="flex-1 space-y-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Escreva um comentário..."
                          className="bg-muted"
                          {...field}
                          onFocus={() => setIsCommenting(true)}
                          disabled={isCreating}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {isCommenting && (
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      type="button"
                      onClick={() => {
                        form.reset();
                        setIsCommenting(false);
                      }}
                      disabled={isCreating}
                    >
                      Cancelar
                    </Button>
                    <Button
                      size="sm"
                      type="submit"
                      disabled={isCreating || !form.formState.isValid}
                    >
                      {isCreating ? "Enviando..." : "Comentar"}
                    </Button>
                  </div>
                )}
              </form>
            </Form>
          </div>
        </div>
      </div>

      {/* Comments list */}
      <div className="ml-4 space-y-4">
        {comments?.map((comment) => (
          <Comment comment={comment} />
        ))}
      </div>
    </Fragment>
  );
}
