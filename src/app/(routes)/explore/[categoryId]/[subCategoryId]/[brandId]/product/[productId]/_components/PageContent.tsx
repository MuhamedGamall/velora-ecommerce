"use client";
import getProduct from "@/actions/get-product";
import getRelatedProducts from "@/actions/get-related-products";
import ProductsSlider from "@/components/SliderProducts";
import ProductView, { ProductViewSkeleton } from "./../_components/ProductView";
import { useEffect, useState } from "react";
import { Product } from "@/types";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

type Props = {
  params: {
    productId: string;
    brandId: string;
    categorId: string;
  };
};

export default function ProductPageContentClient({ params }: Props) {
  const { productId, brandId, categorId } = params;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [{ product }, { products: relatedProducts }] = await Promise.all([
          getProduct({ _id: productId }),
          getRelatedProducts({
            brand: brandId || "",
            excludedId: productId,
            category: categorId || "",
          }),
        ]);

        setProduct(product);
        setRelatedProducts(relatedProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId, brandId, categorId]);

  return (
    <div className="w-full mt-[90px] md:mt-[130px] containerWrapper mx-auto ">
      <Link  href="/" className="flex items-center text-slate-600  my-3">
        <ChevronLeft className="" size={18} />
        <span className="ml-2">Back to home page</span>
      </Link>
      {loading ? <ProductViewSkeleton /> : <ProductView product={product} />}
      <div className="border-t w-full">
        <ProductsSlider
          type="related"
          products={relatedProducts}
          loading={loading}
        />
      </div>
    </div>
  );
}
