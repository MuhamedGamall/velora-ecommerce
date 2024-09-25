import resetShoppingBag from "@/actions/shopping-bag/reset-shopping-bag";
import { client } from "@/sanity/lib/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
  const reqBuffer = await req.text();
  const signature = headers().get("stripe-signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      reqBuffer,
      signature,
      process.env.STRIPE_WEBHOOK_SIGNING_SECRET_KEY
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event?.data?.object as Stripe.Checkout.Session;
  const userId = session?.metadata?.userId;
  const orderId = session?.metadata?.orderId;

  if (!userId || !orderId) {
    return new NextResponse(`Webhook Error: Missing metadata`, {
      status: 400,
    });
  }
  if (
    event.type === "payment_intent.canceled" ||
    event.type === "payment_intent.payment_failed" ||
    session?.payment_status === "unpaid"
  ) {
    await client
      .patch(orderId)
      .set({
        _type: "order",
        isPaid: "unpaid",
        stripeId: session.id,
        orderStatus: "cancelled",
      })
      .commit();
  }

  // Handle successful payment
  if (event.type === "checkout.session.completed") {
    const isPaid = session?.payment_status === "paid";
    let updateOrder = null;
    if (isPaid) {
      updateOrder = await client
        .patch(orderId)
        .set({
          _type: "order",
          isPaid: "paid",
          stripeId: session.id,
          orderStatus: "pending",
        })
        .commit();
    }
    if (updateOrder) {
      await resetShoppingBag({
        userId,
      });
    }
  } else {
    return new NextResponse(
      `Webhook Error: Unhandled event type ${event.type}`,
      { status: 200 }
    );
  }

  return new NextResponse(null, { status: 200 });
}
