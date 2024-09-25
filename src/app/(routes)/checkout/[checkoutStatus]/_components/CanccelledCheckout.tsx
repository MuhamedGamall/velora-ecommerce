import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function CanccelledCheckout() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center  px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <CircleXIcon className="mx-auto h-12 w-12 text-red-500" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Checkout Cancelled
        </h1>
        <p className="mt-4 text-muted-foreground">
          We're sorry, but your checkout process has been cancelled. Please
          review your cart and try again or contact us if you need assistance.
        </p>
        <div className="mt-6 flex gap-2 max-sm:flex-col">
          <Link
            href="/"
            vocab=""
            className={buttonVariants({
              variant: "outline",
              className: "rounded-none w-full ",
            })}
          >
            Return to Home page
          </Link>
          <Link
            href="/"
            className={buttonVariants({
              className: "rounded-none w-full ",
            })}
          >
            View Cart
          </Link>
        </div>
      </div>
    </div>
  );
}

function CircleXIcon(props: any) {
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
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}
