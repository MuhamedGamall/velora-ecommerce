"use client";
import useShoppingBagStore from "@/zustand/store/cartStore";
import { useEffect } from "react";
import ProductsMenu from "../ProductsMenu";
import { useSession } from "next-auth/react";

export default function CartMenu() {
  const {
    shoppingBag,
    fetchShoppingBag,
    resetShoppingBag,
    onOpen,
    onClose,
    isOpen,
    loading
  } = useShoppingBagStore();
  const session = useSession();
  useEffect(() => {
    if (session?.status === "authenticated") {
      fetchShoppingBag();
    }
  }, [session?.status]);

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
