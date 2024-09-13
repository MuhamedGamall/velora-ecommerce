"use client";
import useShoppingBagStore from "@/zustand/store/cartStore";
import { useEffect } from "react";
import PreviewMyProducts from "../PreviewMyProducts";

export default function CartMenu() {
  const {
    shoppingBag,
    fetchShoppingBag,
    resetShoppingBag,
    onOpen,
    onClose,
    isOpen,
  } = useShoppingBagStore();
  useEffect(() => {
    fetchShoppingBag();
  }, []);

  return (
    <PreviewMyProducts
      type="cart"
      data={shoppingBag}
      onClose={onClose}
      isOpen={isOpen}
      onOpen={onOpen}
      resetBag={resetShoppingBag}
    />
  );
}
