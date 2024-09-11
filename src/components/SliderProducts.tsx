"use client";
import { ProductType } from "@/types";
import SliderView from "./SliderView";

const ProductsSlider = ({ type }: { type: ProductType }) => {
  return (
    <div className="mx-auto my-24  containerWrapper">
      <div className="flex flex-col text-center gap-2 items-center mb-10 text-slate-700  ">
        <h3 className="font-bold font-serif capitalize  text-[30px] sm:text-[50px]">
          {type} products
        </h3>
        <p className="text-[16px] sm:text-[25px] font-semibold text-slate-800 max-w-[800px]">
          {type === "featured"
            ? "Featured products are a selection of top-quality items that stand outdue to unique characteristics."
            : "Explore the hottest items of the season, handpicked by our customers."}
        </p>
      </div>
      <SliderView type={type} />
    </div>
  );
};

export default ProductsSlider;
