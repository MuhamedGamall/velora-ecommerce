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
import { Skeleton } from "@/components/ui/skeleton";

// Adjusted selectMenus to receive actual initialValues
const selectMenus = (initialValues: {
  brand: string;
  size: string;
  colour: string;
  material: string;
  pattern: string;
}) => [
  { type: "brand", data: BRANDS_OPTIONS, initialValue: initialValues.brand },
  { type: "size", data: SIZES_OPTIONS, initialValue: initialValues.size },
  { type: "colour", data: COLOURS_OPTIONS, initialValue: initialValues.colour },
  {
    type: "material",
    data: MATERIALS_OPTIONS,
    initialValue: initialValues.material,
  },
  {
    type: "pattern",
    data: PATTERNS_OPTIONS,
    initialValue: initialValues.pattern,
  },
];

export default function FilterOptionsbar({
  searchParams: { minPrice, maxPrice, colour, material, pattern, size, brand },
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
}) {
  const menus = selectMenus({ brand, size, colour, material, pattern });

  return (
    <div className="flex items-center max-lg:flex-col lg:gap-3 w-full">
      <SelectPrice minPrice={minPrice} maxPrice={maxPrice} />

      {menus.map((menu) => (
        <CustomSelectMenu
          key={menu.type}
          type={menu.type}
          data={menu.data}
          initialValue={menu.initialValue}
        />
      ))}
    </div>
  );
}
FilterOptionsbar.Skeleton = () => {
  return (
    <div className="flex items-center gap-3 w-full">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between w-full gap-2 border-[#efefef] border  py-2 px-3 h-[55px]  "
        >
          <Skeleton className="h-5 w-full max-w-20" />
          <Skeleton className="h-5 w-full max-w-5" />
        </div>
      ))}
    </div>
  );
};
