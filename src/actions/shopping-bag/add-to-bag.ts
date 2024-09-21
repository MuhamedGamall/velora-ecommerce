"use server";
import { client } from "@/sanity/lib/client";
import { UserProfile } from "@/types";

const addProductToBag = async ({
  userId,
  productId,
  size,
  quantity,
  productTitle,
}: {
  userId: string;
  productId: string;
  size: string;
  quantity: number;
  productTitle: string;
}) => {
  try {
    if (!userId) {
      throw "User ID is required";
    }
    if (!productId) {
      throw "Product ID is required";
    }

    if (quantity <= 0) {
      throw "Product Quantity should be greater than 0";
    }
    const user = (await client.getDocument(userId)) as UserProfile;

    if (!user) {
      throw "User not found";
    }
    const isExist = user?.shoppingBag?.find(
      (item) => item?.product?._ref === productId
    );
    if (isExist) return true;
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
    return true;
  } catch (error: any) {
    console.error("Error adding product to the shopping bag:", error);
  }
};

export default addProductToBag;
