"use server";
import { authOptions } from "@/lib/auth-options";
import { CurrentServerSession } from "@/types";
import { getServerSession } from "next-auth";

export default async function getCurrentSession() {
  try {
    const user = (await getServerSession(authOptions)) as CurrentServerSession;
    if (!user) {
      console.log("No user found in session");
      return null;
    }
    return user;
  } catch (error: any) {
    console.error("Error retrieving current user session: ", error.message);
    return null;
  }
}
