"use client";
import ProductsSelected from "@/components/ProductsSelected";
import { Product } from "@/types";
import useShoppingBagStore from "@/zustand/store/cartStore";
import useWishlistStore from "@/zustand/store/wishlistStore";
import { useEffect } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import EmptyState from "../../../../components/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";

export default function WishlistContent() {
  const {
    wishlist,
    fetchWishlist,
    removeFromWishlist,
    resetWishlist,
    loading,
  } = useWishlistStore();
  const { addToBag } = useShoppingBagStore();
  const session = useSession();
  useEffect(() => {
    if (session?.status === "authenticated") {
      fetchWishlist();
    }
  }, [session?.status]);
  const handleRemove = async (productId: string) => {
    try {
      return await removeFromWishlist(productId);
    } catch (error) {
      toast.error("Something went wrong", {
        description:
          "Failed to removing product from the wishlist, please try again",
      });
    }
  };

  const handleReset = async () => {
    try {
      await resetWishlist();
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Failed to resetting wishlist, please try again",
      });
    }
  };
  const moveToShoppingBag = async (product: Product) => {
    try {
      await removeFromWishlist(product?._id);
      await addToBag({ product, quantity: 1, size: product?.sizes?.[0] });
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Failed to move to shopping bag, please try again",
      });
    }
  };
  if (loading) {
    return (
      <div className="w-full containerWrapper mx-auto mt-[130px] px-10">
        <Skeleton className="h-8 w-[150px] mb-3" />
        <Skeleton className="h-5 w-[100px]" />
        <ProductsSelected.Skeleton />
      </div>
    );
  }
  if (wishlist?.length === 0) {
    return (
      <div className="mt-[120px] mb-10">
        <EmptyState />
      </div>
    );
  }
  return (
    <div className="w-full containerWrapper mx-auto mt-[130px] px-10">
      {wishlist?.length > 0 && (
        <>
          <h1 className="text-[22px] md:text-[32px]  font-bold pt-5">
            Wishlist
          </h1>
          <span>{wishlist?.length} items</span>
        </>
      )}
      <ProductsSelected
        type="wishlist"
        reset={handleReset}
        remove={handleRemove}
        moveTo={moveToShoppingBag}
        data={wishlist}
      />
    </div>
  );
}
