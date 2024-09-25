import getCurrentSession from "@/actions/get-current-session";
import { client } from "@/sanity/lib/client";
import { ShoppingBag } from "@/types";
import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
  try {
    const { shoppingBag }: { shoppingBag: ShoppingBag[] } = await req.json();

    const session = await getCurrentSession();
    const user = session?.user;

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!shoppingBag || shoppingBag.length === 0) {
      return new NextResponse("Your bag is empty", { status: 400 });
    }

    const stripeLineItems = shoppingBag.map((item) => ({
      price_data: {
        currency: "EGP",
        product_data: {
          name: item.product.title,
          images: [item?.product?.images?.[0]?.asset?.url],
        },
        unit_amount: item.product.price * 100,
      },
      quantity: item.quantity,
    }));
    const generateKey = () =>
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const createOrder = await client.create({
      _type: "order",
      isPaid: "unpaid",
      products: user.shoppingBag.map((item) => ({
        ...item,
        _type: "productItem",
      })),
      customer: {
        _ref: user._id,
        _type: "reference",
      },
      orderStatus: "cancelled",
    });
    if (createOrder) {
      await client
        .patch(user._id)
        .setIfMissing({ orders: [] })
        .append("orders", [
          { _type: "reference", _ref: createOrder._id, _key: generateKey() },
        ])
        .commit();
    }

    const stripeSession = await stripe.checkout.sessions.create({
      line_items: stripeLineItems,
      mode: "payment",
      invoice_creation: {
        enabled: true,
      },
      success_url: `${process.env.NEXTAUTH_URL}/checkout/successful`,
      cancel_url: `${process.env.NEXTAUTH_URL}/checkout/cancelled`,
      shipping_address_collection: {
        allowed_countries: ["EG"],
      },
      payment_method_types: ["card"],
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: "Delivery fee",
            type: "fixed_amount",
            fixed_amount: { amount: 10000, currency: "EGP" },
          },
        },
      ],
      metadata: {
        orderId: createOrder._id.toString(),
        userId: user?._id.toString(),
      },
      payment_intent_data: {
        metadata: {
          orderId: createOrder._id.toString(),
          userId: user?._id.toString(),
        },
      },
      customer: user.stripeCustomerId,
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("[CHECKOUT]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
