"use client";

import { Button } from "@/components/ui/button";
import { CurrentClientSession, Product, Wishlist } from "@/types";
import useWishlistStore from "@/zustand/store/wishlistStore";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
const AddToWishlist = ({
  session,
  wishlist,
  product,
}: {
  session: CurrentClientSession;
  wishlist: Wishlist[];
  product: Product;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const userId = session?.data?.user?._id;
  const pathname = usePathname();

  const { addToWishlist, removeFromWishlist } = useWishlistStore();

  const addProductToWishlist = async () => {
    try {
      await addToWishlist({
        product,
        userId,
        pathname,
      });
      toast.success("Product added to wishlist");
    } catch (error) {
      toast.error("Something went wrong", {
        description:
          "Failed to adding product to the wishlist, please try again",
      });
    }
  };
  const removeProductFromWishlist = async () => {
    try {
      await removeFromWishlist({
        productId: product?._id,
        userId,
        pathname,
      });
    } catch (error) {
      toast.error("Something went wrong", {
        description:
          "Failed to removing product from the wishlist, please try again",
      });
    }
  };

  const isExist = wishlist.find((item) => item?.product?._id === product?._id);
  const handleClick = async () => {
    try {
      if (loading) return;
      setLoading(true);
      if (!session) return toast.error("Please login first");
      if (isExist) {
        removeProductFromWishlist();
      } else {
        addProductToWishlist();
      }
    } catch (error) {
      throw error;
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  return (
    <Button
      disabled={loading}
      variant={"outline"}
      className="border-black w-full rounded-none "
      onClick={handleClick}
    >
      {loading && <Loader2 size={15} className="animate-spin mr-3" />}
      {isExist ? "Remove from wishlist" : "Add to wishlist"}
    </Button>
  );
};

export default AddToWishlist;
