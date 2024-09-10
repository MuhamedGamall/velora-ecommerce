import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dot, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
export default function PreviewMyProducts({
  type,
  data,
}: {
  type: "cart" | "wishlist";
  data: any;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=" outline-none">
        {type === "cart" ? (
          <ShoppingBag size={20} strokeWidth={1.3} color="white" />
        ) : (
          <Star size={20} strokeWidth={1.3} color="white" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-screen md:w-[600px]  max-h-[800px] overflow-y-auto border !p-5  !mt-5 mr-5 rounded-none">
        <div className="w-full ">
          <div className="text-[25px] my-2 font-bold">
            {type === "cart" ? "Sopping Bag" : "Wishlist"} (1)
          </div>
          {type === "cart" && (
            <div className="flex items-center justify-between mb-2">
              Total (EGP)
              <span>$128</span>
            </div>
          )}
          <DropdownMenuSeparator className="my-5" />
          <div className="flex items-start gap-5  w-full">
            <Image
              src={
                "https://www.mrporter.com/variants/images/1647597323369483/in/w300.jpg"
              }
              width={120}
              height={50}
              className="object-contain"
              alt="image"
            />
            <div className="w-full flex flex-col gap-5 items-start">
              <div className="">
                <div className="text-[20px] font-bold">TITLE</div>
                <p className=" text-slate-500 max-w-[200px] md:max-w-[400px]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                </p>
              </div>
              <div className="">
                {type === "cart" && (
                  <div className="flex items-center text-slate-600">
                    <span>Colour</span>
                    <Dot size={20} className="text-slate-300" />
                    <span>Size</span>
                    <Dot size={20} className="text-slate-300" />
                    <span>Qty:1</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="line-through">$320</span>
                  <span className=" text-red-700">$128</span>
                </div>
              </div>
            </div>
          </div>
          <DropdownMenuSeparator className="my-5" />
          {type === "cart" ? (
            <>
              <Button className="w-full rounded-none bg-mainBlack">
                Checkout
              </Button>
              <Button variant={"outline"} className="w-full mt-3 rounded-none ">
                View my cart
              </Button>
            </>
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
