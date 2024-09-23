import React, { Suspense } from "react";
import ProductsContent from "../_components/ProductsContent";
import SidebarFilter from "../_components/filterComponents/SidebarFilter";
import ProductsTitle from "../_components/ProductsTitle";
import FilterOptionsbar from "../_components/filterComponents/FilterOptionsbar";
import CheckboxFilter, {
  CheckboxFilterSkeleton,
} from "../_components/filterComponents/CheckboxFilter";
import ActiveValues, {
  ActiveValuesSkeleton,
} from "../_components/filterComponents/ActiveValues";
import SortBy, { SortBySkeleton } from "../_components/filterComponents/SortBy";
import MobileFilter from "../_components/filterComponents/mobile/MobileFilter";
import { Product, SearchParams } from "@/types";
import Breadcrumb, { BreadcrumbSkeleton } from "@/components/BreadCrumbs";
import { ChevronRight, HomeIcon } from "lucide-react";
import EmptyState from "../../../components/EmptyState";

export default async function CatalogContent({
  searchParams,
  params,
  products,
  productsLoading,
}: {
  params?: {
    categoryId: string;
    subCategoryId: string;
  };
  searchParams: SearchParams;
  products: Product[];
  productsLoading: boolean;
}) {
  return (
    <div className="w-full flex mb-10  ">
      <SidebarFilter />
      <div className="w-full m-5 min-h-screen  mt-[80px] md:mt-[130px] ">
        {productsLoading ? (
          <BreadcrumbSkeleton />
        ) : (
          <Breadcrumb
            homeElement={<HomeIcon className="text-slate-600 " size={15} />}
            separator={<ChevronRight className="text-slate-600 " size={15} />}
            activeClasses="text-slate-600 font-semibold "
            containerClasses="flex py-3 items-center gap-1 "
            listClasses="hover:underline  hover:font-semibold text-[12px] sm:text-sm text-slate-600 "
            capitalizeLinks
          />
        )}
        {productsLoading ? (
          <ProductsTitle.Skeleton />
        ) : (
          <ProductsTitle
            searchParams={searchParams}
            params={params}
            productsLength={products.length}
          />
        )}
        <div className="max-lg:hidden">
          {productsLoading ? (
            <>
              <FilterOptionsbar.Skeleton />
              <CheckboxFilterSkeleton />
              <div className="flex items-center justify-between gap-2 w-full mt-5">
                <ActiveValuesSkeleton />
                <SortBySkeleton />
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
        <div className="lg:hidden">
          {productsLoading ? (
            <MobileFilter.Skeleton />
          ) : (
            <MobileFilter searchParams={searchParams} />
          )}
          <div className="my-3">
            {productsLoading ? (
              <ActiveValuesSkeleton />
            ) : (
              <ActiveValues searchParams={searchParams} />
            )}
          </div>
        </div>
        {products.length === 0 ? (
          <EmptyState
            q={searchParams.q}
            showButton={false}
            showImages={false}
          />
        ) : (
          <ProductsContent products={products} loading={productsLoading} />
        )}
      </div>
    </div>
  );
}
