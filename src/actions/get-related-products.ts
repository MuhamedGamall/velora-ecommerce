"use server";
import { isNewSeason } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { Product } from "@/types";
const productsQuery = `*[_type == "product" && brand == $brand && _id != $excludedId]{
    _id,
    _createdAt,
    title,
    desc,
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
   images[]{
      asset->{
        _id,
        url
      }
    },
    secondaryImage{
      asset->{
        _id,
        url
      }
    }
    }`;
const allDataQuery = `*[_type == "product" && _id != $excludedId][0...10]{
    _id,
    _createdAt,
    title,
    desc,
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
 images[]{
      asset->{
        _id,
        url
      }
    },
    secondaryImage{
      asset->{
        _id,
        url
      }
    }
  }`;
export default async function getRelatedProducts({
  brand,
  excludedId,
}: {
  brand: string;
  excludedId: string;
}) {
  try {
    if (!brand) {
      throw "Brand is required";
    }

    if (!excludedId) {
      throw "Excluded ID is required";
    }
    
    let products = await client.fetch(productsQuery, { brand, excludedId });
    products =
      products.length === 0
        ? await client.fetch(allDataQuery, { excludedId },)
        : products;

    return products as Product[];
  } catch (error: any) {
    console.error("Error fetching related products: ", error);
    return [];
  }
}
