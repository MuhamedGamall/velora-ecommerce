"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CurrentClientSession, Product, ShoppingBag } from "@/types";
import useShoppingBagStore from "@/zustand/store/cartStore";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
const AddToBag = ({
  quantity,
  size,
  session,
  shoppingBag,
  product,
}: {
  quantity: number;
  size: string;
  session: CurrentClientSession;
  shoppingBag: ShoppingBag[];
  product: Product;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [sizeError, setSizeError] = useState<boolean>(false);

  const {
    addToBag,
    removeFromBag,
    loading: bagLoading,
  } = useShoppingBagStore();

  const addproductToBag = async () => {
    try {
      if (!size && product?.sizes) return setSizeError(true);
      if (quantity <= 0)
        return toast.error("Quantity should be greater than 0");
      await addToBag({
        product,
        quantity,
        size: size || "",
      });
      setSizeError(false);
      toast.success("Product added to bag");
    } catch (error) {
      toast.error("Something went wrong", {
        description:
          "Failed to adding product to the shopping bag, please try again",
      });
    }
  };
  const removeProductFromBag = async () => {
    try {
      await removeFromBag(product?._id);
    } catch (error) {
      toast.error("Something went wrong", {
        description:
          "Failed to removing product from the shopping bag, please try again",
      });
    }
  };

  const isExist = shoppingBag.find(
    (item) => item?.product?._id === product?._id
  );
  const handleClick = async () => {
    try {
      if (loading) return;
      setLoading(true);
      if (!session) return toast.error("Please login first");
      if (isExist) {
        removeProductFromBag();
      } else {
        addproductToBag();
      }
    } catch (error) {
      throw error;
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };
  if (bagLoading) {
    return <Skeleton className="h-10 w-full" />;
  }
  return (
    <>
      {sizeError && !size && (
        <span className="text-red-700 text-sm">{"Please select a size"}</span>
      )}
      <Button
        disabled={loading}
        className=" bg-mainBlack border-mainBlack  w-full rounded-none "
        onClick={handleClick}
      >
        {loading && <Loader2 size={15} className="animate-spin mr-3" />}
        {isExist ? "Remove from bag" : "Add to bag"}
      </Button>
    </>
  );
};

export default AddToBag;
