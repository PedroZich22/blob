"use server";

import { z } from "zod";
import { EditProfileSchema, RegisterSchema } from "@/lib/schemas";
import { db } from "@/lib/db";

type RegisterSchemaData = z.infer<typeof RegisterSchema>;
type EditProfileSchemaData = z.infer<typeof EditProfileSchema>;

interface UpdateProfileData {
  user: EditProfileSchemaData;
  userId: string;
}

export async function getUserByEmail(email: string) {
  return await db.user.findUnique({ where: { email } });
}

export async function getUserByUsername(username: string) {
  return await db.user.findUnique({ where: { username } });
}

export async function getUserById(id: string) {
  return await db.user.findUnique({ where: { id } });
}

export async function getUsers() {
  return await db.user.findMany();
}

export async function getUsersFiltered(query: string) {
  return await db.user.findMany({
    where: {
      OR: [
        { username: { contains: query, mode: "insensitive" } },
        { name: { contains: query, mode: "insensitive" } },
      ],
    },
  });
}

export async function createUser(user: RegisterSchemaData) {
  return await db.user.create({
    data: {
      email: user.email,
      name: user.name,
      username: user.username,
      password: user.password,
      avatarColor: user.avatar.color,
      avatarIcon: user.avatar.icon,
    },
  });
}

export async function updateUser({ user, userId }: UpdateProfileData) {
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
