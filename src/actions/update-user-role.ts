"use server";
import { client } from "@/sanity/lib/client";
import getUser from "./get-user";

export default async function updateUserRole({
  email,
  newRole,
}: {
  email: string;
  newRole: string;
}) {
  try {
    if (!email) {
      throw "Email is required";
    }
    const user = await getUser({ email });
    
    if (!user) {
      throw "User not found";
    }

    await client.patch(user._id).set({ role: newRole }).commit();

    return user;
  } catch (error: any) {
    console.error("Error updating user role: ", error.message);
    return null;
  }
}
