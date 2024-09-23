import getProducts from "@/actions/get-products";
import { SearchParams } from "@/types";
import CatalogContent from "../_components/CatalogContent";

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { products, loading } = await getProducts({
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
      products={products}
      searchParams={searchParams}
    />
  );
}
