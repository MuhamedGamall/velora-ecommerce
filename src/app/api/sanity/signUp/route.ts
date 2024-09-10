import { client } from "@/sanity/lib/client";
import { signUpHandler } from "next-auth-sanity";

export const POST = signUpHandler(client);
