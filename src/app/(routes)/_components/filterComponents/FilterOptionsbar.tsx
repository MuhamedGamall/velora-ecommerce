import React from "react";
import { CustomSelectMenu } from "./CustomSelectMenu";
import SelectPrice from "./SelectPrice";

import {
  BRANDS_OPTIONS,
  COLOURS_OPTIONS,
  MATERIALS_OPTIONS,
  PATTERNS_OPTIONS,
  SIZES_OPTIONS,
} from "@/constants";
import { Accordion } from "@/components/ui/accordion";

export default function FilterOptionsbar({
  searchParams: {
    q,
    minPrice,
    maxPrice,
    colour,
    material,
    pattern,
    size,
    brand,
  },
}: {
  searchParams: {
    q: string;
    minPrice: string;
    maxPrice: string;
    colour: string;
    material: string;
    pattern: string;
    size: string;
    brand: string;
  };
}) {
  return (
    <div className="flex items-center max-lg:flex-col lg:gap-3 w-full">
      <SelectPrice minPrice={minPrice} maxPrice={maxPrice} />
      <CustomSelectMenu
        type={"brand"}
        data={BRANDS_OPTIONS}
        initialValue={brand}
      />
      <CustomSelectMenu
        type={"size"}
        data={SIZES_OPTIONS}
        initialValue={size}
      />
      <CustomSelectMenu
        type={"colour"}
        data={COLOURS_OPTIONS}
        initialValue={colour}
      />
      <CustomSelectMenu
        type={"material"}
        data={MATERIALS_OPTIONS}
        initialValue={material}
      />
      <CustomSelectMenu
        type={"pattern"}
        data={PATTERNS_OPTIONS}
        initialValue={pattern}
      />
    </div>
  );
}
