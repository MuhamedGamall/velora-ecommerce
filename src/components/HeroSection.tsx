"use client";
import { getHeroSection } from "@/actions/get-hero-section";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { use, useEffect } from "react";
import { Skeleton } from "./ui/skeleton";

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

export default function HeroSection() {
  const [loading, setLoading] = React.useState(true);
  const [heroSection, setHeroSection] = React.useState({}) as any;
  useEffect(() => {
    getHeroSection().then((data) => {
      setHeroSection(data);
      setLoading(false);
    });
  }, []);
  const heroImage = heroSection?.image || "/hero-image.jpg";

  return (
    <section className="relative  max-h-[300px]   sm:max-h-[580px] overflow-hidden w-full">
      <Image
        width={1920}
        height={600}
        priority
        className="object-cover  object-bottom h-full w-full brightness-[.9]"
        src={heroImage}
        alt="hero image"
        blurDataURL="/hero_SectinSkeleton.png"
        placeholder="blur"
      />

      <div className="max-md:hidden absolute bottom-0 left-0 p-5 bg-black/50 w-full ">
        <div className=" flex containerWrapper h-[50px] mx-auto  gap-10 overflow-hidden justify-start ">
          {brands.map((brand, i) => (
            <Image
              key={brand + i}
              src={brand}
              width={500}
              height={120}
              alt="brand"
              className=""
              priority
            />
          ))}
        </div>
      </div>
      <div className=" absolute bottom-2 md:top-20  left-0 md:px-5 w-full ">
        <div className="  w-full containerWrapper mx-auto flex flex-col   overflow-hidden justify-start ">
          {loading ? (
            <Skeleton className="  h-8 md:h-14 w-full max-w-[500px] mb-3" />
          ) : (
            <h1 className="capitalize text-[20px] sm:text-[28px] md:text-[70px] leading-[1] text-white font-bold">
              {heroSection?.title || "The Fall Collection"}
            </h1>
          )}

          {loading ? (
            <Skeleton className="  h-4 md:h-8 max-w-[700px] w-full" />
          ) : (
            <p className="text-white text-[10px] md:text-[15px] font-bold uppercase">
              {heroSection?.subtitle || "NEW READY-TO-WEAR FROM OUR FAVORITE BRANDS"}
            </p>
          )}
          <div className="flex items-center max-md:justify-between gap-3 mt-5 w-full">
            <Link
              href={"/explore?brand=mui_mui"}
              className=" px-2 md:px-3 whitespace-nowrap py-1 md:py-2 text-white max-md:justify-center max-md:w-full flex items-center gap-5 text-[14px] sm:text-[16px] font-bold bg-slate-900/70"
            >
              Mui Mui
              <ChevronRightIcon
                className="text-white max-md:hidden "
                size={30}
              />
            </Link>
            <Link
              href={"/explore?brand=gucci"}
              className=" px-2 md:px-3 whitespace-nowrap py-1 md:py-2 text-white  max-md:justify-center max-md:w-full flex items-center gap-5 text-[14px] sm:text-[16px] font-bold bg-slate-900/70"
            >
              Gucci
              <ChevronRightIcon
                className="text-white  max-md:hidden"
                size={30}
              />
            </Link>
            <Link
              href={"/explore?brand=louis_vuitton"}
              className=" whitespace-nowrap px-2 md:px-3 py-1 md:py-2 text-white  max-md:justify-center  max-md:w-full flex items-center gap-5 text-[14px] sm:text-[16px] font-bold bg-slate-900/70"
            >
              Louis Vuitton
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
