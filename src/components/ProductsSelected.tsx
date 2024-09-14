import { formatPrice } from "@/lib/utils";
import { Product, ShoppingBag, Wishlist } from "@/types";
import { Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductsSelected({
  type,
  data,
  reset,
  remove,
  moveTo,
}: {
  type: "checkout" | "wishlist";
  data: ShoppingBag[] | Wishlist[];
  reset: () => Promise<void>;
  remove: (productId: string) => Promise<void>;
  moveTo: (product: Product) => Promise<void>;
}) {
  
  return (
    <div className="w-full mb-10">
      {data?.length > 0 && (
        <button
          onClick={reset}
          className="w-full text-slate-600 hover:text-black text-right p-2 capitalize"
        >
          {type === "checkout" ? "reset Bag" : "reset wishlist"}
        </button>
      )}
      <ul className="w-full py-2 ">
        {data?.map((item: any) => (
          <li>
            <Link
              key={item?.product?._id}
              href={`/${item?.product?.category?.title}/${item?.product?.subCategory?.title}/${item?.product?.brand}/product/${item?.product?._id}`}
              className="flex items-start gap-5  w-full border-t mt-5 py-5"
            >
              <Image
                src={item?.product?.images?.[0]?.asset?.url || ""}
                width={100}
                height={70}
                className="object-contain"
                alt="image"
              />
              <div className="w-full flex flex-col gap-4 items-start">
                <div className="">
                  <div className="text-[15px] font-bold uppercase">
                    {item?.product?.brand?.replaceAll("_", " ")}
                  </div>
                  <p className=" text-slate-500 max-w-[200px] capitalize md:max-w-[400px]">
                    {item?.product?.title}
                  </p>
                </div>
                <div className="">
                  {type === "checkout" ? (
                    <div className="flex items-center text-slate-600">
                      <span>{item?.product?.colour}</span>
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
                      <span>{item?.product?.colour}</span>
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
            <div className="flex gap-1 items-center capitalize text-slate-600">
              <button
                onClick={() => remove(item?.product?._id)}
                className="hover:text-black text-sm "
              >
                Remove From {type === "checkout" ? "Bag" : "Wishlist"}
              </button>
              <Dot size={20} />
              <button
                onClick={() => moveTo(item?.product)}
                className="hover:text-black text-sm "
              >
                Move to {type === "checkout" ? "Wishlist" : "Bag"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
