import { v4 as uuidv4 } from "uuid";

import {
  createVerificationToken,
  deleteVerificationToken,
  getVerificationTokenByEmail,
} from "@/actions/auth/verification-token";

export async function generateVerificationToken(email: string) {
  const token = uuidv4();
  const expiresAt = new Date(new Date().getTime() + 2 * 60 * 60 * 1000); // 2 hours

  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await deleteVerificationToken(existingToken.token);
  }

  const verificationToken = await createVerificationToken({
    email,
    token,
    expiresAt,
  });

  return verificationToken;
}
