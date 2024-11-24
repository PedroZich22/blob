import { db } from "@/lib/db";
import { PostSchema } from "@/lib/schemas";
import { z } from "zod";

type PostSchemaData = z.infer<typeof PostSchema>;

export async function createPost(userId: string, post: PostSchemaData) {
  return await db.post.create({
    data: {
      content: post.content,
      userId,
    },
  });
}
