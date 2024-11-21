"use server";

import { db } from "@/lib/db";

export async function getInterests() {
  try {
    const interests = await db.interest.findMany();
    return interests;
  } catch (error) {
    console.error("[INTERESTS_GET]", error);
    throw new Error("Erro ao buscar interesses");
  }
}
