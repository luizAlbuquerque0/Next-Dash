import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { db } from "./db";
import bcrypt, { compare } from "bcryptjs";

const schema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(8),
})

NextAuth({
  providers: [
    Credentials({
      authorize: async(credentials) => {
        const {data, success} = schema.safeParse(credentials)

        if(!success) return null;

        const {email, password} = data;

        const user = await db.user.findUnique({where: {email}})

        if(!user) return null;

        const isPasswordValid = await compare(password, user.password)

        if(!isPasswordValid) return null

        return  {
          id: user.id,
          email: user.email,
          name: user.email
        }

      }
    })
  ],

})