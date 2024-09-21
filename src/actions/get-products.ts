"use server";

import { client } from "@/sanity/lib/client";
import getCategoryByTitle from "./get-category-by-title";
import { SearchParams } from "@/types";
import { revalidatePath } from "next/cache";
import { cache } from "react";

// Fetch the current year dynamically
const currentYear = new Date().getFullYear();

const baseProductsQuery = `{
  _id, _createdAt, title, desc, oldPrice, price, brand, 
  category->{_id, title}, 
  subCategory->{_id, title}, 
  images[]{asset->{_id, url}}, 
  secondaryImage{asset->{_id, url}}, 
  colour, material, pattern, sizes, 
  salesCount
}`;

const splitAndFormat = (query?: string) =>
  query
    ? query
        .split("|")
        .map((item) => `"${item}"`)
        .join(", ")
    : null;

const getProducts = async ({
  category,
  subCategory,
  searchParams,
}: {
  category?: string;
  subCategory?: string;
  searchParams?: SearchParams;
}) => {
  try {
    const conditions = [
      `price >= ${searchParams?.minPrice || 0} && price <= ${searchParams?.maxPrice || 10e10}`,
    ];

    // Handle category-specific conditions:
    // - "sale": filters products with a discount (oldPrice > 0)
    // - "newSeason": filters products marked as new season (newSeason == true)
    // - "accessories": filters products with the subcategory "accessories"
    // - For other categories, filter by category title and optionally subcategory title
    if (category?.trim()) {
      switch (category.trim()) {
        case "sale":
          conditions.push("oldPrice > 0");
          break;
        case "newSeason":
          conditions.push(`_createdAt match "${currentYear}*"`);
          break;
        case "accessories":
          conditions.push("subCategory->title == 'accessories'");
          break;
        default:
          conditions.push(`category->title == "${category}"`);
          if (subCategory?.trim()) {
            conditions.push(`subCategory->title == "${subCategory}"`);
          }
          break;
      }
    }
    if (splitAndFormat(searchParams?.colour))
      conditions.push(`colour in [${splitAndFormat(searchParams?.colour)}]`);

    if (splitAndFormat(searchParams?.material))
      conditions.push(
        `material in [${splitAndFormat(searchParams?.material)}]`
      );

    if (splitAndFormat(searchParams?.pattern))
      conditions.push(`pattern in [${splitAndFormat(searchParams?.pattern)}]`);

    if (searchParams?.size) {
      const sizes = splitAndFormat(searchParams.size);
      if (sizes) conditions.push(`count((sizes[])[@ in [${sizes}]]) > 0`);
    }

    if (splitAndFormat(searchParams?.brand))
      conditions.push(`brand in [${splitAndFormat(searchParams?.brand)}]`);

    if (searchParams?.q) conditions.push(`title match "${searchParams.q}*"`);
    if (searchParams?.sale === "true") conditions.push(`oldPrice > 0`);
    if (searchParams?.bestseller === "true")
      conditions.push(`salesCount >= 100`);
    if (searchParams?.newSeason === "true")
      conditions.push(`_createdAt match "${currentYear}*"`);

    let query = `*[_type == "product" && ${conditions.join(" && ")}]${baseProductsQuery}`;

    const sortOptions: Record<string, string> = {
      "price-asc": "price asc",
      "price-desc": "price desc",
      popular: "salesCount desc",
    };

    if (searchParams?.sortBy) {
      query += ` | order(${sortOptions[searchParams.sortBy] || "salesCount desc"})`;
    }

    const products = await client.fetch(query);
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export default getProducts;
