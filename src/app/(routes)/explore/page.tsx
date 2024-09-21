import getProducts from "@/actions/get-products";
import { SearchParams } from "@/types";
import CatalogContent from "../_components/CatalogContent";

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const products = await getProducts({
    searchParams,
  });

  return <CatalogContent products={products} searchParams={searchParams} />;
}
