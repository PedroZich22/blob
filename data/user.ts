"use server";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/lib/schemas";

export async function getUserByEmail(email: string) {
  return await db.user.findUnique({ where: { email } });
}

export async function getUserByUsername(username: string) {
  return await db.user.findUnique({ where: { username } });
}

export async function getUserById(id: string) {
  const user = await db.user.findUnique({ where: { id } });

  if (!user) return null;

  const followersCount = await db.user.count({
    where: { followers: { some: { id } } },
  });

  const followingCount = await db.user.count({
    where: { following: { some: { id } } },
  });

  return { ...user, followersCount, followingCount };
}

export async function getUsers() {
  return await db.user.findMany();
}

export async function createUser(user: any) {
  await db.user.create({
    data: {
      email: user.email,
      username: user.username,
      password: user.password,
    },
  });
}

export async function updateUser(user: any) {
  await db.user.update({
    where: {
      username: user.username,
    },
    data: {
      interests: user.interests,
    },
  });
}
