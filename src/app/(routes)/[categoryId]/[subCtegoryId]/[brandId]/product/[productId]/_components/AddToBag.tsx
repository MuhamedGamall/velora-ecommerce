"use client";

import addProductToBag from "@/actions/add-to-bag";
import removeProductFromBag from "@/actions/remove-from-bag";
import { Button } from "@/components/ui/button";
import useCartModal from "@/hooks/useCartModal";
import { CurrentClientSession, ShoppingBag } from "@/types";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
const AddToBag = ({
  productId,
  quantity,
  size,
  session,
  productTitle,
  shoppingBag,
}: {
  productId: string;
  productTitle: string;
  quantity: number;
  size: string;
  session: CurrentClientSession;
  shoppingBag: ShoppingBag[];
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const userId = session?.data?.user?._id;
  const pathname = usePathname();
  const { onOpen, onClose } = useCartModal();
  const addToBag = async () => {
    try {
      if (!size) return toast.error("Please select a size");
      if (quantity <= 0)
        return toast.error("Quantity should be greater than 0");
      await addProductToBag({
        productId,
        quantity,
        size,
        userId,
        productTitle,
        pathname,
      });
      setTimeout(() => {
        onOpen();
        toast.success("Product added to bag");
      }, 900);
    } catch (error) {
      toast.error("Something went wrong", {
        description:
          "Error adding product to the shopping bag, please try again",
      });
    }
  };
  const removeFromBag = async () => {
    try {
      await removeProductFromBag({
        productId,
        userId,
        pathname,
      });
    } catch (error) {
      toast.error("Something went wrong", {
        description:
          "Error removing product from the shopping bag, please try again",
      });
    }
  };

  const isExist = shoppingBag.find((item) => item?.product?._id === productId);
  const handleClick = async () => {
    try {
      if (loading) return;
      setLoading(true);
      if (!session) return toast.error("Please login first");
      if (!productId) return toast.error("Please select a product");
      if (isExist) {
        await removeFromBag();
      } else {
        await addToBag();
      }
    } catch (error) {
      throw error;
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 900);
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
