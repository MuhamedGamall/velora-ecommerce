"use server";
import { client } from "@/sanity/lib/client";
import { UserProfile } from "@/types";

const addProductToWishlist = async ({
  userId,
  productId,
  productTitle,
}: {
  userId: string;
  productId: string;
  productTitle: string;
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
    const isExist = user?.wishlist?.find(
      (item) => item?.product?._ref === productId
    );
    if (isExist) return true;

    const generateKey = () =>
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const log = await client
      .patch(userId)
      .setIfMissing({ wishlist: [] })
      .append("wishlist", [
        {
          _key: generateKey(),
          _type: "wishlistItem",
          product: { _type: "reference", _ref: productId },
          productTitle: productTitle,
        },
      ])
      .commit();
    console.log(log);

    return true;
  } catch (error: any) {
    console.error("Error adding product to the wishlist:", error);
  }
};

export default addProductToWishlist;
