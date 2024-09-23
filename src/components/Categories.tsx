import Link from "next/link";
import Image from "next/image";

import { CategoryTree } from "@/types";
import { Skeleton } from "./ui/skeleton";

export default async function Categories({
  categories,
}: {
  categories: CategoryTree[];
}) {
  const categoriesWithOutBaby = categories
    .filter((category) => category.title !== "baby")
    ?.reverse();
  return (
    <div className="containerWrapper mx-auto">
      <div className="flex flex-col text-center gap-2 items-center mb-10 text-slate-700  ">
        <h3 className="font-bold  max-xs:text-start w-full  text-[30px] sm:text-[50px]">
          Shop the smart way.
        </h3>
        <p className="text-[16px] max-xs:text-start w-full sm:text-[25px] font-semibold text-slate-800 max-w-[800px]">
          Find the latest fashion and trends in womenswear, menswear and kids in
          one place.
        </p>
      </div>
      <div className="flex flex-col-reverse gap-2 py-5  lg:h-[750px]  lg:flex-row ">
        <div className="flex-[2] max-sm:flex-col flex gap-2 ">
          <div className="flex-1 flex-col flex gap-2 ">
            <Link
              href="/sale"
              className="relative flex flex-1 gap-2 overflow-hidden w-full"
            >
              <Image
                src={"/sale.webp"}
                width={1000}
                height={1000}
                loading="lazy"
                alt="Cat Image #1"
                className="h-full w-full object-cover  brightness-[.8] "
              />
              <span className="bg-slate-100/20 whitespace-nowrap text-[25px] sm:text-[30px] font-bold text-white  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit h-fit py-2 px-4  uppercase">
                Sale
              </span>
            </Link>

            <Link
              href="/accessories"
              className="relative flex flex-1 gap-2 overflow-hidden w-full"
            >
              <Image
                src={"/accessories.jpg"}
                width={1000}
                height={1000}
                loading="lazy"
                alt="Cat Image #2"
                className="h-full w-full object-cover  brightness-[.8] "
              />
              <span className="bg-slate-300/40 whitespace-nowrap text-[25px] sm:text-[30px] font-bold text-white  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit h-fit py-2 px-4  uppercase">
                Accessories
              </span>
            </Link>
          </div>
          <div className="flex-1 flex gap-2 ">
            <Link
              href="/newSeason"
              className="relative flex flex-1 gap-2 overflow-hidden w-full"
            >
              <Image
                src={"/newSeason.webp"}
                width={1000}
                height={1000}
                loading="lazy"
                alt="Cat Image #3"
                className="h-full w-full object-cover  object-right brightness-[.8]"
              />
              <span className="bg-slate-100/20 whitespace-nowrap text-[25px] sm:text-[30px] font-bold text-white  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit h-fit py-2 px-4  uppercase">
                New Season
              </span>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 flex-[2] gap-2 ">
          {categoriesWithOutBaby?.map((category: CategoryTree, i: number) => (
            <Link
              key={category?.title}
              href={"/" + category?.title}
              className="relative flex flex-1 gap-2 overflow-hidden w-full"
            >
              <Image
                src={category?.categoryImage?.asset?.url}
                width={1000}
                height={1000}
                loading="lazy"
                alt={"Cat Image #" + category?.title}
                className="h-full w-full object-cover  brightness-[.8] "
              />
              <span className="bg-slate-100/20  whitespace-nowrap   text-[25px] sm:text-[30px] font-bold text-white  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit h-fit py-2 px-4  uppercase">
                {category?.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
Categories.Skeleton = function () {
  return (
    <div className="containerWrapper mx-auto">
      <div className="flex flex-col  gap-2 items-center mb-10  ">
        <Skeleton className="md:h-16 h-10 w-full max-w-[400px] mb-3" />
        <Skeleton className="md:h-7 h-5 w-full max-w-[800px]" />
      </div>
      <div className="flex flex-col-reverse gap-2 py-5 h-[750px] xs:h-[900px] sm:h-[1500px] lg:h-[750px]  lg:flex-row ">
        <div className="flex-[2] flex gap-2 ">
          <div className="flex-1 flex-col flex gap-2 ">
            <Skeleton className="h-full w-full flex-1  " />
            <Skeleton className="h-full w-full flex-1  " />
          </div>
          <div className="flex-1 flex gap-2 ">
            <Skeleton className="h-full w-full flex-1  " />
          </div>
        </div>
        <div className="grid grid-cols-2 flex-[2] gap-2 ">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-full w-full flex-1  " />
          ))}
        </div>
      </div>
    </div>
  );
};
