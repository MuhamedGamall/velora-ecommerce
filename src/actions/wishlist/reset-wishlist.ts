"use server";
import { client } from "@/sanity/lib/client";
import { UserProfile } from "@/types";
import { revalidatePath } from "next/cache";

const resetWishlist = async ({
  userId,
  pathname,
}: {
  userId: string;
  pathname: string;
}) => {
  try {
    if (!userId) {
      throw ("User ID is required");
    }

    const user = (await client.getDocument(userId)) as UserProfile;

    if (!user) {
      throw ("User not found");
    }

    await client.patch(userId).set({ wishlist: [] }).commit();
    revalidatePath(pathname);
    return true;
  } catch (error) {
    console.error("Error resetting wishlist:", error);
    throw error;
  }
};

export default resetWishlist;
