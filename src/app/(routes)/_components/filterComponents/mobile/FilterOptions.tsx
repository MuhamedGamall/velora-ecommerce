import {
  BRANDS_OPTIONS,
  COLOURS_OPTIONS,
  MATERIALS_OPTIONS,
  PATTERNS_OPTIONS,
  SIZES_OPTIONS,
} from "@/constants";
import { Accordion } from "@/components/ui/accordion";
import SelectPrice from "../SelectPrice";
import { AccordionFilterItem } from "./AccordionFilterItem";
import { Dispatch, SetStateAction } from "react";

export default function FilterOptions({
  searchParams: { minPrice, maxPrice, colour, material, pattern, size, brand },
  onClose,
}: {
  searchParams: {
    minPrice: string;
    maxPrice: string;
    colour: string;
    material: string;
    pattern: string;
    size: string;
    brand: string;
  };
  onClose: () => void;
}) {
  const filterOptions = [
    { type: "brand", data: BRANDS_OPTIONS, initialValue: brand },
    { type: "size", data: SIZES_OPTIONS, initialValue: size },
    { type: "colour", data: COLOURS_OPTIONS, initialValue: colour },
    { type: "material", data: MATERIALS_OPTIONS, initialValue: material },
    { type: "pattern", data: PATTERNS_OPTIONS, initialValue: pattern },
  ];

  return (
    <div className="flex items-center max-lg:flex-col lg:gap-3 w-full">
      <SelectPrice minPrice={minPrice} maxPrice={maxPrice} onClose={onClose} />
      <Accordion type="single" collapsible className="w-full">
        {filterOptions.map(({ type, data, initialValue }) => (
          <AccordionFilterItem
            key={type}
            type={type}
            data={data}
            initialValue={initialValue}
            onClose={onClose}
          />
        ))}
      </Accordion>
    </div>
  );
}
