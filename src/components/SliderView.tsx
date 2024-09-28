"use client";
import { Product } from "@/types";
import Slider from "react-slick";
import Card from "./Card";

const sliderSettings = (productsLength: number) => ({
  dots: false,
  infinite: productsLength > 1,
  arrows: false,
  speed: 500,
  autoplaySpeed: 2000,
  autoplay: productsLength > 1,
  slidesToShow:
    productsLength >= 2
      ? 4
      : productsLength >= 3
        ? 3
        : productsLength >= 2
          ? 2
          : 1,

  slidesToScroll: 1,
  initialSlide: 0,
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
        slidesToShow: productsLength == 1 ? 3 : 2,
      },
    },
    {
      breakpoint: 329,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
});

const SliderView = ({
  products,
  loading,
}: {
  products: Product[];
  loading: boolean;
}) => {
  const productsLength = loading ? 4 : products?.length;
  return (
    <Slider {...sliderSettings(productsLength)} className="w-full">
      {loading
        ? Array.from({ length: 4 }).map((_, index) => (
            <Card.Skeleton key={index} />
          ))
        : products.map((item) => <Card {...item} key={item._id} />)}
    </Slider>
  );
};

export default SliderView;
