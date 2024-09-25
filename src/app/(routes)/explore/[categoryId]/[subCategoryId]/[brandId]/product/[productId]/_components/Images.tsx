"use client";

import { toUrl } from "@/lib/utils";
import { ImageObject } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const Images = ({ images }: { images: ImageObject[] }) => {
  const [selectedImg, setSelectedImg] = useState(0);

  const handleNext = () =>
    setSelectedImg((prev) => (prev < images.length - 1 ? prev + 1 : 0));

  const handlePrevious = () =>
    setSelectedImg((prev) => (prev > 0 ? prev - 1 : images.length - 1));

  return (
    <div className="flex flex-col-reverse xs:flex-row md:flex-col-reverse lg:flex-row gap-5 sm:gap-12 items-center">
      <div className="flex  max-sm:hidden  sm:flex-col md:flex-row lg:flex-col  gap-2 ">
        {images?.map((img, index) => (
          <div
            key={index}
            className={`w-[48px]  sm:w-[70px] md:w-[48px] p-1 cursor-pointer ${
              selectedImg === index ? "border border-mainBlack" : ""
            }`}
            onClick={() => setSelectedImg(index)}
          >
            <Image
              src={img?.asset?.url}
              alt={`Thumbnail ${index + 1}`}
              width={100}
              height={100}
              placeholder="blur"
              blurDataURL="/cardSkeleton.png"
              className="object-contain"
            />
          </div>
        ))}
      </div>
      <div className="relative w-full">
        <Image
          src={images?.[selectedImg]?.asset?.url}
          alt={`Image ${selectedImg + 1}`}
          width={1000}
          height={1000}
          placeholder="blur"
          blurDataURL="/cardSkeleton.png"
          className="object-contain"
        />
        <button
          className="left-2  absolute top-1/2 -translate-y-1/2 h-8 w-8 bg-white/70  rounded-full"
          onClick={handlePrevious}
        >
          <ChevronLeft className="w-4 h-4 mx-auto" />
        </button>
        <button
          className="right-2 absolute top-1/2 -translate-y-1/2 h-8 w-8 bg-white/70  rounded-full"
          onClick={handleNext}
        >
          <ChevronRight className="w-4 h-4 mx-auto" />
        </button>
      </div>
    </div>
  );
};

export default Images;
