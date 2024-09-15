"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SORT_BY_OPTIONS } from "@/constants";
import { ChevronDown, Circle } from "lucide-react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";

export default function SortBy({ initialValue }: { initialValue: string }) {
  const [selectedValue, setSelectedValue] = useState<{
    value: string;
    title: string;
  }>(SORT_BY_OPTIONS[0]);
  const router = useRouter();
  const findCurrentValue = () => {
    if (initialValue) {
      return SORT_BY_OPTIONS.find((option) => option.value === initialValue);
    }
  };
  useEffect(() => {
    if (initialValue) {
      setSelectedValue(findCurrentValue() || SORT_BY_OPTIONS[0]);
    }
  }, [initialValue]);
  useEffect(() => {
    if (!initialValue) {
      handleSelect(SORT_BY_OPTIONS[0]);
    }
  }, []);
  const handleSelect = (value: { value: string; title: string }) => {
    setSelectedValue(value);
    const url = qs.stringifyUrl(
      {
        url: location?.href,
        query: { sortBy: value.value },
      },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    );
    router.push(url);
    router.refresh();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 border-none outline-none">
        <Button
          variant="ghost"
          asChild
          className=" hover:bg-transparent "
        >
          <div className="flex items-center gap-2 px-2 justify-between h-11 ">
            Sort By:
            <span className="font-bold">{selectedValue.title}</span>
          <ChevronDown size={15} />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[200px] mt-[1px] border-black rounded-none"
      >
        {SORT_BY_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => {
              handleSelect(option);
            }}
            className={"flex items-center justify-between gap-2 mb-2"}
          >
            {option.title}
            {option.value === selectedValue.value && (
              <Circle size={15} color="green" className="" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
