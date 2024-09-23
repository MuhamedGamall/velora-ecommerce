import getProduct from "@/actions/get-product";
import getRelatedProducts from "@/actions/get-related-products";
import ProductsSlider from "@/components/SliderProducts";
import type { Metadata } from "next";
import ProductView, { ProductViewSkeleton } from "./_components/ProductView";

type Props = {
  params: {
    productId: string;
    brandId: string;
    categorId: string;
  };
};



export default async function ProductPage({ params }: Props) {
  const { productId, brandId, categorId } = params;

  const [
    { product, loading: productLoading },
    { products: relatedProducts, loading: relatedProductsLoading },
  ] = await Promise.all([
    getProduct({ _id: productId }),
    getRelatedProducts({
      brand: brandId || "",
      excludedId: productId,
      category: categorId || "",
    }),
  ]);

  return (
    <div className="w-full mt-[90px] md:mt-[130px]">
      {productLoading ? (
        <ProductViewSkeleton />
      ) : (
        <ProductView product={product} />
      )}
      <div className="border-t w-full">
        <ProductsSlider
          type="related"
          products={relatedProducts}
          loading={relatedProductsLoading}
        />
      </div>
    </div>
  );
}
