"use server";
import { client } from "@/sanity/lib/client";
import { ShoppingBag, UserProfile } from "@/types";
const userQuery = `
  *[_type == "user" && _id == $userId][0]{
  _id,
    shoppingBag[]{
      _key, 
      _type,
      product->{
        _id,
        title,
        qtyInStock,
        colour,
        oldPrice,
        price,
        brand,
        category->{
          _id,
          title,
        },
        subCategory->{
          _id,
          title,
        },
        "image":images[0]{
          asset->{
            _id,
            url
          }
        }
      },
      size,
      quantity
    }
  }
`;

const getShoppingBag = async ({ userId }: { userId: string }) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const user = (await client.fetch(userQuery, { userId })) as UserProfile;

    if (!user) {
      throw new Error("User not found");
    }

    const { shoppingBag, _id }: { shoppingBag: ShoppingBag[]; _id: string } =
      user;

    if (!shoppingBag.length) {
      throw new Error("User shopping bag not found");
    }

    return { shoppingBag, _id };
  } catch (error) {
    console.error("Error fetching user shopping bag: ", error);
    return { shoppingBag: [], _id: "" };
  }
};

export default getShoppingBag;
