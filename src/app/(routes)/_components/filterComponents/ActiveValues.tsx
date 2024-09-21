"use client";
import { X } from "lucide-react";
import React from "react";
import qs from "query-string";
import { useRouter } from "next/navigation";
import { SearchParams } from "@/types";

export default function ActiveValues({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const router = useRouter();
  const actives = [
    { q: searchParams?.q },
    { minPrice: searchParams?.minPrice },
    { maxPrice: searchParams?.maxPrice },
    { colour: searchParams?.colour },
    { material: searchParams?.material },
    { pattern: searchParams?.pattern },
    { size: searchParams?.size },
    { brand: searchParams?.brand },
    { sale: searchParams?.sale },
    { newSeason: searchParams?.newSeason },
    { bestseller: searchParams?.bestseller },
  ];
  const parseURL = (url: string) =>
    qs.parse(url, {
      parseBooleans: true,
      parseNumbers: true,
      arrayFormatSeparator: "|",
      arrayFormat: "separator",
    });

  const handleDelete = (key: string) => {
    let data = parseURL(location?.search);
    delete data[key];
    const url = qs.stringify(data, {
      skipNull: true,
      arrayFormat: "separator",
      arrayFormatSeparator: "|",
      skipEmptyString: true,
    });
    router.push(`?${url}`);
    router.refresh();
  };

  return (
    <div className="w-full my-3 px-2max-w-[900px] overflow-x-auto py-1">
      <ul className="flex items-center gap-3">
        {actives.map((active) =>
          Object.entries(active).map(([key, value]) => {
            return (
              value &&
              key && (
                <li
                  key={key}
                  className="bg-[#e7e7e7] text-mainBlack px-3 py-1 flex items-center gap-3 text-[13px] "
                >
                  "{key === "q" ? value : key}"
                  <button onClick={() => handleDelete(key)}>
                    <X size={13} />
                  </button>
                </li>
              )
            );
          })
        )}
      </ul>
    </div>
  );
}
