"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import qs from "query-string";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SelectPrice({
  minPrice,
  maxPrice,
}: {
  minPrice: string;
  maxPrice: string;
}) {
  const [priceValue, setPriceValue] = useState({ min: 0, max: 10000 });
  const router = useRouter();
  useEffect(() => {
    if (minPrice || maxPrice) {
      setPriceValue({
        min: Number(minPrice) || 0,
        max: Number(maxPrice) || 10000,
      });
    }
  }, []);
  const parseURL = (url: string) =>
    qs.parse(url, {
      parseBooleans: true,
      parseNumbers: true,
      arrayFormatSeparator: "|",
      arrayFormat: "separator",
    });

  const handleReset = () => {
    let data = parseURL(location?.search);
    delete data.minPrice;
    delete data.maxPrice;
    const url = qs.stringify(data, {
      skipNull: true,
      arrayFormat: "separator",
      arrayFormatSeparator: "|",
      skipEmptyString: true,
    });

    setPriceValue({ min: 0, max: 10000 });
    router.push(`?${url}`);
    router.refresh();
  };

  const handleApply = () => {
    const url = qs.stringifyUrl(
      {
        url: location?.href,
        query: { minPrice: priceValue.min, maxPrice: priceValue.max },
      },
      {
        skipNull: true,
      }
    );
    router.push(`${url}`);
    router.refresh();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full min-w-[166px] text-[13px] px-2 justify-between rounded-none border-black h-11 overflow-x-auto "
        >
          <span>EGP {priceValue.min}</span>-<span>EGP {priceValue.max}</span>
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-[300px] rounded-none mt-[1px] border-black"
      >
        <div className="flex items-center gap-2 mb-5">
          <Label className="">
            Min Price
            <Input
              value={priceValue.min}
              onChange={(e) => {
                setPriceValue({
                  ...priceValue,
                  min: Number(e.target.value) < 0 ? 0 : Number(e.target.value),
                });
              }}
              type="number"
              placeholder="EGP 0"
              className="rounded-none border-black mt-2"
            />
          </Label>
          <Label>
            Max Price
            <Input
              value={priceValue.max}
              onChange={(e) => {
                setPriceValue({
                  ...priceValue,
                  max: Number(e.target.value) < 0 ? 0 : Number(e.target.value),
                });
              }}
              type="number"
              placeholder="EGP 15434"
              className="rounded-none border-black mt-2"
            />
          </Label>
        </div>
        <div className="flex w-full items-center  mt-2">
          <Button
            onClick={handleReset}
            disabled={!minPrice || !maxPrice}
            variant={"outline"}
            className="w-full rounded-none"
          >
            Reset
          </Button>
          <Button
            onClick={handleApply}
            disabled={
              priceValue.max < 0 ||
              priceValue.min < 0 ||
              priceValue.min > priceValue.max ||
              (priceValue.min === 0 && priceValue.max === 0)
            }
            className="w-full rounded-none bg-black border-black"
          >
            Show results
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
