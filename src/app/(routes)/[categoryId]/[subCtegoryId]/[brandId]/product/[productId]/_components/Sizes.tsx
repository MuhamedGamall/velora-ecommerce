import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import React from "react";

export default function Sizes({ sizes }: { sizes: string[] }) {
  if (!sizes.length) return;
  return (
    <div className="space-y-2">
      <span className="text-[13px]">Size:</span>
      <RadioGroup defaultValue="M" className="flex justify-start flex-wrap max-w-[500px]">
        {["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"].map((size) => (
          <div key={size}>
            <RadioGroupItem value={size} id={size} className="peer  sr-only" />
            <Label htmlFor={size} className="   ">
              <button
                disabled={!sizes.includes(size)}
                className={cn(
                  "flex text-gray-700  items-center border-mainBlack border rounded-none overflow-hidden relative justify-center  w-[60px] p-2 hover:bg-accent hover:text-accent-foreground ",
                  {
                    "opacity-[.2]  cursor-not-allowed": !sizes.includes(size),
                  }
                )}
              >
                {size}
              </button>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
