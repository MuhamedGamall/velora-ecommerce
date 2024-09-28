import getProducts from "@/actions/get-products";
import { SearchParams } from "@/types";
import CatalogContent from "../_components/CatalogContent";

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <CatalogContent
      searchParams={searchParams}
    />
  );
}
