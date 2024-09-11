"use server";
import { client } from "@/sanity/lib/client";
const categoriesQuery = `*[_type == "category"]{
  _id,
  title,
  categoryImage{
   asset{
        _ref,
      },
  },
  subCategories[]->{
    _id,
    _key,
    title
  }
}`;
export default async function getCategories() {
  try {
    let categories = await client.fetch(categoriesQuery);
    categories = categories.slice(0, -1);
    console.log(categories);

    return categories as any;
  } catch (error: any) {
    console.error("Error fetching categories: ", error.message);
    return [];
  }
}
