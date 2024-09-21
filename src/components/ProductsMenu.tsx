"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShoppingBag, Wishlist } from "@/types";
import { Dot, ShoppingBagIcon, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { formatNumber, formatPrice } from "../lib/utils";
import { Button } from "./ui/button";

export default function ProductsMenu({
  type,
  data,
  onClose,
  isOpen,
  onOpen,
  resetBag,
}: {
  type: "cart" | "wishlist";
  data: ShoppingBag[] | Wishlist[];
  onClose: () => void;
  isOpen: boolean;
  onOpen: () => void;
  resetBag: (pathname: string) => Promise<void>;
}) {
  const ref = useRef(null) as any;
  const pathname = usePathname();

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

  const totalPrice = data.reduce((total, item: any) => {
    const price = item?.product?.price;
    const quantity = item?.quantity || 0;
    return total + price * quantity;
  }, 0);

  return (
    <DropdownMenu open={isOpen} onOpenChange={onClose}>
      <DropdownMenuTrigger className=" outline-none" onClick={onOpen}>
        {type === "cart" ? (
          <div className="relative">
            <ShoppingBagIcon size={20} strokeWidth={1.3} color="white" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[12px] text-white">
              {formatNumber(data?.length)}
            </span>
          </div>
        ) : (
          <Star size={20} strokeWidth={1.3} color="white" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        ref={ref}
        className="w-screen md:w-[400px] max-h-[500px]   border !p-5  !mt-16 mr-5 rounded-none"
      >
        {data?.length === 0 ? (
          <>
            <div className="text-[20px]  font-bold">
              {type === "cart" ? "Sopping Bag" : "Wishlist"}
            </div>
            <div className="flex items-center justify-center w-full h-[200px]">
              {type === "cart" ? "Shopping Bag is empty" : "Wishlist is empty"}
            </div>
          </>
        ) : (
          <div className="w-full ">
            <div className="text-[20px]  font-bold">
              {type === "cart" ? "Sopping Bag" : "Wishlist"} ({data?.length})
            </div>
            {type === "cart" && (
              <div className="flex items-center justify-between my-2 pr-8">
                Total (EGY)
                <span>{formatPrice(totalPrice)}</span>
              </div>
            )}
            <DropdownMenuSeparator className="my-5" />
            <ul className="w-full  p-2 max-h-[400px] overflow-y-auto pb-[150px] ">
              {data?.map((item: any) => (
                <li>
                  <Link
                    key={item?.product?._id}
                    href={`/explore/${item?.product?.category?.title}/${item?.product?.subCategory?.title}/${item?.product?.brand}/product/${item?.product?._id}`}
                    className="flex items-start gap-5  w-full border-b mb-2 pb-2"
                  >
                    <Image
                      src={item?.product?.images?.[0]?.asset?.url || ""}
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
                        {type === "cart" ? (
                          <div className="flex items-center text-slate-600">
                            <span >{item?.product?.colour?.replaceAll("_", " ")}</span>
                            <Dot size={20} className="text-slate-300" />
                            {item?.size && (
                              <>
                                <span>{item?.size}</span>
                                <Dot size={20} className="text-slate-300" />
                              </>
                            )}
                            <span>Qty:{item?.quantity || 1}</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-slate-600">
                            <span>{item?.product?.colour?.replaceAll("_", " ")}</span>
                            <Dot size={20} className="text-slate-300" />
                            <span>Qty:{item?.quantity || 1}</span>
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
                </li>
              ))}
            </ul>
            <div className="sticky -bottom-5 py-5 bg-white">
              <DropdownMenuSeparator className=" mb-2" />
              <button
                disabled={!data?.length}
                onClick={async () => await resetBag(pathname)}
                className="text-[13px] mb-3 text-right w-full  text-slate-600 hover:text-black "
              >
                Reset {type === "cart" ? "Shopping Bag" : "Wishlist"}
              </button>
              {type === "cart" ? (
                <>
                  <Button
                    onClick={onClose}
                    disabled={!data?.length}
                    className="w-full rounded-none bg-black"
                    asChild
                  >
                    <Link
                      href={"/checkout"}
                      className="flex items-center gap-2 w-full"
                    >
                      <ShoppingBagIcon
                        size={15}
                        color="white"
                        className="mr-3"
                      />
                      Procceed To Purchase
                    </Link>
                  </Button>
                </>
              ) : (
                <Button
                  onClick={onClose}
                  disabled={!data?.length}
                  variant={"outline"}
                  className="w-full rounded-none "
                  asChild
                >
                  <Link
                    href={"/wishlist"}
                    className="flex items-center gap-2 w-full"
                  >
                    <Star size={15} className="mr-3 text-mainBlack" />
                    View my wishlist
                  </Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
