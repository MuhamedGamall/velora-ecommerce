import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import React, { Dispatch, SetStateAction } from "react";

export default function Sizes({
  sizes,
  value,
  setValue,
}: {
  sizes: string[];
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) {

  if (!sizes.length) return;
  return (
    <div className="space-y-2">
      <span className="text-[13px]">Size:</span>
      <RadioGroup
        value={value}
        onValueChange={setValue}
        // name="size"

        className="flex justify-start flex-wrap max-w-[500px]"
      >
        {["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"].map((size) => (
          <div key={size}>
            <RadioGroupItem
              disabled={!sizes.includes(size)}
              value={size}
              id={size}
              defaultValue={size}
              className="peer  sr-only"
            />
            <Label
              htmlFor={size}
              className={cn(
                "flex items-center justify-center w-[60px] p-2 border border-mainBlack rounded-none text-gray-700 cursor-pointer",
                "hover:bg-accent hover:text-accent-foreground",
                "peer-disabled:opacity-30 peer-disabled:cursor-not-allowed",
                "peer-data-[state=checked]:bg-mainBlack peer-data-[state=checked]:text-white  ",
                { "opacity-30 cursor-not-allowed": !sizes.includes(size) }
              )}
            >
              {size}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
