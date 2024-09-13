import getCurrentSession from "@/actions/get-current-session";
import getProduct from "@/actions/get-product";
import getRelatedProducts from "@/actions/get-related-products";
import Footer from "@/components/footer";
import ProductsSlider from "@/components/SliderProducts";
import type { Metadata } from "next";
import ProductView from "./_components/ProductView";

type Props = {
  params: {
    productId: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productId } = params;

  return {
    title: `Product | ${productId}`,
    description: `This is a page containing product ${productId}.`,
  };
}

export default async function ProductPage({ params }: Props) {
  const { productId } = params;
  const product = await getProduct({ _id: productId });
  const relatedProducts = await getRelatedProducts({
    brand: product?.brand || "",
    excludedId: productId,
  });
  return (
    <div className="w-full">
      <ProductView product={product}  />
      <div className="border-t w-full">
        <ProductsSlider type="related" products={relatedProducts} />
      </div>
      <Footer />
    </div>
  );
}
