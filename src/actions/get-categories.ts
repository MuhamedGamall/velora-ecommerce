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
    let loading = true;
    let categories = await client.fetch(categoriesQuery);
    loading = false;
    return {
      categories,
      loading,
    } as {
      categories: CategoryTree[];
      loading: boolean;
    };
  } catch (error: any) {
    console.error("Error fetching categories: ", error);
    return {
      categories: [],
      loading: false,
    };
  }
}
