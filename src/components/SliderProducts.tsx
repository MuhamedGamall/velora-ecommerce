import { Product, ProductType } from "@/types";
import SliderView from "./SliderView";
import { cn } from "@/lib/utils";

const ProductsSlider = ({
  type,
  products,
}: {
  type: ProductType;
  products: Product[];
}) => {
  return (
    <div className={"mx-auto my-20   containerWrapper"}>
      <div
        className={cn(
          "flex flex-col text-center gap-2 items-center mb-10 text-slate-700  ",
          {
            "text-[13px] sm:text-[20px] items-start": type === "related",
          }
        )}
      >
        <h3
          className={cn(
            "font-bold font-serif capitalize text-start  text-[30px] sm:text-[50px]",
            {
              "text-[30px] sm:text-[40px]  ": type === "related",
            }
          )}
        >
          {type} products
        </h3>
        <p
          className={cn(
            "text-[16px] sm:text-[25px] max-sm:text-start font-semibold text-slate-800 max-w-[800px]",
            {
              "text-[13px] sm:text-[20px] ": type === "related",
            }
          )}
        >
          {type === "featured"
            ? "Featured products are a selection of top-quality items that stand outdue to unique characteristics."
            : type === "related" && null}
        </p>
      </div>
      <div className="ml-7">
        <SliderView products={products} />
      </div>
    </div>
  );
};

export default ProductsSlider;
