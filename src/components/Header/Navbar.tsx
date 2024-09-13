"use client";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "@/types";
import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CartMenu from "./CartMenu";
import Navigation from "./Navigation";
import ProfileMenu from "./ProfileMenu";
import Search from "./SearchBar";
import WishlistMenu from "./WishlistMenu";

export default function Navber({
  shoppingBag,
}: {
  shoppingBag: ShoppingBag[];
}) {
  const pathname = usePathname();
  if (["/auth/signIn", "/auth/register"].includes(pathname)) return;
  const isPrivacyPolicy = pathname.includes("/privacy-policy");

  const isStudioPage = pathname.includes("/studio");
  return (
    <header>
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
              <Menu strokeWidth={1.7} scale={25} className="text-white" />
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
              <Search />
              <ProfileMenu />
              <WishlistMenu />
              <CartMenu shoppingBag={shoppingBag} />
            </div>
          )}
        </div>
      </div>

      {!isStudioPage && !isPrivacyPolicy && <Navigation />}
    </header>
  );
}
