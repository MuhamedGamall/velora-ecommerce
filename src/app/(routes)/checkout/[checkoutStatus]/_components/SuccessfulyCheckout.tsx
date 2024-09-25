import OrdersButtn from "@/components/OrdersButtn";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function SuccessfulyCheckout() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center  px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <CircleCheckIcon className="mx-auto h-12 w-12 text-green-500" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Payment Successful!
        </h1>
        <p className="mt-4 text-muted-foreground">
          Thank you for your order. You will receive a confirmation email
          shortly.
        </p>
        <div className="mt-6 flex gap-2 max-sm:flex-col">
          <OrdersButtn
            className={buttonVariants({
              className: "rounded-none w-full ",
            })}
          >
            View Orders Details
          </OrdersButtn>
          <Link
            href="/"
            className={buttonVariants({
              variant: "outline",
              className: "rounded-none w-full ",
            })}
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

function CircleCheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
