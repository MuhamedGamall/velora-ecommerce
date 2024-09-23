import getCategories from "@/actions/get-categories";
import getFeaturedProducts from "@/actions/get-featured-products";
import getTrendingProducts from "@/actions/get-trending-products";
import Categories from "@/components/Categories";
import HeroSection from "@/components/HeroSection";
import ProductsSlider from "@/components/SliderProducts";

export default async function Home() {
  const [
    { products: featuredProducts, loading: featuredLoading },
    { products: trendingProducts, loading: trendingLoading },
    { categories, loading: categoriesLoading },
  ] = await Promise.all([
    getFeaturedProducts(),
    getTrendingProducts(),
    getCategories(),
  ]);
  return (
    <div className=" mt-[70px] md:mt-[110px]">
      <HeroSection />
      <ProductsSlider
        type="featured"
        products={featuredProducts}
        loading={featuredLoading}
      />
      {categoriesLoading ? (
        <Categories.Skeleton />
      ) : (
        <Categories categories={categories} />
      )}
      <ProductsSlider
        type="trending"
        products={trendingProducts}
        loading={trendingLoading}
      />
    </div>
  );
}
