import { type SchemaTypeDefinition } from "sanity";
import heroImage from "./hero-image";
import { account, user, verificationToken } from "./user";
import category from "./category";
import subCategory from "./subCategory";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [heroImage, user, account, verificationToken, category, subCategory],
};
