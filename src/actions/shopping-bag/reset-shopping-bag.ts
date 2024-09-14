"use server";
import { client } from "@/sanity/lib/client";
import { UserProfile } from "@/types";

const resetShoppingBag = async ({ userId }: { userId: string }) => {
  try {
    if (!userId) {
      throw "User ID is required";
    }

    const user = (await client.getDocument(userId)) as UserProfile;

    if (!user) {
      throw "User not found";
    }

    await client.patch(userId).set({ shoppingBag: [] }).commit();
    return true;
  } catch (error) {
    console.error("Error resetting shopping bag:", error);
    throw error;
  }
};

export default resetShoppingBag;
