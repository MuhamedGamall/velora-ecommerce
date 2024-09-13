"use server";
import { client } from "@/sanity/lib/client";
import { UserProfile } from "@/types";

export default async function getUser({ email }: { email: string }) {
  try {
    if (!email) {
      console.log("getUser: email not found");
      return null;
    }
    const user = await client.fetch<{ _id: string }>(
      `*[_type == "user" && email == $email][0]`,
      { email: email }
    );

    return user as UserProfile;
  } catch (error: any) {
    console.error("Error retrieving user data: ", error);
    return null;
  }
}
