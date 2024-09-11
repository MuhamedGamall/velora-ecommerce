import { defineType, defineField } from "sanity";

export default defineType({
  name: "subCategory",
  type: "document",
  title: "Sub Category",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(50)
          .error("Title must be between 1 and 50 characters"),
    }),
    defineField({
      name: "products",
      type: "array",
      title: "Products",
      of: [
        {
          type: "reference",
          to: [{ type: "product" }],
        },
      ],
      validation: (Rule) => Rule.unique().required(),
    }),
  ],
});
