import getProducts from "@/actions/get-products";
import { SearchParams } from "@/types";
import { notFound } from "next/navigation";
import CatalogContent from "../../_components/CatalogContent";

import getCategoryByTitle from "@/actions/get-category-by-title";

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
  const getCate = await getCategoryByTitle(params.categoryId);

  if (!params?.categoryId?.trim() || !getCate) {
    return notFound();
  }

  const { products, loading } = await getProducts({
    category: params.categoryId,
    subCategory: params.subCategoryId,
    searchParams: {
      ...searchParams,
      minPrice: searchParams?.minPrice || "0",
      maxPrice: searchParams?.maxPrice || "100000000",
      sortBy: searchParams?.sortBy || "popular",
    },
  });

  return (
    <CatalogContent
      productsLoading={loading}
      searchParams={searchParams}
      products={products}
      params={params}
    />
  );
}
