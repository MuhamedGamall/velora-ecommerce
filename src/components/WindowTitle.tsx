"use client";

import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface Params {
  categoryId?: string;
  subCategoryId?: string;
  productId?: string;
  checkoutStatus?: string;
}

export default function WindowTitle() {
  const pathname = usePathname();
  const { categoryId, subCategoryId, productId, checkoutStatus } =
    useParams() as Params;
  const searchQuery = useSearchParams().get("q");

  useEffect(() => {
    if (!pathname || typeof window === "undefined") return;

    if (pathname.includes("/product/") && productId) return;
    if (pathname.includes("/checkout")) {
      if (
        checkoutStatus &&
        ["cancelled", "successful"].includes(checkoutStatus)
      ) {
        document.title = `Checkout | ${checkoutStatus}`;
        return;
      }
      document.title = "Checkout";
      return;
    }
    if (pathname.includes("/wishlist")) {
      document.title = "Wishlist";
      return;
    }
    if (pathname.includes("/auth/signIn")) {
      document.title = "Velora | Sign In";
      return;
    }
    if (pathname.includes("/auth/register")) {
      document.title = "Velora | Sign Up";
      return;
    }
    if (pathname.includes("/explore")) {
      const titleParts = ["Explore"];

      if (searchQuery) titleParts.push(searchQuery);
      if (categoryId) titleParts.push(categoryId);
      if (subCategoryId) titleParts.push(subCategoryId);
      document.title = `${titleParts.join(" | ")}`;
    } else {
      document.title = "Velora";
    }
  }, [pathname, categoryId, subCategoryId, productId, searchQuery]);

  return null;
}
