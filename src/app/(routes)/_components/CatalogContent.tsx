"use client";
import getProducts from "@/actions/get-products";
import Breadcrumb, { BreadcrumbSkeleton } from "@/components/BreadCrumbs";
import { Skeleton } from "@/components/ui/skeleton";
import { Product, SearchParams } from "@/types";
import { ChevronRight, HomeIcon, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import EmptyState from "../../../components/EmptyState";
import ProductsContent from "../_components/ProductsContent";
import ProductsTitle from "../_components/ProductsTitle";
import ActiveValues, {
  ActiveValuesSkeleton,
} from "../_components/filterComponents/ActiveValues";
import CheckboxFilter, {
  CheckboxFilterSkeleton,
} from "../_components/filterComponents/CheckboxFilter";
import FilterOptionsbar from "../_components/filterComponents/FilterOptionsbar";
import SidebarFilter from "../_components/filterComponents/SidebarFilter";
import SortBy, { SortBySkeleton } from "../_components/filterComponents/SortBy";
import MobileFilter from "../_components/filterComponents/mobile/MobileFilter";

export default function CatalogContent({
  searchParams,
  params,
}: {
  params?: {
    categoryId: string;
    subCategoryId: string;
  };
  searchParams: SearchParams;
}) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [productsLoading, setProductsLoading] = useState(true);
  
  //  reset the products when the category or subcategory or search params changes
  useEffect(() => {
    setProducts([]);
    setPage(1);
  }, [searchParams, params?.categoryId, params?.subCategoryId]);

  const fetchProducts = async () => {
    if (page === 1 && products?.length) setProductsLoading(true);
      const data = await getProducts({
        searchParams: {
          ...searchParams,
          minPrice: searchParams?.minPrice || "0",
          maxPrice: searchParams?.maxPrice || "100000000",
          sortBy: searchParams?.sortBy || "popular",
        },
        page,
        limit: 10,
        category: params?.categoryId,
        subCategory: params?.subCategoryId,
      });

    // If this is the first page and we have 10 or fewer products, set the products directly
    if (data?.products.length < 10 && page === 1) {
      setProducts(data.products);
      setProductsLoading(false);
      return setHasMore(false);
    }

    // Check if new products were returned
    if (data?.products.length > 0) {
      setProducts((prev) => {
        // Filter out any products that are already in the previous list
        const newProducts = data.products.filter(
          (newProduct) =>
            !prev.some((product) => product._id === newProduct._id)
        );
        return [...prev, ...newProducts];
      });

      setProductsLoading(false);
      setHasMore(data.products.length > 0);
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchParams, params?.categoryId, params?.subCategoryId, page]);

  const resetAll = () => {
    setPage(1);
    if (params?.subCategoryId && params?.categoryId) {
      router.push(`/explore/${params?.categoryId}/${params?.subCategoryId}`);
    } else if (params?.categoryId && !params?.subCategoryId) {
      console.log(params?.categoryId);
      
      router.push(`/explore/${params?.categoryId}`);
    } else {
      router.push(`/explore`);
    }
  };

  return (
    <div className="w-full flex mb-10">
      <SidebarFilter />
      <div className="w-full m-5 min-h-screen mt-[80px] md:mt-[130px] max-w-[1200px]">
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
        {productsLoading ? (
          <Skeleton className="h-5 w-[100px] ml-auto my-3" />
        ) : (
          <button
            className="text-slate-600 font-semibold my-3 w-fit ml-auto block border-none outline-none"
            onClick={resetAll}
          >
            Reset All
          </button>
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

        <InfiniteScroll
          dataLength={products.length}
          next={() => {
            setPage((prev) => prev + 1);
          }}
          hasMore={hasMore}
          loader={
            <Skeleton className="h-16 w-full flex items-center justify-center my-3 bg-slate-200/50">
              <Loader size={20} className="text-slate-600 animate-spin" />
            </Skeleton>
          }
          endMessage={
            <p className="w-fit mx-auto my-3">No more products to load.</p>
          }
        >
          {products.length === 0 && !productsLoading ? (
            <EmptyState
              q={searchParams.q}
              showButton={false}
              showImages={false}
            />
          ) : (
            <ProductsContent products={products} loading={productsLoading} />
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
}
