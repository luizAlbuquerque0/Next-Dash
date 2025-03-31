
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { Resend } from "resend";

import { authConfig } from "./auth.config";
import { db } from "./db";

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    ...authConfig.providers,
    {
      id: 'magic-link',
      type: 'email',
      name: 'Magic Link',
      maxAge: 24 * 60 * 60,
      async sendVerificationRequest({ identifier, url }) {
        await resend.emails.send({
          from: 'JStack <suporte@resend.dev>',
          to: [identifier],
          subject: 'Acesse o JStack!',
          html: `<a href="${url}">Clique aqui</a> para acessar a plataforma do JStack!`,
        });
      },
    },
  ],
  pages: {
    error: '/login',
    signIn: '/login',
    verifyRequest: '/login?magic-link=true',
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
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
});
