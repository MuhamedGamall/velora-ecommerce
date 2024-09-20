"use client";
import ProductsSelected from "@/components/ProductsSelected";
import { Product } from "@/types";
import useShoppingBagStore from "@/zustand/store/cartStore";
import useWishlistStore from "@/zustand/store/wishlistStore";
import { useEffect } from "react";
import { toast } from "sonner";
import EmptyState from "@/components/EmptyState";
import { useSession } from "next-auth/react";

export default function WishlistContent() {
  const { wishlist, fetchWishlist, removeFromWishlist, resetWishlist } =
    useWishlistStore();
  const { addToBag } = useShoppingBagStore();
  const session = useSession();
  useEffect(() => {
    if (session?.status === "authenticated") {
      fetchWishlist();
    }
  }, []);
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
  if (wishlist?.length === 0) {
    return <EmptyState type="wishlist" />;
  }
  return (
    <div className="w-full containerWrapper mx-auto">
      {wishlist?.length > 0 && (
        <h1 className="text-[22px] md:text-[32px]  font-bold pt-5">Wishlist</h1>
      )}
      {wishlist?.length > 0 && <span>{wishlist?.length} items</span>}
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
