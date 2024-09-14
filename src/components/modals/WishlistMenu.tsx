"use client";
import React, { useEffect } from "react";
import ProductsMenu from "../ProductsMenu";
import useWishlistStore from "@/zustand/store/wishlistStore";

export default function WishlistMenu() {
  const { fetchWishlist, wishlist, resetWishlist, onOpen, onClose, isOpen } =
    useWishlistStore();
  useEffect(() => {
    fetchWishlist();
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
