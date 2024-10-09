"use client";
import useWishlistStore from "@/zustand/store/wishlistStore";
import { useEffect } from "react";
import ProductsMenu from "../ProductsMenu";

export default function WishlistMenu() {
  const {
    fetchWishlist,
    wishlist,
    resetWishlist,
    onOpen,
    onClose,
    isOpen,
    loading,
  } = useWishlistStore();
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
      loading={loading}
    />
  );
}
