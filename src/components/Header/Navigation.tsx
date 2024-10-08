"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CATEGORIES } from "./CategoriesSheet";
import { Skeleton } from "../ui/skeleton";

export default function Navigation() {
  const [fakeLoading, setFakeLoading] = useState(true);
  useEffect(() => {
    const ID = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);

    return () => clearTimeout(ID);
  }, []);
  return (
    <nav className="max-md:hidden w-full bg-slate-100  text-mainBlack/80 font-medium text-sm">
      {fakeLoading ? (
        <Navigation.Skeleton />
      ) : (
        <ul className="containerWrapper flex items-center mx-auto overflow-x-auto ">
          {CATEGORIES.map((cate) => (
            <li
              className="p-2.5 hover:bg-white whitespace-nowrap"
              key={cate.href + cate.title}
            >
              <Link href={cate.href}>{cate.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
Navigation.Skeleton = function () {
  return (
    <nav className="  max-md:hidden w-full bg-slate-100  text-mainBlack/80 font-medium text-sm">
      <ul className="containerWrapper flex items-center mx-auto overflow-x-auto animate-pulse">
        {Array.from({ length: 7 }).map((_, i) => (
          <li className="p-2.5 hover:bg-white whitespace-nowrap" key={i}>
            <Skeleton className="h-5 w-14 bg-slate-300" />
          </li>
        ))}
      </ul>
    </nav>
  );
};
