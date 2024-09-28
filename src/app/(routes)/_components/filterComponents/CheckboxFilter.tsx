"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import qs from "query-string";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Circle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function CheckboxFilter({
  saleValue,
  newSeasonValue,
  bestsellerValue,
  onClose,
}: {
  saleValue: string;
  newSeasonValue: string;
  bestsellerValue: string;
  onClose?: () => void;
}) {
  const [selectedData, setSelectedData] = useState<{ [key: string]: boolean }>({
    sale: false,
    newSeason: false,
    bestseller: false,
  });
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const CHECKBOX_FILTERS = [
    ...(pathname.includes("/sale") ? [] : [{ id: "sale", label: "Sale" }]),
    ...(pathname.includes("/newSeason")
      ? []
      : [{ id: "newSeason", label: "New Season" }]),
    { id: "bestseller", label: "Bestseller" },
  ];

  useEffect(() => {
    setSelectedData({
      sale: !!saleValue,
      newSeason: !!newSeasonValue,
      bestseller: !!bestsellerValue,
    });
  }, [saleValue, newSeasonValue, bestsellerValue]);

  const handleToggle = (key: string) => {
    setLoading(true);
    setTimeout(() => {
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
      setLoading(false);
    }, 1000);

  };

  return (
    <>
      <div
        className={cn("flex items-center gap-3 my-5 max-lg:hidden", {
          "opacity-50 pointer-events-none": loading,
        })}
      >
        {CHECKBOX_FILTERS.map(({ id, label }) => (
          <div key={id} className="flex items-center gap-1">
            <Checkbox
              id={id}
              className="rounded-none"
              checked={selectedData[id]}
              onCheckedChange={() => handleToggle(id)}
              disabled={loading}
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

      <div
        className={cn("lg:hidden", {
          "opacity-50 pointer-events-none": loading,
        })}
      >
        {CHECKBOX_FILTERS.map(({ id, label }) => (
          <div
            key={id}
            className="flex items-center gap-1 border-b group"
            onClick={() => onClose?.()}
          >
            <Checkbox
              id={id}
              className="hidden"
              checked={selectedData[id]}
              onCheckedChange={() => handleToggle(id)}
              disabled={loading}
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
                <Circle
                  className="h-4 w-4 opacity-50"
                  color="green"
                  strokeWidth={3}
                />
              )}
            </Label>
          </div>
        ))}
      </div>
    </>
  );
}

export const CheckboxFilterSkeleton = () => {
  return (
    <div className="flex items-center gap-3 w-full">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between  gap-2   mt-5"
        >
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-5 w-20" />
        </div>
      ))}
    </div>
  );
};
