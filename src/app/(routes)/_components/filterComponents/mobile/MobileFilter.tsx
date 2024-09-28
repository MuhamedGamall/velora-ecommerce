import React from "react";
import FilterByCategory from "./FilterByCategory";
import FilterBy from "./FilterBy";
import {Skeleton} from "@/components/ui/skeleton";
import { SearchParams } from "@/types";

export default function MobileFilter({ searchParams }: { searchParams: SearchParams }) {
  return (
    <div className="flex gap-3 items-center w-full my-3">
      <FilterBy searchParams={searchParams} />
      <FilterByCategory />
    </div>
  );
}
MobileFilter.Skeleton = () => {
  return (
    <div className="flex items-center gap-3 w-full">
      <div className="flex items-center justify-between w-full gap-2 border-[#efefef] border  py-2 px-3 h-[55px]  ">
        <Skeleton className="h-5 w-full max-w-20" />
        <Skeleton className="h-5 w-5" />
      </div>
      <div className="flex items-center justify-between w-full gap-2 border-[#efefef] border  py-2 px-3 h-[55px]  ">
        <Skeleton className="h-5 w-full max-w-20" />
        <Skeleton className="h-5 w-5" />
      </div>
    </div>
  );
};
