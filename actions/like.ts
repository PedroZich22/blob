import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

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

  revalidatePath(`profile/${userId}/blob/${blobId}`);
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
