import { defineField, defineType } from "sanity";

const heroImages = defineType({
  name: "heroImages",
  title: "HeroImages",
  type: "document",

  fields: [
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        defineField({
          name: "image",
          title: "Image",
          type: "image",
          options: {
            hotspot: true,
          },
          validation: (Rule) => Rule.required().error("Each image is required"),
        }),
      ],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(8)
          .error("You must include between 1 and 8 images"),
    }),
  ],
});
export default heroImages;
