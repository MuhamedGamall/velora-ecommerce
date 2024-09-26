import ProductPageContentClient from "./_components/PageContent";

type Props = {
  params: {
    productId: string;
    brandId: string;
    categorId: string;
  };
};

export default async function ProductPage({ params }: Props) {
  return <ProductPageContentClient params={params} />;
}
