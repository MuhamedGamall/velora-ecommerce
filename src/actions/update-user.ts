"use server";
import { client } from "@/sanity/lib/client";
import getUser from "./get-user";

export default async function updateUser({
  email,
  data,
}: {
  email: string;
  data: any;
}) {
  try {
    if (!email) {
      throw "Email is required";
    }
    const user = await getUser({ email });
    
    if (!user) {
      throw "User not found";
    }

    await client.patch(user._id).set(data).commit();

    return user;
  } catch (error: any) {
    console.error("Error updating user: ", error.message);
    return null;
  }
}
