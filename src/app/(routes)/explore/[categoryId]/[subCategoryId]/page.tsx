import { SearchParams } from "@/types";

import getProducts from "@/actions/get-products";
import getSubCategoryByTitle from "@/actions/get-subcategory-by-title";
import { notFound } from "next/navigation";
import CatalogContent from "../../../_components/CatalogContent";

export default async function SubCategoryPage({
  searchParams,
  params,
}: {
  params: {
    categoryId: string;
    subCategoryId: string;
  };
  searchParams: SearchParams;
}) {
  const getCate = await getSubCategoryByTitle(params.subCategoryId);

  if (
    !params?.categoryId?.trim() ||
    !params?.subCategoryId?.trim() ||
    !getCate
  ) {
    return notFound();
  }

  const products = await getProducts({
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
      products={products}
      searchParams={searchParams}
      params={params}
    />
  );
}
