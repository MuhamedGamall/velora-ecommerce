import React from "react";
import ProductsContent from "../_components/ProductsContent";
import SidebarFilter from "../_components/filterComponents/SidebarFilter";
import ProductsTitle from "../_components/ProductsTitle";
import FilterOptionsbar from "../_components/filterComponents/FilterOptionsbar";
import CheckboxFilter from "../_components/filterComponents/CheckboxFilter";
import ActiveValues from "../_components/filterComponents/ActiveValues";
import SortBy from "../_components/filterComponents/SortBy";
import MobileFilter from "../_components/filterComponents/mobile/MobileFilter";
import { SearchParams } from "@/types";
import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";

export default async function CategoryPage({
  searchParams,
  params,
}: {
  params: {
    categoryId: string;
    subCategoryId: string;
  };
  searchParams: SearchParams;
}) {
  const products = await getProducts({
    category: params.categoryId,
    subCategory: params.subCategoryId,
    searchParams,
  });
  return (
    <div className="w-full flex mb-10  ">
      <SidebarFilter />
      <div className="w-full m-5 h-screen mt-[80px] md:mt-[120px] ">
        <ProductsTitle searchParams={searchParams} params={params} />
        <div className="max-lg:hidden">
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
        </div>
        <div className="lg:hidden">
          <MobileFilter searchParams={searchParams} />
        </div>
        <ProductsContent products={products} />
      </div>
    </div>
  );
}
