import Link from "next/link";
import React from "react";

export default function Navigation() {
  return (
    <nav className="max-md:hidden w-full bg-slate-100  text-mainBlack/80 font-medium text-sm">
      <ul className="containerWrapper flex items-center mx-auto overflow-x-auto ">
        <li className="px-2.5 py-2.5 hover:bg-white whitespace-nowrap">
          <Link href={"/women"}>Women</Link>
        </li>
        <li className="px-2.5 py-2.5 hover:bg-white whitespace-nowrap">
          <Link href={"/men"}>Men</Link>
        </li>
        <li className="px-2.5 py-2.5 hover:bg-white whitespace-nowrap">
          <Link href={"/boy"}>Boy</Link>
        </li>
        <li className="px-2.5 py-2.5 hover:bg-white whitespace-nowrap">
          <Link href={"/girl"}>Girl</Link>
        </li>
        <li className="px-2.5 py-2.5 hover:bg-white whitespace-nowrap">
          <Link href={"/accessories"}>Accessories</Link>
        </li>
        <li className="px-2.5 py-2.5 hover:bg-white whitespace-nowrap">
          <Link href={"/sale"}>Sale</Link>
        </li>
        <li className="px-2.5 py-2.5 hover:bg-white whitespace-nowrap">
          <Link href={"/new-season"}>New Season</Link>
        </li>
      </ul>
    </nav>
  );
}

