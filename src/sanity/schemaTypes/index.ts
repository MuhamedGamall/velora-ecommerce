import { type SchemaTypeDefinition } from "sanity";
import heroSection from "./hero-section";
import { account, user, verificationToken } from "./user";
import category from "./category";
import subCategory from "./subCategory";
import { product } from "./product";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    heroSection,
    user,
    account,
    verificationToken,
    category,
    subCategory,
    product,
  ],
};
