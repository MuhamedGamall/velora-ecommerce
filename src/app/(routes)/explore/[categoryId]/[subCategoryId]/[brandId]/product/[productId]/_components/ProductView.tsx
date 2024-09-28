"use client";

import { useEffect, useState } from "react";

import { cn, formatPrice } from "@/lib/utils";
import { Product } from "@/types";
import useShoppingBagStore from "@/zustand/store/cartStore";
import useWishlistStore from "@/zustand/store/wishlistStore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCart from "./AddToBag";
import AddToWishlist from "./AddToWishlist";
import Details from "./Details";
import Images from "./Images";
import Quantity from "./Quantity";
import Sizes from "./Sizes";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
const ProductView = ({ product }: { product: Product | null }) => {
  const { shoppingBag, fetchShoppingBag } = useShoppingBagStore();
  const { wishlist, fetchWishlist } = useWishlistStore();

  const [quantity, setQuantity] = useState<number>(1);
  const [size, setSize] = useState<string>("");
  const session = useSession() as any;
  if (!product) notFound();

  useEffect(() => {
    if (session?.status === "authenticated") {
      fetchShoppingBag();
      fetchWishlist();
    }
  }, [session?.status]);

  const isExistInBag = shoppingBag.find(
    (item) => item?.product?._id === product?._id
  );

  useEffect(() => {
    setQuantity(isExistInBag?.quantity || 1);
    setSize(isExistInBag?.size || "");
  }, [isExistInBag]);

  useEffect(() => {
    document.title = `Velora | Explore | ${product?.title}`;
  }, [isExistInBag]);

  return (
    <div className="flex items justify-between max-md:flex-col gap-[100px] my-5  px-5  ">
      <div className="flex-1">
        <Images images={product?.images} />
        <div className="text-sm mt-12 p-5 max-md:hidden border-t">
          <span className="text-[16px] font-bold mb-5">VEIW MORE</span>
          <div className="flex items-center text-[14px] gap-2  capitalize">
            <Link
              className="underline  text-mainBlack"
              href={
                "/explore/" +
                product?.category.title +
                "?brand=" +
                product?.brand
              }
            >
              {product?.brand?.replaceAll("_", " ")}
            </Link>
            <Link
              className="underline  text-mainBlack"
              href={
                "/explore/" +
                product?.category.title +
                "/" +
                product?.subCategory.title
              }
            >
              {product?.subCategory?.title}
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 flex-1">
        <div className="flex flex-col ">
          <h1 className="text-3xl  uppercase ">
            {product?.brand.replaceAll("_", " ")}
          </h1>
          <h5 className="text-sm truncate">{product?.title}</h5>
          <div className="flex gap-2 items-end mt-2">
            <span className={cn("text-sm text-[16px] font-semibold  ")}>
              {formatPrice(product?.price)}
            </span>
            {product?.oldPrice >= 1 && (
              <span className={cn("text-[13px] text-gray-700 line-through")}>
                {formatPrice(product?.oldPrice)}
              </span>
            )}
          </div>
        </div>
        {product?.qtyInStock >= 1 ? (
          <span className="bg-green-100 text-sm  px-3 py-1 w-fit">
            In Stock
          </span>
        ) : (
          <span className="bg-gray-300 text-sm px-3 py-1 w-fit">
            Out of Stock
          </span>
        )}
        <div className="text-[13px]">
          <span className=" text-gray-700">
            Colour:
            <span className="text-black capitalize">
              {" "}
              {product?.colour?.replaceAll("_", " ")}
            </span>
          </span>
        </div>
        <Quantity
          quantity={quantity}
          setQuantity={setQuantity}
          maxPurchase={product?.maxPurchaseQty}
        />
        <Sizes sizes={product?.sizes} value={size} setValue={setSize} />
        <div className="flex flex-col gap-3">
          <AddToCart
            shoppingBag={shoppingBag}
            quantity={quantity}
            size={size}
            session={session}
            product={product}
          />
          <AddToWishlist
            wishlist={wishlist}
            session={session}
            product={product}
          />
        </div>
        <Details
          moreInformation={product?.moreInformation}
          desc={product?.desc}
          pattern={product?.pattern}
          material={product?.material}
          colour={product?.colour}
          sizes={product?.sizes}
          brand={product?.brand}
        />
        <div className="text-sm  md:hidden ">
          <span className="text-[16px] font-bold mb-2 block">VEIW MORE</span>
          <div className="flex items-center text-[14px] gap-2  capitalize">
            <Link
              className="underline  text-mainBlack"
              href={
                "/explore/" +
                product?.category.title +
                "?brand=" +
                product?.brand
              }
            >
              {product?.brand?.replaceAll("_", " ")}
            </Link>
            <Link
              className="underline  text-mainBlack"
              href={
                "/explore/" +
                product?.category.title +
                "/" +
                product?.subCategory.title
              }
            >
              {product?.subCategory?.title}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;

export const ProductViewSkeleton = () => {
  return (
    <div className="flex items justify-between max-md:flex-col gap-[100px] containerWrapper mx-auto my-5  px-5  ">
      <div className="flex-1">
        <div className="flex flex-col-reverse xs:flex-row md:flex-col-reverse lg:flex-row gap-5 sm:gap-12 items-center">
          <div className="flex  max-sm:hidden  sm:flex-col md:flex-row lg:flex-col  gap-2 ">
            {Array.from({ length: 4 })?.map((_, index) => (
              <div
                key={index}
                className={`w-[48px]  sm:w-[70px] md:w-[48px] p-1 cursor-pointer`}
              >
                <Image
                  src={"/cardSkeleton.png"}
                  alt={`Thumbnail ${index + 1}`}
                  className="object-contain animate-pulse rounded-sm"
                  placeholder="blur"
                  blurDataURL="/cardSkeleton.png"
                  width={100}
                  height={100}
                />
              </div>
            ))}
          </div>
          <div className=" w-full ">
            <Image
              src={"/cardSkeleton.png"}
              alt={`Image skeleton`}
              width={400}
              height={200}
              className="object-cover aspect-[3/5]  w-full animate-pulse h-full rounded-sm"
              placeholder="blur"
              blurDataURL="/cardSkeleton.png"
            />
          </div>
        </div>
        <div className="text-sm mt-12 p-5 max-md:hidden border-t">
          <Skeleton className="h-6 w-[150px] mb-3" />
          <div className="flex items-center text-[14px] gap-2  capitalize">
            <Skeleton className="h-3 w-[100px]" />
            <Skeleton className="h-3 w-[100px]" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 flex-1">
        <div className="flex flex-col ">
          <Skeleton className="h-7 w-[150px] mb-2" />

          <Skeleton className="h-5  w-full max-w-[200px]" />

          <div className="flex gap-2 items-end mt-3">
            <Skeleton className="h-6 w-[80px]" />
            <Skeleton className="h-6 w-[80px]" />
          </div>
        </div>
        <Skeleton className="h-7 w-[150px]" />
        <Skeleton className="h-5 w-[100px]" />

        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-[50px]" />
          <Skeleton className="h-10 w-[50px]" />
        </div>
        <div className="flex items-center gap-2 flex-wrap max-w-[500px]">
          {Array.from({ length: 12 })?.map((_, i) => (
            <Skeleton className="h-8 w-14" />
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="flex flex-col pt-3  ">
          {Array.from({ length: 4 })?.map((_, i) => (
            <>
              <div className="flex justify-between items-center gap-3 p-4  border-t">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-5" />
              </div>
            </>
          ))}
        </div>
        <div className="text-sm  md:hidden ">
          <div className="text-sm mt-12 p-5 max-md:hidden border-t">
            <Skeleton className="h-6 w-[150px] mb-3" />
            <div className="flex items-center text-[14px] gap-2  capitalize">
              {Array.from({ length: 2 })?.map((_, i) => (
                <Skeleton className="h-3 w-[100px]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
