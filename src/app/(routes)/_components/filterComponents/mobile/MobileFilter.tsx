import React from "react";
import FilterByCategory from "./FilterByCategory";
import FilterBy from "./FilterBy";
import ActiveValues from "../ActiveValues";

export default function MobileFilter({ searchParams }: { searchParams: any }) {
  return (
    <>
      <div className="flex gap-3 items-center w-full my-3">
        <FilterBy searchParams={searchParams} />
        <FilterByCategory />
      </div>
      <div className="my-3">
        <ActiveValues searchParams={searchParams} />
      </div>
    </>
  );
}
