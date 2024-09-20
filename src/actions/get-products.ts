// "use server";

// import { client } from "@/sanity/lib/client";

// // Fetch the current year dynamically
// const currentYear = new Date().getFullYear();

// const baseProductsQuery = `{
//   _id, _createdAt, title, desc, oldPrice, price, brand, category->{_id, title}, 
//   subCategory->{_id, title}, images[]{asset->{_id, url}}, secondaryImage{asset->{_id, url}},
//   colour, material, pattern, sizes, bestseller, newCollection, salesCount
// }`;

// export interface SearchParams {
//   q?: string;
//   minPrice?: string;
//   maxPrice?: string;
//   colour?: string;
//   material?: string;
//   pattern?: string;
//   size?: string;
//   brand?: string;
//   sale?: string;
//   newCollection?: string;
//   bestseller?: string;
//   sortBy?: string;
// }

// const getProducts = async ({
//   category,
//   subCategory,
//   searchParams,
// }: {
//   category?: string;
//   subCategory?: string;
//   searchParams?: SearchParams;
// }) => {
//   try {
//     // Start with a condition to exclude draft documents
//     let conditions = [
//       `price >= ${searchParams?.minPrice || 0} && price <= ${searchParams?.maxPrice || 10e10}`,
//     ];
//     // Add filters based on `searchParams`
//     if (category) conditions.push(`category.title == "${category}"`);
//     // if (subCategory) conditions.push(`subCategory.title == "${subCategory}"`);
//     // if (searchParams?.q) conditions.push(`title match "${searchParams.q}*"`);
//     // const split = (query: string) => JSON.stringify(query?.split("|"));
//     // if (searchParams?.colour)
//     //   conditions.push(`colour in "${split(searchParams?.colour)}"`);
//     // if (searchParams?.material)
//     //   conditions.push(`material in "${split(searchParams?.material)}"`);
//     // if (searchParams?.pattern)
//     //   conditions.push(`pattern in "${split(searchParams?.pattern)}"`);
//     // if (searchParams?.size) {
//     //   const sizes =split(searchParams?.size);
//     //   conditions.push(`count((sizes[])[_ in ${(sizes)}]) > 0`);
//     // }
//     // if (searchParams?.brand)
//     //   conditions.push(`brand in "${searchParams?.brand}"`);
//     // if (searchParams?.sale === "true") conditions.push(`oldPrice > 0`);

//     // if (searchParams?.bestseller === "true") {
//     //   conditions.push(`salesCount >= 100`);
//     // }

//     // if (searchParams?.newCollection === "true") {
//     //   conditions.push(`dateTime(_createdAt).year == ${currentYear}`);
//     // }

//     let query = conditions.length
//       ? `*[_type == "product" && ${conditions.join(" && ")}]${baseProductsQuery}`
//       : `*[_type == "product"]${baseProductsQuery}`;

//     const sortOptions: Record<string, string> = {
//       "price-asc": "price asc",
//       "price-desc": "price desc",
//       popular: "salesCount desc",
//     };

//     if (searchParams?.sortBy) {
//       query += ` | order(${sortOptions[searchParams.sortBy] || "salesCount desc"})`;
//     }

//     const products = await client.fetch(query);
//     console.log(products.map((el)=>el.category.title));
//     return products;
//   } catch (error) {
//     console.error("Error fetching products: ", error);
//     return [];
//   }
// };

// export default getProducts;
