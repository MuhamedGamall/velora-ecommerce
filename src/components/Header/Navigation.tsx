import Link from "next/link";
import React from "react";

export default function Navigation() {
  return (
    <nav className="max-md:hidden w-full bg-slate-100  text-mainBlack/80 font-medium text-sm">
      <ul className="containerWrapper flex items-center mx-auto overflow-x-auto ">
        <li className="px-2.5 py-2.5 hover:bg-white whitespace-nowrap">
          <Link href={"/explore/women"}>Women</Link>
        </li>
        <li className="px-2.5 py-2.5 hover:bg-white whitespace-nowrap">
          <Link href={"/explore/men"}>Men</Link>
        </li>
        <li className="px-2.5 py-2.5 hover:bg-white whitespace-nowrap">
          <Link href={"/explore/boy"}>Boy</Link>
        </li>
        <li className="px-2.5 py-2.5 hover:bg-white whitespace-nowrap">
          <Link href={"/explore/girl"}>Girl</Link>
        </li>
        <li className="px-2.5 py-2.5 hover:bg-white whitespace-nowrap">
          <Link href={"/explore/accessories"}>Accessories</Link>
        </li>
        <li className="px-2.5 py-2.5 hover:bg-white whitespace-nowrap">
          <Link href={"/explore/sale"}>Sale</Link>
        </li>
        <li className="px-2.5 py-2.5 hover:bg-white whitespace-nowrap">
          <Link href={"/explore/newSeason"}>New Season</Link>
        </li>
      </ul>
    </nav>
  );
}

