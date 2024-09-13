"use client";

import { useState } from "react";

import AddToCart from "./AddToBag";
import AddToWishlist from "./AddToWishlist";
import Details from "./Details";
import Sizes from "./Sizes";
import Images from "./Images";
import { CurrentClientSession, Product, ShoppingBag } from "@/types";
import { notFound } from "next/navigation";
import { cn, formatPrice } from "@/lib/utils";
import Quantity from "./Quantity";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useClient } from "sanity";
const ProductView = ({
  product,
  shoppingBag,
}: {
  product: Product | null;
  shoppingBag: ShoppingBag[];
}) => {
  const isExist = shoppingBag.find(
    (item) => item?.product?._id === product?._id
  );

  const [quantity, setQuantity] = useState<number>(isExist?.quantity || 1);
  const [size, setSize] = useState<string>(isExist?.size || "");
  const session = useSession() as any;
  if (!product) notFound();

  return (
    <div className="flex items justify-between max-md:flex-col gap-[100px] containerWrapper mx-auto my-5  px-5  ">
      <div className="flex-1">
        <Images images={product?.images} />
        <div className="text-sm mt-12 p-5 max-md:hidden border-t">
          <span className="text-[16px] font-bold mb-5">VEIW MORE</span>
          <div className="flex items-center text-[14px] gap-2  capitalize">
            <Link className="underline  text-mainBlack" href="/">
              {product?.brand?.replaceAll("_", " ")}
            </Link>
            <Link className="underline  text-mainBlack" href="/">
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
            <span className="text-black capitalize"> {product?.colour}</span>
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
            productId={product?._id}
            session={session}
            productTitle={product?.title}
          />
          <AddToWishlist userId={"userId"} productId={product?._id} />
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
            <Link className="underline  text-mainBlack" href="/">
              {product?.brand?.replaceAll("_", " ")}
            </Link>
            <Link className="underline  text-mainBlack" href="/">
              {product?.subCategory?.title}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
