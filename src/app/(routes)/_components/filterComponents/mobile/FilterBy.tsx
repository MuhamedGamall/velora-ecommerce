"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ChevronDown, X } from "lucide-react";
import SortBy from "../SortBy";
import FilterOptions from "./FilterOptions";
import CheckboxFilter from "../CheckboxFilter";
import { SearchParams } from "@/types";

export default function FilterBy({ searchParams }: { searchParams: SearchParams}) {
  const sortBy = searchParams?.sortBy;
  return (
    <Drawer >
      <DrawerTrigger asChild>
        <Button
          variant={"outline"}
          className="w-full  px-2 justify-between rounded-none border-mainBlack  h-11 "
        >
          Filter by
          <ChevronDown size={20} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="rounded-none overflow-y-auto h-[calc(100vh-70px)] ">
        <DrawerHeader className="flex items-center w-full border-b p-5 justify-between">
          <DrawerTitle className="text-center w-full ml-9 text-[20px]">
            Filter by
          </DrawerTitle>
          <DrawerClose>
            <X size={30} strokeWidth={1.3} />
          </DrawerClose>
        </DrawerHeader>
        <div className="">
          <SortBy initialValue={sortBy} />
          <FilterOptions searchParams={searchParams} />
          <CheckboxFilter
            saleValue={searchParams.sale}
            bestsellerValue={searchParams.bestseller}
            newSeasonValue={searchParams.newSeason}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
