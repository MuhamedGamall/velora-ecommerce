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
import useFilterByDrawerModal from "@/zustand/store/filterByDrawerModal";

export default function FilterBy({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sortBy = searchParams?.sortBy;
  const { isOpen, onOpen, onClose } = useFilterByDrawerModal();
  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerTrigger asChild onClick={onOpen}>
        <Button
          variant={"outline"}
          className="w-full  px-2 justify-between rounded-none border-mainBlack  h-11 "
        >
          Filter by
          <ChevronDown size={20} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="rounded-none">
        <DrawerHeader className="flex items-center w-full border-b p-5 justify-between">
          <DrawerTitle className="text-center w-full ml-9 text-[20px]">
            Filter by
          </DrawerTitle>
          <DrawerClose onClick={onClose}>
            <X size={30} strokeWidth={1.3} />
          </DrawerClose>
        </DrawerHeader>
        <div className=" overflow-y-auto h-[calc(100vh-70px)] ">
          <SortBy initialValue={sortBy} onClose={onClose} />
          <FilterOptions searchParams={searchParams} onClose={onClose} />
          <CheckboxFilter
            onClose={onClose}
            saleValue={searchParams.sale}
            bestsellerValue={searchParams.bestseller}
            newSeasonValue={searchParams.newSeason}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
