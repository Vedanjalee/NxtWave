// filepath: /Users/shivaniyadav/Documents/React-project/e-commerce/ecommerce/src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const users = [
  {
    id: "1",
    name: "demo",
    email: "anjali@demo.com",
    passwordHash: await bcrypt.hash("password123", 10),
  },
];
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Authorize called with credentials:", credentials);

        const user = users.find((u) => u.email === credentials?.email);
        if (!user) {
          console.log("User not found");
          return null;
        }

        const isPasswordValid = await bcrypt.compare(credentials!.password, user.passwordHash);
        if (!isPasswordValid) {
          console.log("Invalid password");
          return null;
        }

        console.log("User authorized:", user);
        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signIn",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
        };
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };