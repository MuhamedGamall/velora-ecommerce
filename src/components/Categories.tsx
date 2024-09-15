import Link from "next/link";
import Image from "next/image";
import getCategories from "@/actions/get-categories";

export default async function Categories() {
  const categories = await getCategories();
  const categoriesWithOutBaby = categories
    .filter((category) => category.title !== "baby")
    ?.reverse();
  return (
    <div className="containerWrapper mx-auto">
      <div className="flex flex-col text-center gap-2 items-center mb-10 text-slate-700  ">
        <h3 className="font-bold font-serif  text-[30px] sm:text-[50px]">
          Shop the smart way.
        </h3>
        <p className="text-[16px] sm:text-[25px] font-semibold text-slate-800 max-w-[800px]">
          Find the latest fashion and trends in womenswear, menswear and kids in
          one place.
        </p>
      </div>
      <div className="flex flex-col-reverse gap-2 py-5  lg:h-[750px]  lg:flex-row font-serif">
        <div className="flex-[2] max-sm:flex-col flex gap-2 ">
          <div className="flex-1 flex-col flex gap-2 ">
            <Link
              href="/category/new"
              className="relative flex flex-1 gap-2 overflow-hidden w-full"
            >
              <Image
                src={"/sale.webp"}
                width={1000}
                height={1000}
                alt="Cat Image #1"
                className="h-full w-full object-cover  brightness-[.8] "
              />
              <span className="bg-slate-100/20 whitespace-nowrap text-[25px] sm:text-[30px] font-bold text-white  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit h-fit py-2 px-4  uppercase">
                Sale
              </span>
            </Link>

            <Link
              href="/category/new"
              className="relative flex flex-1 gap-2 overflow-hidden w-full"
            >
              <Image
                src={"/accessories.jpg"}
                width={1000}
                height={1000}
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
              href="/category/new"
              className="relative flex flex-1 gap-2 overflow-hidden w-full"
            >
              <Image
                src={"/newSeason.webp"}
                width={1000}
                height={1000}
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
          {categoriesWithOutBaby?.map((category: any, i: number) => (
            <Link
              key={category?.title}
              href="/category/new"
              className="relative flex flex-1 gap-2 overflow-hidden w-full"
            >
              <Image
                src={(category?.categoryImage?.asset?.url)}
                width={1000}
                height={1000}
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
