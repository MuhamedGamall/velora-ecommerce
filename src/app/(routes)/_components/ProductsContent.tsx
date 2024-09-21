import Card from "@/components/Card";
import { Product } from "@/types";

export default function ProductsContent({ products }: { products: Product[] }) {

  return (
    <div className="w-full gap-5 grid grid-cols-1 xxs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 my-5">
      {products?.map((product: Product) => (
        <Card {...product} key={product._id} />
      ))}
    </div>
  );
}
