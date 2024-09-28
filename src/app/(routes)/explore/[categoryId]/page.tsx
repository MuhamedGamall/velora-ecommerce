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

  return <CatalogContent searchParams={searchParams} params={params} />;
}
