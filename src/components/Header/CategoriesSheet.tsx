import { CategoryTree } from "@/types";
import Categories from "../../../original-code/lamastoreplus-main/app/components/Categories";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
export default function CategoriesSheet() {
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon strokeWidth={1.7} scale={25} className="text-white" />
      </SheetTrigger>
      <SheetContent side={"left"} className="w-full max-w-[300px] sm:w-[540px] z-[3000]">
        <ul className=" w-full [&>li]:w-full ">
          <li className="">
            <Link
              href={"/explore/women"}
              className="w-full px-2.5 py-2.5 hover:underline  whitespace-nowrap block"
            >
              Women's
            </Link>
          </li>
          <li className="">
            <Link
              href={"/explore/men"}
              className="w-full px-2.5 py-2.5 hover:underline  whitespace-nowrap block"
            >
              Men's
            </Link>
          </li>
          <li className="">
            <Link
              href={"/explore/boys"}
              className="w-full px-2.5 py-2.5 hover:underline  whitespace-nowrap block"
            >
              Boy's
            </Link>
          </li>
          <li className="">
            <Link
              href={"/explore/girls"}
              className="w-full px-2.5 py-2.5 hover:underline  whitespace-nowrap block"
            >
              Girl's
            </Link>
          </li>
          <li className="">
            <Link
              href={"/explore/accessories"}
              className="w-full px-2.5 py-2.5 hover:underline  whitespace-nowrap block"
            >
              Accessories
            </Link>
          </li>
          <li className="">
            <Link
              href={"/explore/sale"}
              className="w-full px-2.5 py-2.5 hover:underline  whitespace-nowrap block"
            >
              Sale
            </Link>
          </li>
          <li className="">
            <Link
              href={"/explore/newSeason"}
              className="w-full px-2.5 py-2.5 hover:underline  whitespace-nowrap block"
            >
              New Season
            </Link>
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
}
