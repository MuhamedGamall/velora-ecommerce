import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice } from "@/lib/utils";
import { ShoppingBag } from "@/types";
import axios from "axios";
import { ShoppingBagIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function OrderSummary({
  shoppingBag,
}: {
  shoppingBag: ShoppingBag[];
}) {
  const router = useRouter();

  const total = shoppingBag?.reduce((acc, item) => {
    return acc + item.product.price * item?.quantity;
  }, 0);

  async function proceedToCheckout() {
    try {
      if (shoppingBag?.length === 0) {
        throw "Your Bag is empty";
      }
      const { data } = await axios.post("/api/checkout", {
        shoppingBag,
      });
  
      if (!data || !data.url) throw("Session creation failed");
      
      return router.push(data.url);
    } catch (error: any) {
      console.error("Error creating checkout session: ", error);
    }
  }
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
        onClick={proceedToCheckout}
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
        alt="payment image"
        className="my-3"
      />
    </div>
  );
}
OrderSummary.Skeleton = () => {
  return (
    <div className="w-full py-5">
      <Skeleton className="h-7 w-[150px] mb-3" />
      <div>
        <div className="text-[17px]  gap-3  flex items-center justify-between border-b pb-3 mb-3">
          <Skeleton className="h-5 w-[120px]" />
          <Skeleton className="h-5 w-[80px]" />
        </div>
        <div className=" text-[20px] gap-3 flex items-center justify-between border-b pb-3 mb-3">
          <Skeleton className="h-6 w-[120px]" />
          <Skeleton className="h-6 w-[80px]" />
        </div>
      </div>
      <Skeleton className="h-10 w-full mb-3" />
      <Skeleton className="h-16 w-full" />
    </div>
  );
};
