"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dot, ShoppingBagIcon, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import useCartModal from "@/hooks/useCartModal";
import { useEffect, useRef } from "react";
import { formatPrice } from "../lib/utils";
import { ShoppingBag } from "@/types";
import Link from "next/link";
export default function PreviewMyProducts({
  type,
  data,
  onClose,
  isOpen,
  onOpen,
}: {
  type: "cart" | "wishlist";
  data: ShoppingBag[];
  onClose: () => void;
  isOpen: boolean;
  onOpen: () => void;
}) {
  const ref = useRef(null) as any;

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.pointerEvents = "all";
    }
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.pointerEvents = "all";
    };
  }, [isOpen]);
  const totalPrice = data.reduce((total, item) => {
    const price = item?.product?.price;
    const quantity = item?.quantity;
    return total + price * quantity;
  }, 0);

  return (
    <DropdownMenu open={isOpen} onOpenChange={onClose}>
      <DropdownMenuTrigger className=" outline-none" onClick={onOpen}>
        {type === "cart" ? (
          <ShoppingBagIcon size={20} strokeWidth={1.3} color="white" />
        ) : (
          <Star size={20} strokeWidth={1.3} color="white" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        ref={ref}
        className="w-screen md:w-[400px] max-h-[500px]   border !p-5  !mt-5 mr-5 rounded-none"
      >
        <div className="w-full ">
          <div className="text-[20px]  font-bold">
            {type === "cart" ? "Sopping Bag" : "Wishlist"} ({data?.length})
          </div>
          {type === "cart" && (
            <div className="flex items-center justify-between my-2 pr-8">
              Total (EGP)
              <span>{formatPrice(totalPrice)}</span>
            </div>
          )}
          <DropdownMenuSeparator className="my-5" />
          <div className="w-full  p-5 max-h-[400px] overflow-y-auto pb-[150px] ">
            {data?.map((item) => (
              <Link href={`/${item?.product?.category?.title}/${item?.product?.subCategory?.title}/${item?.product?.brand}/product/${item?.product?._id}`} className="flex items-start gap-5  w-full border-b mb-2 pb-2">
                <Image
                  src={item?.product?.image?.asset?.url || ""}
                  width={70}
                  height={50}
                  className="object-contain"
                  alt="image"
                />
                <div className="w-full flex flex-col gap-2 items-start">
                  <div className="">
                    <div className="text-[15px] font-bold uppercase">
                      {item?.product?.brand?.replaceAll("_", " ")}
                    </div>
                    <p className=" text-slate-500 max-w-[200px] capitalize md:max-w-[400px]">
                      {item?.product?.title}
                    </p>
                  </div>
                  <div className="">
                    {type === "cart" && (
                      <div className="flex items-center text-slate-600">
                        <span>{item?.product?.colour}</span>
                        <Dot size={20} className="text-slate-300" />
                        <span>{item?.size}</span>
                        <Dot size={20} className="text-slate-300" />
                        <span>Qty:{item?.quantity}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-[13px]">
                      <span className="line-through">
                        {formatPrice(item?.product?.oldPrice)}
                      </span>
                      <span className=" text-red-700">
                        {formatPrice(item?.product?.price)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <DropdownMenuSeparator className="my-5" />
          {type === "cart" ? (
            <div className="sticky -bottom-5 p-2 bg-white">
              <Button className="w-full rounded-none bg-mainBlack">
                Checkout
              </Button>
              <Button variant={"outline"} className="w-full mt-3 rounded-none ">
                View my cart
              </Button>
            </div>
          ) : (
            <Button variant={"outline"} className="w-full rounded-none ">
              View my wishlist
            </Button>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
