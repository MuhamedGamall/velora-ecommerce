import { client } from "@/sanity/lib/client";
import { CategoryTree } from "@/types";

export default async function getCategoryByTitle(title: string) {
  const query = `*[_type == "category" && title == "${title}"]{
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
      title
    },
  }[0]`;
  const result = await client.fetch(query);
  return result || (null as CategoryTree | null);
}
