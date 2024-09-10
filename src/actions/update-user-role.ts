"use server";
import { client } from "@/sanity/lib/client";
import React from "react";
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
      console.log("updateUserRole: email or newRole not provided");
      return null;
    }
    const user = await getUser({ email });
    if (!user) {
      console.log("User not found with the provided email");
      return null;
    }

    await client.patch(user._id).set({ role: newRole }).commit();

    return user;
  } catch (error: any) {
    console.error("Error updating user role: ", error.message);
    return null;
  }
}
