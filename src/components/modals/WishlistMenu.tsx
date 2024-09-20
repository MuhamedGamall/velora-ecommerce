"use client";
import React, { useEffect } from "react";
import ProductsMenu from "../ProductsMenu";
import useWishlistStore from "@/zustand/store/wishlistStore";
import { useSession } from "next-auth/react";

export default function WishlistMenu() {
  const { fetchWishlist, wishlist, resetWishlist, onOpen, onClose, isOpen } =
    useWishlistStore();
  const session = useSession();
  useEffect(() => {
    if (session?.status === "authenticated") fetchWishlist();
  }, []);
  return (
    <ProductsMenu
      type="wishlist"
      data={wishlist}
      onClose={onClose}
      isOpen={isOpen}
      onOpen={onOpen}
      resetBag={resetWishlist}
    />
  );
}
