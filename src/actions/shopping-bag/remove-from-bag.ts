"use server";
import { client } from "@/sanity/lib/client";
import { UserProfile } from "@/types";

const removeProductFromBag = async ({
  userId,
  productId,
}: {
  userId: string;
  productId: string;
}) => {
  try {
    if (!userId) {
      throw ("User ID is required");
    }
    if (!productId) {
      throw("Product ID is required");
    }
    const user = (await client.getDocument(userId)) as UserProfile;

    if (!user) {
      throw ("User not found");
    }
    const updatedShoppingBag = user?.shoppingBag?.filter(
      (item) => item.product._ref !== productId
    );

    await client
      .patch(userId)
      .set({ shoppingBag: updatedShoppingBag })
      .commit();
    return true;
  } catch (error) {
    console.error("Error removing product from the shopping bag:", error);
    throw error;
  }
};

export default removeProductFromBag;
