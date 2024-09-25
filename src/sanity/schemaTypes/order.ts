import { defineField, defineType } from "sanity";

const order = defineType({
  name: "order",
  type: "document",
  title: "Order",
  fields: [
    defineField({
      name: "stripeId",
      type: "string",
      title: "Stripe ID",
      readOnly: true,
    }),
    defineField({
      name: "isPaid",
      type: "string",
      title: "Is Paid",
      readOnly: true,
      initialValue: "unpaid",
    }),
    defineField({
      name: "customer",
      title: "Customer",
      readOnly: true,
      type: "reference",
      to: [{ type: "user" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "orderStatus",
      type: "string",
      title: "Order Status",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Processing", value: "processing" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
      initialValue: "cancelled",
    }),
    defineField({
      name: "products",
      type: "array",
      title: "Products",
      readOnly: true,
      of: [
        {
          type: "object",
          name: "productItem",
          fields: [
            {
              name: "product",
              title: "Product",
              type: "reference",
              to: [{ type: "product" }],
              validation: (Rule) => Rule.required(),
            },
            {
              name: "productTitle",
              type: "string",
              title: "Product Title",
              validation: (Rule) => Rule.required(),
              description: "Title of the product",
            },

            {
              name: "size",
              type: "string",
              title: "Size",
            },
            {
              name: "quantity",
              type: "number",
              title: "Quantity",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      createdAt: '_createdAt', // Select the creation date
      isPaid: 'isPaid', // Select the payment status
      orderStatus: 'orderStatus', // Select the order status
    },
    prepare(selection) {
      const { createdAt, isPaid, orderStatus } = selection;
      return {
        title: `${new Date(createdAt).toLocaleDateString()} - ${isPaid} - ${orderStatus}`,
      };
    },
  },
});

export default order;
