"use server";
import { client } from "@/sanity/lib/client";
import { Product } from "@/types";
const productQuery = `*[_type == "product" && _id == $id][0]{
    _id,
    _createdAt,
    title,
    moreInformation,
    qtyInStock,
    pattern,
    material,
    colour,
    maxPurchaseQty,
    desc,
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
    images[]{
      asset->{
        _id,
        url,
      }
    },
}`;

export default async function getProduct({ _id }: { _id: string }) {
  try {
    let product = (await client.fetch(productQuery, { id: _id })) as any;
    if (!product) {
      throw "Product not found";
    }

    return { product } as {
      product: Product | null;
    };
  } catch (error: any) {
    console.error("Error fetching product: ", error);
    return { product: null };
  }
}
