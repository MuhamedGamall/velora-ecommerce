import getCurrentSession from "@/actions/get-current-session";
import getUser from "@/actions/get-user";
import updateUser from "@/actions/update-user";
import { client } from "@/sanity/lib/client";
import { AuthOptions } from "next-auth";
import { SanityAdapter, SanityCredentials } from "next-auth-sanity";
import GoogleProvider from "next-auth/providers/google";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
        if (!user || !user?.email) return false;

        if (process.env.CEO_EMAIL === user?.email) {
          const update = await updateUser({
            email: user.email,
            data: { role: "admin" },
          });
        }
        
        const fetchUser = await getUser({ email: user.email });
        const haveStripeCustomer = fetchUser?.stripeCustomerId;

        if (haveStripeCustomer) return true;

        const { id: stripeCustomerId } = await stripe.customers.create({
          email: user?.email,
          description: "Customer created from Sanity Registration",
        });
        await updateUser({
          email: user.email,
          data: { stripeCustomerId },
        });
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
