"use client";
import useShoppingBagStore from "@/zustand/store/cartStore";
import { useEffect } from "react";
import ProductsMenu from "../ProductsMenu";

export default function CartMenu() {
  const {
    shoppingBag,
    fetchShoppingBag,
    resetShoppingBag,
    onOpen,
    onClose,
    isOpen,
    loading,
  } = useShoppingBagStore();
  useEffect(() => {
    fetchShoppingBag();
  }, []);

  return (
    <ProductsMenu
      type="cart"
      data={shoppingBag}
      onClose={onClose}
      isOpen={isOpen}
      onOpen={onOpen}
      resetBag={resetShoppingBag}
      loading={loading}
    />
  );
}
