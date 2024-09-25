"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

export default function OrdersButtn({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const session = useSession();
  const manageOrders = async () => {
    if (session.status === "unauthenticated") return;
    try {
      setLoading(true);
      const { data } = await axios.post("/api/checkout/billing-session");
      if (!data || !data.billingPortalUrl) return;
      router.push(data.billingPortalUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <button disabled={loading} onClick={manageOrders} className={className}>
      {loading ? "Loading..." : children}
    </button>
  );
}
