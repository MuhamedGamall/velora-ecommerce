import getCurrentSession from "@/actions/get-current-session";
import getProduct from "@/actions/get-product";
import getRelatedProducts from "@/actions/get-related-products";
import Footer from "@/components/footer";
import ProductsSlider from "@/components/SliderProducts";
import type { Metadata } from "next";
import ProductView from "./_components/ProductView";
import getShoppingBag from "@/actions/get-shopping-bag";

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
  const session = await getCurrentSession();
  const product = await getProduct({ _id: productId });
  const relatedProducts = await getRelatedProducts({
    brand: product?.brand || "",
    excludedId: productId,
  });
  const { shoppingBag } = await getShoppingBag({
    userId: session?.user?._id || "",
  });

  return (
    <div className="w-full">
      <ProductView product={product} shoppingBag={shoppingBag} />
      <div className="border-t w-full">
        <ProductsSlider type="related" products={relatedProducts} />
      </div>
      <Footer />
    </div>
  );
}
