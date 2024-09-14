"use server";
import { client } from "@/sanity/lib/client";
import { UserProfile } from "@/types";

const resetWishlist = async ({
  userId,
}: {
  userId: string;
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
    return true;
  } catch (error) {
    console.error("Error resetting wishlist:", error);
    throw error;
  }
};

export default resetWishlist;
