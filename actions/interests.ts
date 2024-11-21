"use server";

import { getInterests } from "@/data/interests";

export async function fetchInterests() {
  try {
    const interests = await getInterests();
    return interests;
  } catch (error) {
    throw new Error("Failed to fetch interests");
  }
}
