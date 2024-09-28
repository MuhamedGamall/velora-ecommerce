"use server";
import { client } from "@/sanity/lib/client";
import { CategoryTree } from "@/types";
const categoriesQuery = `*[_type == "category"]{
  _id,
  title,
  categoryImage{
    asset->{
      _id,
      url
    }
  },
  subCategories[]->{
    _id,
    _key,
    title
  },
}`;

export default async function getCategories() {
  try {
    let categories = await client.fetch(categoriesQuery);
    return {
      categories,
    } as {
      categories: CategoryTree[];
    };
  } catch (error: any) {
    console.error("Error fetching categories: ", error);
    return {
      categories: [],
    };
  }
}
