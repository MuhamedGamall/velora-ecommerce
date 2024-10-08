"use server";
import { client } from "@/sanity/lib/client";
import { Product } from "@/types";
const productsQuery = `*[_type == "product" && "trending" in type]{
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
  images[] {
    asset->{
      _id,
      url
    }
  },
  secondaryImage {
    asset->{
      _id,
      url
    }
  }
    }`;
const allDataQuery = `*[_type == "product"][0...10]{
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
export default async function getTrendingProducts() {
  try {
    let products = await client.fetch(productsQuery);

    products =
      products.length === 0 ? await client.fetch(allDataQuery) : products;

    return { products } as {
      products: Product[];
      loading: boolean;
    };
  } catch (error: any) {
    console.error("Error fetching trending products: ", error);
    return { products: [] };
  }
}
