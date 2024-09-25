import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import CanccelledCheckout from "./_components/CanccelledCheckout";
import SuccessfulyCheckout from "./_components/SuccessfulyCheckout";
import { notFound } from "next/navigation";

export default function CheckoutStatesPage({
  params: { checkoutStatus },
}: {
  params: { checkoutStatus: string };
}) {
  if (checkoutStatus === "cancelled") {
    return <CanccelledCheckout />;
  }

  if (checkoutStatus === "successful") {
    return <SuccessfulyCheckout />;
  }
  return notFound()
}

