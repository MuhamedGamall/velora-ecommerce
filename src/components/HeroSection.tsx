import { getHeroCoverImage } from "@/actions/get-hero-cover-image";
import { urlFor } from "@/sanity/lib/image";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const brands = [
  "/brands/new-balance_3.webp",
  "/brands/converse.webp",
  "/brands/dsquared2.webp",
  "/brands/moncler.webp",
  "/brands/hunter_1.webp",
  "/brands/merrell_1.webp",
  "/brands/mr-porter_1.webp",
  "/brands/cos.webp",
  "/brands/slam-jam.webp",
];
export default async function HeroSection() {
  const res = await getHeroCoverImage();
  const image = urlFor(res?.image?.asset?._ref).toString();
  const heroImage = image || "/hero-image.jpg";

  return (
    <section className="relative  max-h-[250px]   sm:max-h-[500px] overflow-hidden w-full">
      <Image
        width={1920}
        height={600}
        priority
        className="object-cover  object-bottom h-full w-full brightness-[.9]"
        src={heroImage}
        alt="hero image"
      />

      <div className="max-md:hidden absolute bottom-0 left-0 p-5 bg-black/50 w-full ">
        <div className=" flex containerWrapper mx-auto  gap-10 overflow-hidden justify-start ">
          {brands.map((brand, i) => (
            <Image
              key={brand + i}
              src={brand}
              width={500}
              height={120}
              alt="brand"
              className=""
            />
          ))}
        </div>
      </div>
      <div className=" absolute bottom-2 md:top-20  left-0 md:px-5 w-full ">
        <div className="  w-full containerWrapper mx-auto flex flex-col   overflow-hidden justify-start ">
          <h1 className="capitalize text-[20px] sm:text-[28px] md:text-[70px] font-serif leading-[1] text-white font-bold">
            The Fall Collection
          </h1>
          <p className="text-white text-[10px] md:text-[15px] font-bold uppercase">
            NEW READY-TO-WEAR FROM OUR FAVORITE BRANDS
          </p>
          <div className="flex items-center max-md:justify-between gap-3 mt-5 w-full">
            <Link
              href={""}
              className=" px-2 md:px-3 py-1 md:py-2 text-white max-md:justify-center max-md:w-full flex items-center gap-5 text-[14px] sm:text-[16px] font-bold bg-slate-900/70"
            >
              Mui Mui{" "}
              <ChevronRightIcon
                className="text-white max-md:hidden "
                size={30}
              />
            </Link>
            <Link
              href={""}
              className=" px-2 md:px-3 py-1 md:py-2 text-white  max-md:justify-center max-md:w-full flex items-center gap-5 text-[14px] sm:text-[16px] font-bold bg-slate-900/70"
            >
              Gucci{" "}
              <ChevronRightIcon
                className="text-white  max-md:hidden"
                size={30}
              />
            </Link>
            <Link
              href={""}
              className=" px-2 md:px-3 py-1 md:py-2 text-white  max-md:justify-center  max-md:w-full flex items-center gap-5 text-[14px] sm:text-[16px] font-bold bg-slate-900/70"
            >
              Nodaleto{" "}
              <ChevronRightIcon
                className="text-white  max-md:hidden"
                size={30}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
