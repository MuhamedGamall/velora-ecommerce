"use client";
import useCartModal from "@/hooks/useCartModal";
import { Menu, ShoppingBag } from "lucide-react";
import Image from "next/image";
import ProfileMenu from "./ProfileMenu";
import Search from "./SearchBar";
import CartMenu from "./CartMenu";
import WishlistMenu from "./WishlistMenu";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Navigation from "./Navigation";
import Link from "next/link";

export default function Navber() {
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
          <Link href={"/"}>
            <Image
              src={"/logo.png"}
              alt="logo"
              width={100}
              height={50}
              className="md:hidden block "
            />
          </Link>
          <Image
            src={"/logo.png"}
            alt="logo"
            width={152}
            height={50}
            className="max-md:hidden"
          />

          {!isStudioPage && !isPrivacyPolicy && (
            <div className="flex items-center gap-2">
              <Search />
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
