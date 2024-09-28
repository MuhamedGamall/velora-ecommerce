import { SearchParams } from "@/types";
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

  return <CatalogContent searchParams={searchParams} params={params} />;
}
