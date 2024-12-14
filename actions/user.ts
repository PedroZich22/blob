"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { EditProfileSchema, RegisterSchema } from "@/lib/schemas";

export async function getUserByEmail(email: string) {
  return await db.user.findUnique({ where: { email } });
}

export async function getUserByUsername(username: string) {
  return await db.user.findUnique({ where: { username } });
}

export async function getUserById(id: string) {
  return await db.user.findUnique({
    include: {
      _count: {
        select: { followers: true, following: true },
      },
    },
    where: { id },
  });
}

export async function getUsers() {
  return await db.user.findMany();
}

export async function getUsersFiltered(query: string) {
  return await db.user.findMany({
    include: {
      _count: {
        select: { followers: true, following: true },
      },
    },
    where: {
      OR: [
        { username: { contains: query, mode: "insensitive" } },
        { name: { contains: query, mode: "insensitive" } },
      ],
    },
  });
}

export async function createUser(user: z.infer<typeof RegisterSchema>) {
  return await db.user.create({
    data: {
      email: user.email,
      username: user.username,
      password: user.password,
      avatarColor: user.avatar.color,
      avatarIcon: user.avatar.icon,
      interests: {
        connect: [
          ...user.interests.map((interest) => ({
            id: interest,
          })),
        ],
      },
    },
  });
}

export async function updateUser(
  userId: string,
  user: z.infer<typeof EditProfileSchema>
) {
  return await db.user.update({
    data: {
      name: user.name,
      username: user.username,
      bio: user.bio,
    },
    where: {
      id: userId,
    },
  });
}
