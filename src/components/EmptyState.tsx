import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function EmptyState({
  q,
  isNotFoundPage,
  showButton = true,
  showImages = true,
}: {
  q?: string;
  isNotFoundPage?: boolean;
  showButton?: boolean;
  showImages?: boolean;
}) {
  return (
    <div
      className={cn("max-w-[800px] w-full mx-auto px-4 py-8 text-slate-600", {
        "mt-[130px]": isNotFoundPage,
      })}
    >
      <h1 className="text-xl sm:text-2xl max-w-[500px] text-center mx-auto font-semibold mb-2">
        {isNotFoundPage
          ? "Sorry, we can’t find what you are looking for"
          : `Sorry, we couldn't find any results ${q ? ` for "${q}"` : ""}`}
      </h1>
      <p className="text-center mb-5 text-[12px]">
        But there&apos;s plenty more to see. Let us help get you back on track
      </p>
      <div className="text-center mb-12">
        {showButton && (
          <Link href={"/"} className="underline text-[12px] text-slate-500">
            Return to our homepage
          </Link>
        )}
      </div>
      {showImages && (
        <div className="grid grid-cols-1  md:grid-cols-3 gap-8 max-md:max-w-[350px] mx-auto ">
          <div className="space-y-4">
            <Image
              src="/sale.webp"
              alt="sale"
              width={400}
              height={300}
              className="w-full h-auto"
            />
            <h2 className="text-xl ">Sale</h2>
            <Link
              href="/explore/sale"
              className="underline text-mainBlack text-sm"
            >
              Shop now
            </Link>
          </div>
          <div className="space-y-4">
            <Image
              src="/accessories.webp"
              alt="accessories"
              width={400}
              height={300}
              className="w-full h-auto"
            />
            <h2 className="text-xl "> Accessories</h2>
            <Link
              href="/explore/accessories"
              className="underline text-mainBlack text-sm"
            >
              Shop now
            </Link>
          </div>
          <div className="space-y-4">
            <Image
              src="/emptyState1.webp"
              alt="What's New"
              width={400}
              height={300}
              className="w-full h-auto aspect-[1.6/1] object-cover object-top"
            />
            <h2 className="text-xl ">What&apos;s New</h2>
            <Link
              href="/explore/newSeason"
              className="underline text-mainBlack text-sm"
            >
              Shop now
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
