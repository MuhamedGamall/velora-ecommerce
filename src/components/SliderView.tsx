"use client";
import Slider from "react-slick";
import getFeaturedProducts from "@/actions/get-featured-products";
import Card from "./Card";
import { Product, ProductType } from "@/types";
import { useEffect, useState } from "react";
import getTrendingProducts from "@/actions/get-trending-products";

const settings = {
  dots: false,
  infinite: true,
  arrows: false,
  speed: 500,
  autoplaySpeed: 2000,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: true,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 329,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const SliderView = ({ type }: { type: ProductType }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (type === "featured") {
      getFeaturedProducts()
        .then((data) => {
          setProducts(data);
          console.log({ data });
        })
        .catch((error) => {
          setProducts([]);
        });
    } else if (type === "trending") {
      getTrendingProducts()
        .then((data) => {
          setProducts(data);
          console.log({ data });
        })
        .catch((error) => {
          setProducts([]);
        });
    }
  }, [type]);

  return (
    <Slider {...settings} className="flex gap-5 ">
      {products.map((item) => (
        <Card {...item} key={item._id} />
      ))}
    </Slider>
  );
};

export default SliderView;
