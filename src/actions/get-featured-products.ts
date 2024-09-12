"use server";
import { isNew } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { Product } from "@/types";
const productsQuery = `*[_type == "product" && "featured" in type]{
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
export default async function getFeaturedProducts() {
  try {
    let products = await client.fetch(productsQuery);

    products =
      products.length === 0 ? await client.fetch(allDataQuery) : products;

    products = products.map((product: Product) => ({
      ...product,
      isNew: isNew(product?._createdAt),
    }));
    return products as Product[];
  } catch (error: any) {
    console.error("Error fetching featured products: ", error.message);
    return [];
  }
}
