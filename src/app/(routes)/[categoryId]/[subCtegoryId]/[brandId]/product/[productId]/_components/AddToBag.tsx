"use client";

import { Button } from "@/components/ui/button";
import { CurrentClientSession, Product, ShoppingBag } from "@/types";
import useShoppingBagStore from "@/zustand/store/cartStore";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
  const userId = session?.data?.user?._id;
  const pathname = usePathname();

  const { addToBag, removeFromBag } = useShoppingBagStore();

  const addproductToBag = async () => {
    try {
      if (!size) return toast.error("Please select a size");
      if (quantity <= 0)
        return toast.error("Quantity should be greater than 0");
      await addToBag({
        product,
        quantity,
        size,
        userId,
        pathname,
      });
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
      await removeFromBag({
        productId: product?._id,
        userId,
        pathname,
      });
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

  return (
    <Button
      disabled={loading}
      className=" bg-mainBlack border-black w-full rounded-none "
      onClick={handleClick}
    >
      {loading && <Loader2 size={15} className="animate-spin mr-3" />}
      {isExist ? "Remove from bag" : "Add to bag"}
    </Button>
  );
};

export default AddToBag;
