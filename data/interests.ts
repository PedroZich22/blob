"use server";

import { db } from "@/lib/db";

export async function getInterests() {
  try {
    const interests = await db.interest.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            posts: true,
          },
        },
        color: true,
      },
      orderBy: {
        posts: {
          _count: "desc",
        },
      },
    });

    return interests.map((interest) => ({
      id: interest.id,
      name: interest.name,
      count: interest._count.posts,
      color: interest.color,
    }));
  } catch (error) {
    console.error("[INTERESTS_GET]", error);
    throw new Error("Erro ao buscar interesses");
  }
}
