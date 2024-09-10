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
    // CredentialsProvider({
    //   name: "credentials" as string,
    //   credentials: {
    //     email: { label: "email", type: "text" },
    //     password: { label: "password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     if (!credentials?.email || !credentials?.password) {
    //       throw new Error("Invalid credentials");
    //     }

    //     // const user = await prisma.user.findUnique({
    //     //   where: {
    //     //     email: credentials.email,
    //     //   },
    //     // });

    //     // if (!user || !user?.hashedPassword) {
    //     //   throw new Error("Invalid credentials");
    //     // }

    //     const isValid = await bcrypt.compare(
    //       credentials.password,
    //       user.hashedPassword
    //     );
    //     if (!isValid) {
    //       throw new Error("Invalid Password");
    //     }

    //     return user;
    //   },
    // }),
  ],
  callbacks: {
    async session({ session, token }: any) {
      const email = session?.user?.email as string;
      try {
        const userEmail = token.email;
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
        console.log(process.env.CEO_EMAIL , user?.email);
        if (!user || !user?.email) return false;

        if (process.env.CEO_EMAIL === user?.email) {
          const updateUser = await updateUserRole({
            email: user.email,
            newRole: "admin",
          });

          console.log({ updateUser });
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
    // error: "/auth/signIn",
  },
  // debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
