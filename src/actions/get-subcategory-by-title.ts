import { client } from "@/sanity/lib/client";
import { CategoryTree } from "@/types";

export default async function getSubCategoryByTitle(title: string) {
  const query = `*[_type == "subCategory" && title == "${title}"]{
    _id,
    title,
  }[0]`;

  const result = await client.fetch(query);
  return result || (null as CategoryTree | null);
}
