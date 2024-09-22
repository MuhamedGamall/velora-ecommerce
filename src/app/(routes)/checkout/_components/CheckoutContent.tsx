"use client";
import ProductsSelected from "@/components/ProductsSelected";
import { Product } from "@/types";
import useShoppingBagStore from "@/zustand/store/cartStore";
import useWishlistStore from "@/zustand/store/wishlistStore";
import { useEffect } from "react";
import { toast } from "sonner";
import OrderSummary from "./OrderSummary";
import { useSession } from "next-auth/react";
import EmptyState from "../../../../components/EmptyState";

export default function CheckoutContent() {
  const { shoppingBag, fetchShoppingBag, removeFromBag, resetShoppingBag } =
    useShoppingBagStore();
  const { addToWishlist } = useWishlistStore();
  const session = useSession();
  useEffect(() => {
    if (session?.status === "authenticated") fetchShoppingBag();
  }, [session?.status]);
  const handleRemove = async (productId: string) => {
    try {
      return await removeFromBag(productId);
    } catch (error) {
      toast.error("Something went wrong", {
        description:
          "Failed to removing product from the shopping bag, please try again",
      });
    }
  };

  const handleReset = async () => {
    try {
      await resetShoppingBag();
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Failed to resetting shopping bag, please try again",
      });
    }
  };
  const moveToWishlist = async (product: Product) => {
    try {
      await removeFromBag(product?._id);
      await addToWishlist(product);
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Failed to move to wishlist, please try again",
      });
    }
  };
  if (shoppingBag?.length === 0) {
    return (
      <div className="mt-[120px]  mb-10">
        <EmptyState />
      </div>
    );
  }
  return (
    <div className="w-full containerWrapper mx-auto mt-[120px]">
      {shoppingBag?.length > 0 && (
        <h1 className="text-[22px] md:text-[32px]  font-semibold pt-5">
          Shopping Bag
        </h1>
      )}
      {shoppingBag?.length > 0 && <span>{shoppingBag?.length} items</span>}
      <div className="w-full flex max-md:flex-col items-start gap-10">
        <div className="md:flex-[2] w-full">
          <ProductsSelected
            type="checkout"
            reset={handleReset}
            remove={handleRemove}
            moveTo={moveToWishlist}
            data={shoppingBag}
          />
        </div>
        <div className="md:flex-1 w-full">
          <OrderSummary shoppingBag={shoppingBag} />
        </div>
      </div>
    </div>
  );
}
