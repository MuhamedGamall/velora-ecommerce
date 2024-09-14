import { ShoppingBag } from "@/types";
import { product } from "../../../../sanity/schemaTypes/product";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShoppingBagIcon } from "lucide-react";
import Image from "next/image";

export default function OrderSummary({
  shoppingBag,
}: {
  shoppingBag: ShoppingBag[];
}) {
  const total = shoppingBag?.reduce((acc, item) => {
    return acc + item.product.price * item?.quantity;
  }, 0);
  return (
    <div className="w-full py-5">
      <h2 className="mb-3 mt-2 font-medium text-[25px]">Order Summary</h2>
      <div>
        <span className="text-[17px] text-slate-800 flex items-center justify-between border-b pb-3 mb-3">
          <span className="font-medium">Item Sub-Total</span>
          <span className="font-medium">{formatPrice(total)}</span>
        </span>
        <span className=" text-[20px] flex items-center justify-between border-b pb-3 mb-3">
          <span className="font-semibold">Total (EGY)</span>
          <span className="font-semibold">{formatPrice(total)}</span>
        </span>
      </div>
      <Button
        disabled={!shoppingBag?.length}
        className="w-full rounded-none bg-black "
      >
        <ShoppingBagIcon size={15} color="white" className="mr-3" />
        Procceed To Purchase
      </Button>
      <Image
        src={"/payment.png"}
        width={500}
        height={420}
        alt="payment image" className="my-3"
      />
    </div>
  );
}
