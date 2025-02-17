"use server";

import { z } from "zod";
import { BlobSchema } from "@/lib/schemas";
import { db } from "@/lib/db";

type BlobSchemaData = z.infer<typeof BlobSchema>;

interface CreateBlobData {
  blob: BlobSchemaData;
  userId: string;
}

export async function createBlob({ blob, userId }: CreateBlobData) {
  await db.blob.create({
    data: {
      content: blob.content,
      interests: {
        connect: blob.interests.map(({ value }) => ({ id: value })),
      },
      userId,
    },
  });
}

export async function getBlobsByUserId(userId: string) {
  return await db.blob.findMany({
    where: {
      userId,
    },
    include: {
      interests: true,
      user: true,
      comments: {
        include: { user: true },
      },
      _count: {
        select: { comments: true, likes: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getBlobsFiltered(interestsId?: string[]) {
  if (interestsId && interestsId.length > 0) {
    return await db.blob.findMany({
      where: {
        interests: {
          some: {
            id: {
              in: interestsId,
            },
          },
        },
      },
      include: {
        interests: true,
        user: true,
        comments: {
          include: { user: true },
        },
        _count: {
          select: { comments: true, likes: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  } else {
    return await getBlobs();
  }
}

export async function getBlobs() {
  return await db.blob.findMany({
    include: {
      interests: true,
      user: true,
      comments: {
        include: { user: true },
      },
      _count: {
        select: { comments: true, likes: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getBlobById(blobId: string) {
  return await db.blob.findUnique({
    where: {
      id: blobId,
    },
    include: {
      interests: true,
      user: true,
      comments: {
        include: { user: true },
      },
      _count: {
        select: { comments: true, likes: true },
      },
    },
  });
}
