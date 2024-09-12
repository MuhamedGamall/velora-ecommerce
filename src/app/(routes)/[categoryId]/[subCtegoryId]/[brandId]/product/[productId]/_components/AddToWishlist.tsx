"use client";
import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";
import { useState } from "react";

const AddToWishlist = ({ product }: { product: any }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    // addToCart({ ...product, quantity });
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Button
      className="flex items-center border-black justify-start gap-2  w-full rounded-none"
      variant={"outline"}
    >
      <StarIcon size={15} strokeWidth={1.3}/>
      <span className="text-center w-full">ADD TO WISH LIST</span>
    </Button>
  );
};

export default AddToWishlist;
