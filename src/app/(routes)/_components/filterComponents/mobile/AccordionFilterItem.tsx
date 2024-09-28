"use client";
import { ChevronDown, ChevronRight, Circle } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";


export function AccordionFilterItem({
  type,
  data,
  initialValue,
  onClose
}: {
  type: string;
  data: { value: string; title: string }[];
  initialValue: string;
  onClose: () => void;
}) {
  const [selectedData, setSelectedData] = useState<string[]>([]);
  const router = useRouter();
  const parseURL = (url: string) =>
    qs.parse(url, {
      parseBooleans: true,
      parseNumbers: true,
      arrayFormatSeparator: "|",
      arrayFormat: "separator",
    });

  useEffect(() => {
    if (initialValue) {
      setSelectedData(initialValue?.split("|"));
    }
  }, [open, initialValue]);
  const handleApply = () => {
    const url = qs.stringifyUrl(
      {
        query: { [type]: selectedData },
        url: location?.href,
      },
      {
        skipNull: true,
        arrayFormat: "separator",
        arrayFormatSeparator: "|",
        skipEmptyString: true,
      }
    );
    router.push(`${url}`);
    router.refresh();
    onClose();
  };
  const handleDelete = () => {
    let data = parseURL(location?.search);
    delete data[type];
    const url = qs.stringify(data, {
      skipNull: true,
      arrayFormat: "separator",
      arrayFormatSeparator: "|",
      skipEmptyString: true,
    });

    setSelectedData([]);
    router.push(`?${url}`);
    router.refresh();
    onClose();
  };

  const handleSelect = (item: string) => {
    setSelectedData((prev) =>
      prev.includes(item) ? prev.filter((f) => f !== item) : [...prev, item]
    );
  };

  return (
    <AccordionItem value={"accordion-" + type}>
      <AccordionTrigger className="w-full  h-16 p-5">
        <div
          className={cn(
            "flex items-center capitalize px-2 justify-between w-full",
            { "font-bold": initialValue }
          )}
        >
          {type}
          {initialValue && (
            <Circle
              className="ml-2 h-4 w-4 opacity-50"
              color="green"
              strokeWidth={3}
            />
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent className={cn("z-[3000] w-full px-3")}>
        <Command>
          <CommandInput placeholder={`Search ${type}...`} />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              {data?.map((item) => (
                <CommandItem
                  key={item.value}
                  onSelect={() => handleSelect(item.value)}
                >
                  <div className="flex items-center justify-between w-full space-x-2">
                    <Label htmlFor={item?.value}>{item.title}</Label>
                    <Checkbox
                      id={item?.value}
                      className="rounded-none"
                      checked={selectedData.includes(item.value)}
                    />
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        <div className="flex w-full items-center mt-2">
          <Button
            onClick={handleDelete}
            disabled={!initialValue}
            variant={"outline"}
            className="w-full rounded-none max-lg:h-12"
          >
            Delete All
          </Button>
          <Button
            onClick={handleApply}
            disabled={selectedData.length === 0}
            className="w-full rounded-none bg-black max-lg:h-12 border-mainBlack"
          >
            Show results
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
