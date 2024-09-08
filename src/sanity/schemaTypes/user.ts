import { defineField, defineType } from "sanity";

export const user = defineType({
  name: "user",
  title: "Users",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      readOnly: true, 
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      readOnly: true, 
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "url",
      readOnly: true, 
    }),
    defineField({
      name: "password",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "emailVerified",
      type: "datetime",
      hidden: true,
    }),
  ],
});
// account - required

export const account = defineType({
  name: "account",
  title: "Accounts",
  type: "document",
  fields: [
    {
      name: "providerType",
      type: "string",
    },
    {
      name: "providerId",
      type: "string",
    },
    {
      name: "providerAccountId",
      type: "string",
    },
    {
      name: "refreshToken",
      type: "string",
    },
    {
      name: "accessToken",
      type: "string",
    },
    {
      name: "accessTokenExpires",
      type: "number",
    },
    {
      name: "user",
      title: "User",
      type: "reference",
      to: { type: "user" },
    },
  ],
});

// verification-token - only if you use email provider

export const verificationToken = defineType({
  name: "verification-token",
  title: "Verification Tokens",
  type: "document",
  fields: [
    {
      name: "identifier",
      title: "Identifier",
      type: "string",
    },
    {
      name: "token",
      title: "Token",
      type: "string",
    },
    {
      name: "expires",
      title: "Expires",
      type: "datetime",
    },
  ],
});
