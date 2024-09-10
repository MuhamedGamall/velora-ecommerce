import { type SchemaTypeDefinition } from "sanity";
import heroImages from "./hero-images";
import { account, user, verificationToken } from "./user";
import category from "./category";
import subCategory from "./subCategory";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [heroImages, user, account, verificationToken, category, subCategory],
};
