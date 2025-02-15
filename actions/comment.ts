"use server";

import { z } from "zod";
import { CommentSchema } from "@/lib/schemas";
import { db } from "@/lib/db";

type CommentSchemaData = z.infer<typeof CommentSchema>;

interface CreateCommentData {
  comment: CommentSchemaData;
  blobId: string;
  userId: string;
}

export async function createComment({
  comment,
  blobId,
  userId,
}: CreateCommentData) {
  await db.comment.create({
    data: {
      blobId,
      content: comment.content,
      userId,
    },
  });
}

export async function getCommentsByBlobId(blobId: string) {
  return await db.comment.findMany({
    where: { blobId },
    include: {
      user: true,
    },
    orderBy: { createdAt: "desc" },
  });
}
