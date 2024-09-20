import { defineType, defineField } from "sanity";

export default defineType({
  name: "category",
  type: "document",
  title: "Category",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(30)
          .error("Title must be between 1 and 30 characters"),
    }),

    defineField({
      name: "subCategories",
      type: "array",
      title: "Sub Categories",
      of: [
        {
          type: "reference",
          to: [{ type: "subCategory" }],
        },
      ],
      validation: (Rule) => Rule.unique().required(),
    }),
    defineField({
      name: "categoryImage",
      title: "Category Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
