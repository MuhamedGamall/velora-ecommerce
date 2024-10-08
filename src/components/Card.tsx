import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { urlFor } from "@/sanity/lib/image";
import { Box } from "lucide-react";
import { cn, formatPrice, isNewSeason, truncateText } from "@/lib/utils";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";

export default function Card({
  _id,
  images,
  title,
  secondaryImage,
  price,
  salesCount,
  desc,
  category,
  subCategory,
  brand,
  _createdAt,
  oldPrice,
}: Product) {
  return (
    <div
      className={cn(
        " text-mainBlack  max-w-[215px]  flex justify-center mx-auto"
      )}
    >
      <Link
        href={`/explore/${category?.title}/${subCategory?.title}/${brand}/product/${_id}`}
        className="mb-12 flex flex-col gap-2 xxs:w-[38vw] xxs:min-w-[7rem] sm:w-[23vw] sm:max-w-none md:w-[23vw] lg:w-[18vw] 2xl:max-w-[20rem]"
      >
        <div className="group relative h-[95vw] min-h-[12rem] w-full overflow-hidden xxs:h-[65vw] xxs:max-h-[400px] sm:max-h-[240px] md:max-h-[280px] lg:max-h-[300px] 2xl:max-h-[350px] xxxl:max-h-[45vh] xxxl:min-h-[450px]">
          {isNewSeason(_createdAt) && (
            <span className="absolute left-0  shadow-sm top-0 z-30 bg-white/80 px-3 py-1 text-[10px] sm:text-xs font-medium text-teal-600">
              New Season
            </span>
          )}
          {salesCount >= 100 && (
            <span
              className={cn(
                "absolute left-0 top-[23px] sm:top-6 z-30 shadow-sm bg-slate-500/70  py-1 text-[10px] sm:text-xs  font-medium text-white px-3 ",
                {
                  "top-0": !isNewSeason(_createdAt),
                }
              )}
            >
              Bestseller
            </span>
          )}
          {oldPrice > 0 && (
            <span
              className={
                "absolute bottom-0 right-0  z-30 shadow-sm bg-red-500/70  py-1 text-[10px] sm:text-xs font-medium text-white px-3 "
              }
            >
              Sale
            </span>
          )}

          <Image
            width={600}
            height={600}
            src={images?.[0]?.asset?.url}
            alt={secondaryImage?.asset?.url}
            blurDataURL="/cardSkeleton.png"
            placeholder="blur"
            className="absolute z-10 h-full w-full object-cover"
            loading="lazy"
          />
          {secondaryImage?.asset?.url && (
            <Image
              width={600}
              placeholder="blur"
              height={600}
              src={secondaryImage?.asset?.url || "/cardSkeleton.png"}
              alt={secondaryImage?.asset?.url + "-alt image"}
              blurDataURL="/cardSkeleton.png"
              className="absolute h-full w-full object-cover group-hover:z-20"
              loading="lazy"
            />
          )}
        </div>
        <div className="break-all font-semibold truncate text-[13px]">
          {title}
        </div>
        <p className="text-[12px] ">{truncateText(desc, 30)}</p>
        <div className="flex gap-2 items-center">
          <h3
            className={cn("text-sm text-[12px] font-semibold  ", {
              "text-red-600": oldPrice >= 1,
            })}
          >
            {formatPrice(price)}
          </h3>
          {oldPrice >= 1 && (
            <h3 className={cn("text-[12px] text-gray-700 line-through")}>
              {formatPrice(oldPrice)}
            </h3>
          )}
        </div>
        <div className="flex items-center gap-1 text-[10px]">
          <Box size={13} className="text-slate-700 " />
          Shipping: Free over EGP150.00
        </div>
      </Link>
    </div>
  );
}
Card.Skeleton = function () {
  return (
    <div className={cn("  max-w-[215px]  flex justify-center mx-auto")}>
      <div className="mb-12 flex flex-col gap-2 xxs:w-[38vw] xxs:min-w-[7rem] sm:w-[23vw] sm:max-w-none md:w-[23vw] lg:w-[18vw] 2xl:max-w-[20rem]">
        <div className="  h-[95vw] min-h-[12rem] w-full overflow-hidden xxs:h-[65vw] xxs:max-h-[400px] sm:max-h-[240px] md:max-h-[280px] lg:max-h-[300px] 2xl:max-h-[350px] xxxl:max-h-[45vh] xxxl:min-h-[450px]">
          <Image
            width={600}
            height={600}
            src={"/cardSkeleton.png"}
            alt={"cardSkeleton"}
            className=" z-10 h-full w-full rounded-sm animate-pulse object-cover"
            loading="lazy"
            placeholder="blur"
            blurDataURL="/cardSkeleton.png"
          />
        </div>
        <Skeleton className="h-5 w-[90%] " />
        <Skeleton className="h-5 w-[80%] " />
        <div className="flex gap-2 items-center w-[70%] ">
          <Skeleton className="h-5 flex-1 " />
          <Skeleton className="h-5 flex-1 " />
        </div>
        <Skeleton className="h-5 w-full " />
      </div>
    </div>
  );
};
