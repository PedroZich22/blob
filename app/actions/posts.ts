"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

const postSchema = z.object({
  content: z.string().min(1).max(500),
  interests: z.array(z.string()).optional(),
});

export async function createPost(formData: FormData) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Não autorizado");
  }

  const validatedFields = postSchema.safeParse({
    content: formData.get("content"),
    interests: formData.getAll("interests"),
  });

  if (!validatedFields.success) {
    return {
      error: "Dados inválidos",
    };
  }

  const post = await prisma.post.create({
    data: {
      content: validatedFields.data.content,
      userId: session.user.id,
      interests: {
        connect: validatedFields.data.interests?.map((id) => ({ id })),
      },
    },
  });

  revalidatePath("/");
  return { post };
} 