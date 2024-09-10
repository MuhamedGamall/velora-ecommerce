import { defineField, defineType } from "sanity";

const heroImage = defineType({
  name: "heroImage",
  title: "Hero Image",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "text",

      validation: (Rule) =>
        Rule.required().min(5).max(20).error("Title is required"),
    }),
    defineField({
      name: "descripteion",
      title: "Descripteion",
      type: "text",
      validation: (Rule) =>
        Rule.required().min(10).max(35).error("Descripteion is required"),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description:
        "There has to be one picture published because if there is more than one photo published, then the first picture will be selected.",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error("image is required"),
    }),
  ],
});
export default heroImage;
