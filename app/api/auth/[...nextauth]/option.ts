import { connectDB } from "@/lib/db";
import UserModel from "@/lib/models/user.model";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

connectDB();

export const options: NextAuthOptions = {
  pages: {
    signIn: "/signin",
    signOut: "/",
    newUser: "/signup",
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ) {
        if (credentials) {
          const isUserExist = await UserModel.findOne({
            email: credentials.email,
          });
          if (!isUserExist) {
            throw new Error("Adresse E-mail incorrect");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            isUserExist.password
          );
          if (!isPasswordCorrect) {
            throw new Error("Mot de passe incorrect");
          }

          return {
            id: isUserExist._id.toString(),
            email: isUserExist.email,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
};
