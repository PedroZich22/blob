"use server";

import { db } from "@/lib/db";

export async function toggleLike(blobId: string, userId: string) {
  const existingLike = await db.like.findUnique({
    where: {
      userId_blobId: {
        userId,
        blobId,
      },
    },
  });

  if (existingLike) {
    await db.like.delete({
      where: {
        id: existingLike.id,
      },
    });
  } else {
    await db.like.create({
      data: {
        userId,
        blobId,
      },
    });
  }

  return { liked: !existingLike };
}

export async function getLikeStatus(blobId: string, userId: string) {
  return db.like.findUnique({
    where: {
      userId_blobId: {
        userId,
        blobId,
      },
    },
  });
}

export async function getLikesCount(blobId: string) {
  return db.like.count({
    where: {
      blobId,
    },
  });
}
