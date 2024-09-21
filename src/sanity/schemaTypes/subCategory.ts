import { defineType, defineField } from "sanity";

export default defineType({
  name: "subCategory",
  type: "document",
  liveEdit: false,
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
  ],
});
