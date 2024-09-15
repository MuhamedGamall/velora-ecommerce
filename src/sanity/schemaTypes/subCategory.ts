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
    defineField({
      name: "moreInformation",
      title: "More Information",
      type: "array",
      initialValue: [],
      of: [
        {
          type: "object",
          title: "Information",
          fields: [
            {
              name: "infoText",
              title: "Info Text",
              type: "string",
              validation: (Rule) => Rule.required().min(3).max(500),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.min(1).max(20),
    }),

  ],
});
