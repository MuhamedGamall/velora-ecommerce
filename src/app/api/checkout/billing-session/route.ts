import getCurrentSession from "@/actions/get-current-session";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY) as Stripe;

export async function POST(req: NextRequest) {
  try {
    const session = await getCurrentSession();
    const user = session?.user;

    if (!user || !user.stripeCustomerId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const billingPortalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${process.env.NEXTAUTH_URL}`,
    });
    return NextResponse.json({ billingPortalUrl: billingPortalSession.url });
  } catch (error) {
    console.error("[CHECKOUT]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
