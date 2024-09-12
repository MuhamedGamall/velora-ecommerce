"use client";
import { Product } from "@/types";
import Slider from "react-slick";
import Card from "./Card";

const settings = (productsLength: number) => ({
  dots: false,
  infinite: productsLength >= 2,
  arrows: false,
  speed: 500,
  autoplaySpeed: 2000,
  slidesToShow:
    productsLength >= 4
      ? 4
      : productsLength >= 3
        ? 3
        : productsLength >= 2
          ? 2
          : 1,

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
});

const SliderView = ({ products }: { products: Product[] }) => {
  return (
    <Slider {...settings(products.length)} className="flex gap-5 ">
      {products.map((item) => (
        <Card {...item} key={item._id} />
      ))}
    </Slider>
  );
};

export default SliderView;
