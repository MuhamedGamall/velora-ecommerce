"use client";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CartMenu from "../modals/CartMenu";
import Navigation from "./Navigation";
import ProfileMenu from "./ProfileMenu";
import Search from "./SearchBar";
import WishlistMenu from "../modals/WishlistMenu";
import { useScrollTop } from "@/hooks/use-scroll-top";
import CategoriesSheet from "./CategoriesSheet";

export default function Navber() {
  const pathname = usePathname();
  const scrolled = useScrollTop();
  if (["/auth/signIn", "/auth/register"].includes(pathname)) return;
  const isPrivacyPolicy = pathname.includes("/privacy-policy");

  const isStudioPage = pathname.includes("/studio");
  return (
    <header className={cn(" fixed top-0 w-full z-[1000]",{
        "border-b shadow-md":scrolled 
    })}>
      <div
        className={cn("bg-mainBlack overflow-hidden", {
          "bg-[#13141b]": isStudioPage,
        })}
      >
        <div
          className={cn(
            "h-[70px] flex justify-between gap-2 flex-nowrap px-5 items-center w-full",
            {
              " containerWrapper mx-auto ": !isStudioPage,
            }
          )}
        >
          {!isStudioPage && (
            <div className="md:hidden ">
              <CategoriesSheet/>
            </div>
          )}
          <Link href={"/"} className="md:hidden block ">
            <Image src={"/logo.png"} alt="logo" width={100} height={50} />
          </Link>
          <Link href={"/"} className="max-md:hidden">
            <Image src={"/logo.png"} alt="logo" width={152} height={50} />
          </Link>

          {!isStudioPage && !isPrivacyPolicy && (
            <div className="flex items-center gap-2">
              <Search   />
              <ProfileMenu />
              <WishlistMenu />
              <CartMenu />
            </div>
          )}
        </div>
      </div>

      {!isStudioPage && !isPrivacyPolicy && <Navigation />}
    </header>
  );
}
