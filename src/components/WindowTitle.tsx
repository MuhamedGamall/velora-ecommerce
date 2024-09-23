"use client";

import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Params {
  categoryId?: string;
  subCategoryId?: string;
  productId?: string;
}

export default function WindowTitle() {
  const pathname = usePathname();
  const { categoryId, subCategoryId, productId } = useParams() as Params;
  const searchQuery = useSearchParams().get("q");

  useEffect(() => {
    if (!pathname || typeof window === "undefined") return;

    if (pathname.includes("/product/") && productId) return;
    if (pathname.includes("/checkout") ) {
      document.title = "Velora | Checkout";
      return;
    }
    if (pathname.includes("/wishlist") ) {
      document.title = "Velora | Wishlist";
      return;
    }

    if (pathname.includes("/explore")) {
      const titleParts = ["Explore"];

      if (searchQuery) titleParts.push(searchQuery);
      if (categoryId) titleParts.push(categoryId);
      if (subCategoryId) titleParts.push(subCategoryId);
      document.title = `Velora | ${titleParts.join(" | ")}`;
    } else {
      document.title = "Velora";
    }
  }, [pathname, categoryId, subCategoryId, productId, searchQuery]);

  return null;
}
