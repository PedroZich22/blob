"use server";

import { db } from "@/lib/db";
import { PostSchema } from "@/lib/schemas";
import { z } from "zod";

type PostSchemaData = z.infer<typeof PostSchema>;

export async function createPost(userId: string, post: PostSchemaData) {
  await db.post.create({
    data: {
      userId,
      content: post.content,
      interests: {
        connect: post.interests.map((i) => ({ id: i })),
      },
    },
  });
}

export async function getPosts(userId: string | undefined) {
  const posts = await db.post.findMany({
    include: {
      user: true,
      interests: true,
      _count: {
        select: { likes: true, comments: true, reposts: true },
      },
      likes: {
        where: { userId },
      },
      reposts: {
        where: { userId },
      },
    },
  });

  return posts.map((post) => ({
    ...post,
    isLiked: post.likes.length > 0,
    isReposted: post.reposts.length > 0,
  }));
}
