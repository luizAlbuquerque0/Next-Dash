import { compare } from "bcryptjs";
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { loginSchema } from "@/schemas/loginSchema";

import { db } from "./db";

export const authConfig = {
  providers: [
    Google,
    Credentials({
      authorize: async (crendetials) => {
        const { success, data } = loginSchema.safeParse(crendetials);

        if (!success) {
          return null;
        }

        const { email, password } = data;

        const user = await db.user.findUnique({ where: { email } });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.role) {
        token.role = user.role;
      }

      return token;
    },
    session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }

      if (token.role) {
        session.user.role = token.role;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;