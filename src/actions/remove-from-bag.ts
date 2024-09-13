"use server";
import { client } from "@/sanity/lib/client";
import { UserProfile } from "@/types";
import { revalidatePath } from "next/cache";

const removeProductFromBag = async ({
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
      throw new Error("User ID is required");
    }
    if (!productId) {
      throw new Error("Product ID is required");
    }
    const user = (await client.getDocument(userId)) as UserProfile;

    if (!user) {
      throw new Error("User not found");
    }
    const updatedShoppingBag = user.shoppingBag.filter(
      (item) => item.product._ref !== productId
    );

    await client
      .patch(userId)
      .set({ shoppingBag: updatedShoppingBag })
      .commit();
    revalidatePath(pathname);
  } catch (error) {
    console.error("Error removing product from the shopping bag:", error);
    throw error;
  }
};

export default removeProductFromBag;
