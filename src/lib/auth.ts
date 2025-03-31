import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import bcrypt, { compare } from "bcryptjs";
import { loginSchema } from "@/schemas/loginSchema";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter"
import Resend from "next-auth/providers/resend";

export const {signIn , auth , signOut , handlers} = NextAuth({
  pages: {
    'verifyRequest' : '/login?magic-link=true',
  },
  adapter : PrismaAdapter(db),
  providers: [
    Resend({
      from: 'Acme <onboarding@resend.dev>'
    }),
    Google({
      allowDangerousEmailAccountLinking: true
    }),
    Credentials({
      authorize: async(credentials) => {
        const {data, success} = loginSchema.safeParse(credentials)

        if(!success) return null;

        const {email, password} = data;

        const user = await db.user.findUnique({where: {email}})

        if(!user || !user.password) return null;

        const isPasswordValid = await compare(password, user.password)

        if(!isPasswordValid) return null

        return  user;

      }
    })
  ],
  callbacks: {
    jwt({token, user}){
      if(user?.role){
        token.role = user.role;
      }
      return token
    },
    session({session, token}){
      if(token.sub){
        session.user.id = token.sub
      }

      if(token.role){
        session.user.role = token.role
      }
      return session
    }
  }
})

