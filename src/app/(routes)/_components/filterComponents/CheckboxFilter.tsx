"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import qs from "query-string";
import { useRouter } from "next/navigation";

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
    <div className="flex items-center gap-3 my-5">
      <div className="flex items-center gap-1">
        <Checkbox
          id="sale"
          className="rounded-none "
          checked={selectedData.sale}
          onCheckedChange={() => handleToggle("sale")}
        />
        <Label htmlFor="sale" className="cursor-pointer hover:text-mainBlack text-slate-600">
          Sale
        </Label>
      </div>
      <div className="flex items-center gap-1">
        <Checkbox
          id="newCollection"
          className="rounded-none "
          checked={selectedData.newCollection}
          onCheckedChange={() => handleToggle("newCollection")}
        />
        <Label htmlFor="newCollection" className="cursor-pointer hover:text-mainBlack text-slate-600">
          New collection
        </Label>
      </div>
      <div className="flex items-center gap-1">
        <Checkbox
          id="bestseller" 
          className="rounded-none "
          checked={selectedData.bestseller}
          onCheckedChange={() => handleToggle("bestseller")}
        />
        <Label htmlFor="bestseller" className="cursor-pointer hover:text-mainBlack text-slate-600">
          Bestseller
        </Label>
      </div>
    </div>
  );
}
