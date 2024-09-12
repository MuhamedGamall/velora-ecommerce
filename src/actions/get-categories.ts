"use server";
import { client } from "@/sanity/lib/client";
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
    return categories as any;
  } catch (error: any) {
    console.error("Error fetching categories: ", error.message);
    return [];
  }
}
