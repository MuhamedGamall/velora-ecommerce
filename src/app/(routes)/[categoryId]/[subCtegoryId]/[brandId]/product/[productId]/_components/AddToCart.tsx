"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { useState } from "react";

const AddToCart = ({
  product,
  quantity,
	size
}: {
  product: Product;
  quantity: number;
	size: string
}) => {
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
    <Button className=" bg-mainBlack border-black w-full rounded-none " onClick={handleClick}>
      Add to Bag
    </Button>
  );
};

export default AddToCart;
