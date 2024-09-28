"use client";

import { useEffect, useState } from "react";
import getCategories from "@/actions/get-categories";
import getFeaturedProducts from "@/actions/get-featured-products";
import getTrendingProducts from "@/actions/get-trending-products";
import Categories from "@/components/Categories";
import HeroSection from "@/components/HeroSection";
import ProductsSlider from "@/components/SliderProducts";
import { CategoryTree, Product } from "@/types";

export default function HomePageClientContent() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryTree[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const responses = await Promise.all([
          getFeaturedProducts(),
          getTrendingProducts(),
          getCategories(),
        ]);
        setFeaturedProducts(responses[0]?.products);
        setTrendingProducts(responses[1]?.products);
        setCategories(responses[2]?.categories);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-[70px] md:mt-[110px]">
      <HeroSection />
      <ProductsSlider
        type="featured"
        products={featuredProducts}
        loading={loading}
      />
      {loading ? (
        <Categories.Skeleton />
      ) : (
        <Categories categories={categories} />
      )}
      <ProductsSlider
        type="trending"
        products={trendingProducts}
        loading={loading}
      />
    </div>
  );
}
