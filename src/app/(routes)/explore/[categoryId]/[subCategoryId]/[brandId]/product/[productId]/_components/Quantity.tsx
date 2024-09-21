"use client";

import { cn } from "@/lib/utils";
import { type SetStateAction } from "react";

const Quantity = ({
  quantity,
  setQuantity,
  maxPurchase,
}: {
  quantity: number;
  maxPurchase: number;
  setQuantity: React.Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[13px]">QTY: {quantity}</span>
      <div className="flex items-center gap-[10px]">
        <button
          className={cn(
            "flex h-8 w-8 cursor-pointer items-center justify-center bg-gray-200",
            {
              "opacity-50 cursor-not-allowed": quantity === 1,
            }
          )}
          onClick={() => setQuantity((prev) => (prev === 1 ? 1 : prev - 1))}
        >
          -
        </button>
        {quantity}
        <button
          className={cn(
            "flex h-8 w-8 cursor-pointer items-center justify-center bg-gray-200",
            {
              "opacity-50 cursor-not-allowed": quantity === maxPurchase,
            }
          )}
          onClick={() =>
            setQuantity((prev) =>
              prev === maxPurchase ? maxPurchase : prev + 1
            )
          }
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Quantity;
