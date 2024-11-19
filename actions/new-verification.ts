"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";
import { isAfter } from "date-fns";

export async function newVerification(token: string) {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) {
    return {
      error: "Token inválido",
    };
  }

  const hasExpired = isAfter(existingToken.expiresAt, new Date());
  if (hasExpired) {
    return {
      error: "Token expirado",
    };
  }

  const user = await getUserByEmail(existingToken.email);
  if (!user) {
    return {
      error: "Usuário não encontrado",
    };
  }

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return {
    success: "Email verificado com sucesso",
  };
}
