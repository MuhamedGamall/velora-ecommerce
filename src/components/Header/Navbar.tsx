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

export default function Navber() {
  const pathname = usePathname();
  if (["/auth/signIn", "/auth/register"].includes(pathname)) return;
  const isStudioPage = pathname.includes("/studio");
  return (
    <header
      className={cn("bg-mainBlack overflow-hidden", {
        "bg-[#13141b]": isStudioPage,
      })}
    >
      <div className="h-[70px] flex justify-between gap-2 flex-nowrap px-5 items-center containerWrapper mx-auto w-full">
        {!isStudioPage && (
          <div className="md:hidden ">
            <Menu strokeWidth={1.7}  scale={25} className="text-white" />
          </div>
        )}
     
        <Image src={"/logo.png"} alt="logo" width={100} height={50} className="md:hidden block "/>
        <Image src={"/logo.png"} alt="logo" width={152} height={50} className="max-md:hidden"/>

        {!isStudioPage && (
          <div className="flex items-center gap-2">
            <Search />
            <ProfileMenu />
            <WishlistMenu />
            <CartMenu />
          </div>
        )}
      </div>
    </header>
  );
}
