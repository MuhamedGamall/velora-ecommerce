"use client";
import { ChevronDown, ChevronsUpDown, Circle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import qs from "query-string";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";

export function CustomSelectMenu({
  type,
  data,
  initialValue,
}: {
  type: string;
  data: { value: string; title: string }[];
  initialValue: string;
}) {
  const [open, setOpen] = useState(false);
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
  };

  const handleSelect = (item: string) => {
    setSelectedData((prev) =>
      prev.includes(item) ? prev.filter((f) => f !== item) : [...prev, item]
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full min-w-[166px] px-2 justify-between rounded-none border-black h-11 "
        >
          {type}
          {initialValue ? (
            <Circle
              className="ml-2 h-4 w-4 opacity-50"
              color="green"
              strokeWidth={3}
            />
          ) : (
            <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className=" p-0 rounded-none border-black">
        <Command>
          <CommandInput placeholder={`Search ${type}...`} />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
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
        <div className="flex w-full items-center  mt-2">
          <Button
            onClick={handleDelete}
            disabled={!initialValue}
            variant={"outline"}
            className="w-full rounded-none"
          >
            Delete All
          </Button>
          <Button
            onClick={handleApply}
            disabled={selectedData.length === 0}
            className="w-full rounded-none bg-black border-black"
          >
            Show results
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
