import Link from "next/link";
import React from "react";

export default function Navigation() {
  return (
    <nav className="w-full bg-slate-100  text-mainBlack/80 font-medium text-sm">
      <ul className="containerWrapper flex items-center mx-auto ">
        <li className="px-2.5 py-2.5 hover:bg-white">
          <Link href={"/women"}>Women</Link>
        </li>
        <li className="px-2.5 py-2.5 hover:bg-white">
          <Link href={"/men"}>Men</Link>
        </li>
        <li className="px-2.5 py-2.5 hover:bg-white">
          <Link href={"/boy"}>Boy</Link>
        </li>
        <li className="px-2.5 py-2.5 hover:bg-white">
          <Link href={"/girl"}>Girl</Link>
        </li>
        <li className="px-2.5 py-2.5 hover:bg-white">
          <Link href={"/accessories"}>Accessories</Link>
        </li>
        <li className="px-2.5 py-2.5 hover:bg-white">
          <Link href={"/sale"}>Sale</Link>
        </li>
        <li className="px-2.5 py-2.5 hover:bg-white">
          <Link href={"/new-season"}>New Season</Link>
        </li>
      </ul>
    </nav>
  );
}

