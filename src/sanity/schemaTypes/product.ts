import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
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
      validation: (Rule) => Rule.min(1).max(20),
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
      validation: (Rule) => Rule.required(),
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
        list: [
          { title: "Nike", value: "nike" },
          { title: "Adidas", value: "adidas" },
          { title: "Puma", value: "puma" },
          { title: "Under Armour", value: "under_armour" },
          { title: "Reebok", value: "reebok" },
          { title: "Louis Vuitton", value: "louis_vuitton" },
          { title: "Gucci", value: "gucci" },
          { title: "Chanel", value: "chanel" },
          { title: "Hermès", value: "hermes" },
          { title: "Prada", value: "prada" },
          { title: "Versace", value: "versace" },
          { title: "Dior", value: "dior" },
          { title: "Fendi", value: "fendi" },
          { title: "Balenciaga", value: "balenciaga" },
          { title: "Givenchy", value: "givenchy" },
          { title: "Tom Ford", value: "tom_ford" },
          { title: "Burberry", value: "burberry" },
          { title: "Saint Laurent", value: "saint_laurent" },
          { title: "Alexander McQueen", value: "alexander_mcqueen" },
          { title: "Giorgio Armani", value: "giorgio_armani" },
          { title: "Dolce & Gabbana", value: "dolce_gabbana" },
          { title: "Ralph Lauren", value: "ralph_lauren" },
          { title: "Calvin Klein", value: "calvin_klein" },
          { title: "Tommy Hilfiger", value: "tommy_hilfiger" },
          { title: "Michael Kors", value: "michael_kors" },
          { title: "Hugo Boss", value: "hugo_boss" },
          { title: "Valentino", value: "valentino" },
          { title: "Moncler", value: "moncler" },
          { title: "Off-White", value: "off_white" },
          { title: "Supreme", value: "supreme" },
          { title: "Levi's", value: "levis" },
          { title: "Lacoste", value: "lacoste" },
          { title: "Vans", value: "vans" },
          { title: "Zara", value: "zara" },
          { title: "H&M", value: "hm" },
          { title: "Uniqlo", value: "uniqlo" },
          { title: "Gap", value: "gap" },
          { title: "Forever 21", value: "forever_21" },
          { title: "American Eagle", value: "american_eagle" },
          { title: "Abercrombie & Fitch", value: "abercrombie_fitch" },
          { title: "Banana Republic", value: "banana_republic" },
          { title: "Old Navy", value: "old_navy" },
          { title: "Victoria's Secret", value: "victorias_secret" },
          { title: "Urban Outfitters", value: "urban_outfitters" },
          { title: "Free People", value: "free_people" },
          { title: "Anthropologie", value: "anthropologie" },
          { title: "Coach", value: "coach" },
          { title: "Kate Spade", value: "kate_spade" },
          { title: "Tory Burch", value: "tory_burch" },
          { title: "Skechers", value: "skechers" },
          { title: "New Balance", value: "new_balance" },
          { title: "Converse", value: "converse" },
          { title: "AllSaints", value: "allsaints" },
          { title: "Ted Baker", value: "ted_baker" },
          { title: "Topshop", value: "topshop" },
          { title: "Lululemon", value: "lululemon" },
          { title: "J.Crew", value: "j_crew" },
          { title: "Madewell", value: "madewell" },
          { title: "Diesel", value: "diesel" },
          { title: "Guess", value: "guess" },
          { title: "True Religion", value: "true_religion" },
          { title: "Hollister", value: "hollister" },
          { title: "Aritzia", value: "aritzia" },
          { title: "Balmain", value: "balmain" },
          { title: "Kenzo", value: "kenzo" },
          { title: "Ermenegildo Zegna", value: "ermenegildo_zegna" },
          { title: "Salvatore Ferragamo", value: "salvatore_ferragamo" },
          { title: "Bvlgari", value: "bvlgari" },
          { title: "Brioni", value: "brioni" },
          { title: "Canali", value: "canali" },
          { title: "Dries Van Noten", value: "dries_van_noten" },
          { title: "Loewe", value: "loewe" },
          { title: "Miu Miu", value: "miu_miu" },
          { title: "Stella McCartney", value: "stella_mccartney" },
          { title: "Celine", value: "celine" },
          { title: "Jimmy Choo", value: "jimmy_choo" },
          { title: "Christian Louboutin", value: "christian_louboutin" },
          { title: "Bottega Veneta", value: "bottega_veneta" },
          { title: "Maison Margiela", value: "maison_margiela" },
          { title: "Etro", value: "etro" },
          { title: "Thom Browne", value: "thom_browne" },
          { title: "Palm Angels", value: "palm_angels" },
          { title: "Amiri", value: "amiri" },
          { title: "Fear of God", value: "fear_of_god" },
          { title: "Kith", value: "kith" },
          { title: "Stone Island", value: "stone_island" },
          { title: "A.P.C.", value: "apc" },
          { title: "Carhartt", value: "carhartt" },
          { title: "Patagonia", value: "patagonia" },
          { title: "The North Face", value: "the_north_face" },
          { title: "Columbia", value: "columbia" },
          { title: "Arc'teryx", value: "arcteryx" },
          { title: "Fila", value: "fila" },
          { title: "Champion", value: "champion" },
          { title: "Asics", value: "asics" },
          { title: "Brooks", value: "brooks" },
        ],
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
        list: [
          { title: "Beige", value: "beige" },
          { title: "Black", value: "black" },
          { title: "Blue", value: "blue" },
          { title: "Brown", value: "brown" },
          { title: "Gold", value: "gold" },
          { title: "Gray", value: "gray" },
          { title: "Green", value: "green" },
          { title: "Multicolor", value: "multicolor" },
          { title: "Navy Blue", value: "navy_blue" },
          { title: "Orange", value: "orange" },
          { title: "Pink", value: "pink" },
          { title: "Purple", value: "purple" },
          { title: "Red", value: "red" },
          { title: "Silver", value: "silver" },
          { title: "White", value: "white" },
          { title: "Yellow", value: "yellow" },
        ],
      },
    }),
    defineField({
      name: "material",
      title: "Material",
      type: "string",
      options: {
        list: [
          { title: "Acetate", value: "acetate" },
          { title: "Acrylic", value: "acrylic" },
          { title: "Bamboo", value: "bamboo" },
          { title: "Beaded", value: "beaded" },
          { title: "Cashmere", value: "cashmere" },
          { title: "Chiffon", value: "chiffon" },
          { title: "Corduroy", value: "corduroy" },
          { title: "Cotton", value: "cotton" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pattern",
      title: "Pattern",
      type: "string",

      options: {
        list: [
          { title: "Floral", value: "floral" },
          { title: "Leopard", value: "leopard" },
          { title: "Stripes", value: "stripes" },
          { title: "Snake", value: "snake" },
          { title: "Camo", value: "camo" },
          { title: "Polka Dots", value: "polka_dots" },
          { title: "Checkered", value: "checkered" },
          { title: "Paisley", value: "paisley" },
        ],
      },
    }),
    defineField({
      name: "sizes",
      title: "Sizes",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Extra Small (XS)", value: "XS" },
          { title: "Small (S)", value: "S" },
          { title: "Medium (M)", value: "M" },
          { title: "Large (L)", value: "L" },
          { title: "Extra Large (XL)", value: "XL" },
          { title: "2X Large (2XL)", value: "2XL" },
          { title: "3X Large (3XL)", value: "3XL" },
          { title: "4X Large (4XL)", value: "4XL" },
          { title: "5X Large (5XL)", value: "5XL" },
        ],
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
