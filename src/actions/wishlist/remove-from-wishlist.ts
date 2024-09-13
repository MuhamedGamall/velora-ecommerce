"use server";
import { client } from "@/sanity/lib/client";
import { UserProfile } from "@/types";
import { revalidatePath } from "next/cache";

const removeFromWishlist = async ({
  userId,
  productId,
  pathname,
}: {
  userId: string;
  productId: string;
  pathname: string;
}) => {
  try {
    if (!userId) {
      throw "User ID is required";
    }
    if (!productId) {
      throw "Product ID is required";
    }
    const user = (await client.getDocument(userId)) as UserProfile;

    if (!user) {
      throw "User not found";
    }
    const updatedWishlist = user.wishlist.filter(
      (item) => item.product._ref !== productId
    );

    await client.patch(userId).set({ wishlist: updatedWishlist }).commit();
    revalidatePath(pathname);
    return true;
  } catch (error) {
    console.error("Error removing product from the wishlist:", error);
    throw error;
  }
};

export default removeFromWishlist;
