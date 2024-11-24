"use server";

import { db } from "@/lib/db";

export async function getInterests() {
  try {
    const interests = await db.interest.findMany({
      include: {
        _count: {
          select: {
            posts: true,
          },
        },
      },
    });
    return interests;
  } catch (error) {
    throw new Error("Failed to fetch interests");
  }
}
