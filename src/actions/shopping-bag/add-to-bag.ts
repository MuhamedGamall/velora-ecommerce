"use server";
import { client } from "@/sanity/lib/client";
import { Product, ShoppingBag, UserProfile } from "@/types";
import { revalidatePath } from "next/cache";

const addProductToBag = async ({
  userId,
  productId,
  size,
  quantity,
  productTitle,
  pathname,
}: {
  userId: string;
  productId: string;
  size: string;
  quantity: number;
  productTitle: string;
  pathname: string;
}) => {
  try {
    if (!userId) {
      throw "User ID is required";
    }
    if (!productId) {
      throw "Product ID is required";
    }
    if (!size) {
      throw "Product Size is required";
    }
    if (quantity <= 0) {
      throw "Product Quantity should be greater than 0";
    }
    const user = await client.getDocument(userId);

    if (!user) {
      throw "User not found";
    }
    const generateKey = () =>
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    await client
      .patch(userId)
      .setIfMissing({ shoppingBag: [] })
      .append("shoppingBag", [
        {
          _key: generateKey(),
          _type: "shoppingBagItem",
          product: { _type: "reference", _ref: productId },
          productTitle: productTitle,
          size: size,
          quantity: quantity,
        },
      ])
      .commit();
    revalidatePath(pathname);
    return true;
  } catch (error: any) {
    console.error("Error adding product to the shopping bag:", error);
  }
};

export default addProductToBag;
