"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const CATEGORIES = [
  { title: "Women's", href: "/explore/women" },
  { title: "Men's", href: "/explore/men" },
  { title: "Boy's", href: "/explore/boys" },
  { title: "Girl's", href: "/explore/girls" },
  { title: "Accessories", href: "/explore/accessories" },
  { title: "Sale", href: "/explore/sale" },
  { title: "New Season", href: "/explore/newSeason" },
];

export default function CategoriesSheet() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <MenuIcon strokeWidth={1.7} scale={25} className="text-white" />
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="w-full max-w-[300px] sm:w-[540px] z-[3000]"
      >
        <ul className=" w-full [&>li]:w-full ">
          {CATEGORIES.map((category) => (
            <li key={category.href} className="" onClick={() => setOpen(false)}>
              <Link
                href={category.href}
                className="w-full px-2.5 py-2.5 hover:underline  whitespace-nowrap block"
              >
                {category.title}
              </Link>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
