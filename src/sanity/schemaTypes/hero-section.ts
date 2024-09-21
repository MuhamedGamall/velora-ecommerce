import { defineField, defineType } from "sanity";

const heroSection = defineType({
  name: "heroSection",
  title: "Hero Section",
  liveEdit: false,
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(5).max(30),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
      validation: (Rule) => Rule.required().min(10).max(50),
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
export default heroSection;
