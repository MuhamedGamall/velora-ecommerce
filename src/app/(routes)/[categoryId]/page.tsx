import React from "react";
import ProductsContent from "../_components/ProductsContent";
import SidebarFilter from "../_components/filterComponents/SidebarFilter";
import ProductsTitle from "../_components/ProductsTitle";
import FilterOptionsbar from "../_components/filterComponents/FilterOptionsbar";
import CheckboxFilter from "../_components/filterComponents/CheckboxFilter";
import ActiveValues from "../_components/filterComponents/ActiveValues";
import SortBy from "../_components/filterComponents/SortBy";

export default function CategoryPage({
  searchParams,
  params,
}: {
  params: {
    categoryId: string;
    subCategoryId: string;
  };
  searchParams: {
    q: string;
    minPrice: string;
    maxPrice: string;
    colour: string;
    material: string;
    pattern: string;
    size: string;
    brand: string;
    sale: string;
    newCollection: string;
    bestseller: string;
    sortBy: string;
  };
}) {
  return (
    <div className="w-full flex mb-10 ">
      <SidebarFilter />
      <div className="w-full m-5">
        <ProductsTitle searchParams={searchParams} params={params} />
        <FilterOptionsbar searchParams={searchParams} />
        <CheckboxFilter
          saleValue={searchParams?.sale}
          newCollectionValue={searchParams?.newCollection}
          bestsellerValue={searchParams?.bestseller}
        />
        <div className="flex items-center justify-between gap-2 w-full">
          <ActiveValues searchParams={searchParams} />
          <SortBy initialValue={searchParams?.sortBy} />
        </div>
        <ProductsContent />
      </div>
    </div>
  );
}
