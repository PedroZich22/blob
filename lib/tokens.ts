import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";
import { getVerificationTokenByEmail } from "@/data/verification-token";

export async function generateVerificationToken(email: string) {
  const token = uuidv4();
  const expiresAt = new Date(new Date().getTime() + 60 * 60 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await db.verificationToken.delete({ where: { id: existingToken.id } });
  }

  return await db.verificationToken.create({
    data: { email, token, expiresAt },
  });
}
