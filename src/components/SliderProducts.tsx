import { Product, ProductType } from "@/types";
import SliderView from "./SliderView";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

const ProductsSlider = ({
  type,
  products,
  loading,
}: {
  type: ProductType;
  products: Product[];
  loading: boolean;
}) => {
  return (
    <section className={"mx-auto my-20   containerWrapper"}>
      <div
        className={cn(
          "flex flex-col text-center gap-2 items-center mb-10 text-slate-700  ",
          {
            "text-[13px] sm:text-[20px] items-start": type === "related",
          }
        )}
      >
        {loading ? (
          <Skeleton className="md:h-16 h-10 w-full max-w-[400px] mb-3" />
        ) : (
          <h3
            className={cn(
              "font-bold w-full capitalize  max-xs:text-start   text-[30px] sm:text-[50px]",
              {
                "text-[30px] sm:text-[40px]  ": type === "related",
              }
            )}
          >
            {type} products
          </h3>
        )}
        {loading ? (
          <Skeleton className="md:h-7 h-5 w-full max-w-[800px]" />
        ) : (
          <p
            className={cn(
              "text-[15px] sm:text-[22px] w-full max-xs:text-start  font-semibold text-slate-600 max-w-[800px]",
              {
                "text-[13px] sm:text-[20px] ": type === "related",
              }
            )}
          >
            {type === "featured"
              ? "Featured products are a selection of top-quality items that stand outdue to unique characteristics."
              : type === "related" && null}
            {type === "trending" &&
              "Shop our curated selection of trending items and elevate your wardrobe with the hottest pieces everyone is raving about. "}
          </p>
        )}
      </div>

      <SliderView products={products} loading={loading} />
    </section>
  );
};

export default ProductsSlider;
