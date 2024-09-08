import { type SchemaTypeDefinition } from "sanity";
import heroImages from "./hero-images";
import { account, user, verificationToken } from "./user";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [heroImages, user, account, verificationToken],
};
