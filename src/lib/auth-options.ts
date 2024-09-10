import getUser from "@/actions/get-user";
import updateUserRole from "@/actions/update-user-role";
import { client } from "@/sanity/lib/client";
import { user } from "@/sanity/schemaTypes/user";
import { AuthOptions } from "next-auth";
import { SanityAdapter, SanityCredentials } from "next-auth-sanity";
import GoogleProvider from "next-auth/providers/google";
export const authOptions: AuthOptions = {
  adapter: SanityAdapter(client),
  providers: [
    SanityCredentials(client),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }: any) {
      const email = session?.user?.email as string;
      try {
        const user = await getUser({ email });
        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...user,
          },
        };
        return newSession;
      } catch (error: any) {
        console.error("Error retrieving user data: ", error.message);
        return session;
      }
    },
    async signIn({ user }) {
      try {
        console.log(process.env.CEO_EMAIL, user?.email);
        if (!user || !user?.email) return false;
        if (process.env.CEO_EMAIL === user?.email) {
          const updateUser = await updateUserRole({
            email: user.email,
            newRole: "admin",
          });
        }
        return true;
      } catch (error) {
        console.log("Error signing in", error);
        return false;
      }
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
  theme: {
    colorScheme: "light",
    logo: "/dark-logo.png",
  },
  pages: {
    signIn: "/auth/signIn",
    signOut: "/",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
