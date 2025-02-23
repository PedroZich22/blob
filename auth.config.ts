import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import { type NextAuthConfig } from "next-auth";
import { LoginSchema } from "./lib/schemas";
import { getUserByEmail } from "./actions/user";

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      allowDangerousEmailAccountLinking: true,
      async profile(profile) {
        const username = profile.email.split("@")[0];

        return {
          id: profile.id,
          name: profile.name,
          username,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) throw new Error("Invalid credentials");

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
