import getFeaturedProducts from "@/actions/get-featured-products";
import getTrendingProducts from "@/actions/get-trending-products";
import Categories from "@/components/Categories";
import Footer from "@/components/footer";
import HeroSection from "@/components/HeroSection";
import ProductsSlider from "@/components/SliderProducts";

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  const trendingProducts = await getTrendingProducts();

  return (
    <div>
      <HeroSection />
      <ProductsSlider type="featured" products={featuredProducts} />
      <Categories />
      <ProductsSlider type="trending" products={trendingProducts} />
      <Footer />
    </div>
  );
}
