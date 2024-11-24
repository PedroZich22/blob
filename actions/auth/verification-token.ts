"use server";

import { db } from "@/lib/db";

export async function getVerificationTokenByToken(token: string) {
  try {
    return await db.verificationToken.findUnique({
      where: { token },
    });
  } catch {
    return null;
  }
}

export async function getVerificationTokenByEmail(email: string) {
  try {
    return await db.verificationToken.findFirst({
      where: { email },
    });
  } catch {
    return null;
  }
}

export async function deleteVerificationToken(token: string) {
  return await db.verificationToken.delete({
    where: { token },
  });
}

export async function createVerificationToken(data: {
  email: string;
  token: string;
  expiresAt: Date;
}) {
  return await db.verificationToken.create({
    data,
  });
}
