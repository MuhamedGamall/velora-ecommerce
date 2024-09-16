"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import qs from "query-string";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Circle } from "lucide-react";

const CHECKBOX_FILTERS = [
  { id: "sale", label: "Sale" },
  { id: "newCollection", label: "New collection" },
  { id: "bestseller", label: "Bestseller" },
];

export default function CheckboxFilter({
  saleValue,
  newCollectionValue,
  bestsellerValue,
}: {
  saleValue: string;
  newCollectionValue: string;
  bestsellerValue: string;
}) {
  const [selectedData, setSelectedData] = useState<{ [key: string]: boolean }>({
    sale: false,
    newCollection: false,
    bestseller: false,
  });

  const router = useRouter();

  useEffect(() => {
    setSelectedData({
      sale: !!saleValue,
      newCollection: !!newCollectionValue,
      bestseller: !!bestsellerValue,
    });
  }, [saleValue, newCollectionValue, bestsellerValue]);

  const handleToggle = (key: string) => {
    const updatedValue = !selectedData[key];
    const currentParams = qs.parse(location.search);
    const updatedParams = {
      ...currentParams,
      [key]: updatedValue ? "true" : null,
    };
    const cleanParams = Object.fromEntries(
      Object.entries(updatedParams).filter(([_, v]) => v !== null)
    );
    const url = `${location.pathname}?${qs.stringify(cleanParams)}`;
    router.push(url);
    router.refresh();

    setSelectedData((prev) => ({ ...prev, [key]: updatedValue }));
  };

  return (
    <>
      <div className="flex items-center gap-3 my-5 max-lg:hidden">
        {CHECKBOX_FILTERS.map(({ id, label }) => (
          <div key={id} className="flex items-center gap-1">
            <Checkbox
              id={id}
              className="rounded-none"
              checked={selectedData[id]}
              onCheckedChange={() => handleToggle(id)}
            />
            <Label
              htmlFor={id}
              className="cursor-pointer hover:text-mainBlack text-slate-600"
            >
              {label}
            </Label>
          </div>
        ))}
      </div>

      <div className="lg:hidden">
        {CHECKBOX_FILTERS.map(({ id, label }) => (
          <div key={id} className="flex items-center gap-1 border-b group">
            <Checkbox
              id={id}
              className="hidden"
              checked={selectedData[id]}
              onCheckedChange={() => handleToggle(id)}
            />
            <Label
              htmlFor={id}
              className={cn(
                "cursor-pointer group-hover:underline text-mainBlack flex justify-between items-center text-[16px] py-5 pl-7 pr-5 w-full",
                {
                  "font-bold ": selectedData[id],
                }
              )}
            >
              {label}
              {selectedData[id] && (
                <Circle className="h-4 w-4 opacity-50" color="green" strokeWidth={3} />
              )}
            </Label>
          </div>
        ))}
      </div>
    </>
  );
}
