import React from "react";
import ProductsContent from "../_components/ProductsContent";
import SidebarFilter from "../_components/filterComponents/SidebarFilter";
import ProductsTitle from "../_components/ProductsTitle";
import FilterOptionsbar from "../_components/filterComponents/FilterOptionsbar";
import CheckboxFilter from "../_components/filterComponents/CheckboxFilter";
import ActiveValues from "../_components/filterComponents/ActiveValues";
import SortBy from "../_components/filterComponents/SortBy";
import MobileFilter from "../_components/filterComponents/mobile/MobileFilter";
import { Product, SearchParams } from "@/types";
import Breadcrumb from "@/components/BreadCrumbs";
import { ChevronRight, HomeIcon } from "lucide-react";
import EmptyState from "../../../components/EmptyState";

export default async function CatalogContent({
  searchParams,
  params,
  products,
}: {
  params?: {
    categoryId: string;
    subCategoryId: string;
  };
  searchParams: SearchParams;
  products: Product[];
}) {
  return (
    <div className="w-full flex mb-10  ">
      <SidebarFilter />
      <div className="w-full m-5 min-h-screen  mt-[80px] md:mt-[130px] ">
        <Breadcrumb
          homeElement={<HomeIcon className="text-slate-600 " size={15} />}
          separator={<ChevronRight className="text-slate-600 " size={15} />}
          activeClasses="text-slate-600 font-semibold "
          containerClasses="flex py-3 items-center gap-1 "
          listClasses="hover:underline  hover:font-semibold text-[12px] sm:text-sm text-slate-600 "
          capitalizeLinks
        />
        <ProductsTitle
          searchParams={searchParams}
          params={params}
          productsLength={products.length}
        />
        <div className="max-lg:hidden">
          <FilterOptionsbar searchParams={searchParams} />
          <CheckboxFilter
            saleValue={searchParams?.sale}
            newSeasonValue={searchParams?.newSeason}
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
        {products.length === 0 ? (
          <EmptyState q={searchParams.q} showButton={false} />
        ) : (
          <ProductsContent products={products} />
        )}
      </div>
    </div>
  );
}
