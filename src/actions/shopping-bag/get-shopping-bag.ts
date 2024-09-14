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
        sizes,
        category->{
          _id,
          title,
        },
        subCategory->{
          _id,
          title,
        },
        images[0...1]{
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
      throw "User ID is required";
    }

    const user = (await client.fetch(userQuery, {
      userId: userId,
    })) as UserProfile;

    if (!user) {
      throw "User not found";
    }

    return user;
  } catch (error) {
    console.error("Error fetching user shopping bag: ", error);
    return { shoppingBag: [], _id: "" };
  }
};

export default getShoppingBag;
