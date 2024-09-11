import Categories from "@/components/Categories";
import Footer from "@/components/footer";
import HeroSection from "@/components/HeroSection";
import ProductsSlider from "@/components/SliderProducts";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ProductsSlider type="featured" />
      <Categories/>
      <ProductsSlider type="trending" />
      <Footer/>
    </div>
  );
}
