import Card from "@/components/Card";
import { Product } from "@/types";

export default function ProductsContent({
  products,
  loading,
}: {
  products: Product[];
  loading: boolean;
}) {
  return (
    <div className="w-full gap-5 grid grid-cols-1 xxs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 my-5 max-w-[1200px]">
      {loading
        ? Array.from({ length: 12 }).map((_, index) => (
            <Card.Skeleton key={index} />
          ))
        : products.map((item) => <Card {...item} key={item?._id} />)}
    </div>
  );
}
