"use server";

import { db } from "@/lib/db";

export async function getInterests() {
  return await db.interest.findMany({
    include: {
      _count: {
        select: { blobs: true },
      },
    },
  });
}
