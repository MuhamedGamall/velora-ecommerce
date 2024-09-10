import { defineField, defineType } from "sanity";

const heroImage = defineType({
  name: "heroImage",
  title: "Hero Image",
  type: "document",
  fields: [
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
