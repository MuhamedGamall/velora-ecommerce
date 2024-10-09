import {
  BRANDS_OPTIONS,
  COLOURS_OPTIONS,
  MATERIALS_OPTIONS,
  PATTERNS_OPTIONS,
  SIZES_OPTIONS,
} from "@/constants";
import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  liveEdit: false,
  fields: [ 
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(3).max(50),
    }),
    defineField({
      name: "desc",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required().min(10).max(300),
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
    }),

    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          validation: (Rule) => Rule.required(),
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(10),
    }),
    defineField({
      name: "secondaryImage",
      title: "Secondary Image",
      description: "Secondary image will be displayed on hover",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) =>
        Rule.precision(2).required().positive().greaterThan(1),
    }),
    defineField({
      name: "oldPrice",
      title: "Old Price",
      type: "number",
      validation: (Rule) => Rule.precision(2).positive().greaterThan(1),
    }),
    defineField({
      name: "salesCount",
      title: "Sales Count",
      type: "number",
      readOnly: true,
      initialValue: 0,
    }),
    defineField({
      name: "brand",
      title: "Brand",
      type: "string",
      validation: (Rule) => Rule.required(),

      options: {
        list: BRANDS_OPTIONS,
      },
    }),
    defineField({
      name: "qtyInStock",
      title: "Quantity in Stock",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "maxPurchaseQty",
      title: "Maximum Purchase Quantity",
      type: "number",
      initialValue: 1,
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "colour",
      title: "Colour",
      type: "string",
      validation: (Rule) => Rule.required(),

      options: {
        list: COLOURS_OPTIONS,
      },
    }),
    defineField({
      name: "material",
      title: "Material",
      type: "string",
      options: {
        list: MATERIALS_OPTIONS,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pattern",
      title: "Pattern",
      type: "string",

      options: {
        list: PATTERNS_OPTIONS,
      },
    }),
    defineField({
      name: "sizes",
      title: "Sizes",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: SIZES_OPTIONS,
        layout: "grid",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subCategory",
      title: "Sub Category",
      type: "reference",
      to: [{ type: "subCategory" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Featured", value: "featured" },
          { title: "Trending", value: "trending" },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
});
