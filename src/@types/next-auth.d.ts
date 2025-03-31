import { UserRole } from "@prisma/client"
import NextAuth from "next-auth"
import { type DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
 interface User {
  role: UserRole
 }

 interface Session {
  user : {
    role : UserRole
  } & DefaultSession['user']
 }
}

declare module "next-auth/jwt" {
  interface JWT {
   role : UserRole
  }
}