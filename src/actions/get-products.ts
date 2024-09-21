"use server";

import { client } from "@/sanity/lib/client";
import getCategoryByTitle from "./get-category-by-title";

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

export interface SearchParams {
  q?: string;
  minPrice?: string;
  maxPrice?: string;
  colour?: string;
  material?: string;
  pattern?: string;
  size?: string;
  brand?: string;
  sale?: string;
  newCollection?: string;
  bestseller?: string;
  sortBy?: string;
}
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
    let conditions = [
      `price >= ${searchParams?.minPrice || 0} && price <= ${searchParams?.maxPrice || 10e10}`,
    ];

    if (category) {
      const cate = await getCategoryByTitle(category);
      if (!cate) throw "Category not found";
      conditions.push(`category._ref == "${cate._id}"`);
    }

    if (category && subCategory) {
      const cate = await getCategoryByTitle(category);
      if (!cate) throw "Category not found";
      const subCategory = cate?.subCategories.find(
        (subCategory: any) => subCategory.title === "clothing"
      );
      conditions.push(`subCategory._ref == "${subCategory._id}"`);
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
      const sizes = searchParams.size
        .split("|")
        .map((size) => `"${size}"`)
        .join(", ");
      conditions.push(`count((sizes[])[@ in [${sizes}]]) > 0`);
    }
    if (searchParams?.brand) {
      const formattedBrands = splitAndFormat(searchParams.brand);
      if (formattedBrands) conditions.push(`brand in [${formattedBrands}]`);
    }
    if (searchParams?.q) conditions.push(`title match "${searchParams.q}*"`);
    if (searchParams?.sale === "true") conditions.push(`oldPrice > 0`);
    if (searchParams?.bestseller === "true")
      conditions.push(`salesCount >= 100`);
    if (searchParams?.newCollection === "true")
      conditions.push(`_createdAt match "${currentYear}*"`);
console.log(currentYear);

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
    console.log(products);

    return products;
  } catch (error) {
    console.error("Error fetching products: ", error);
    return [];
  }
};

export default getProducts;
