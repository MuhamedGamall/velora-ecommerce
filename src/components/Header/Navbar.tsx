"use client";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CartMenu from "../modals/CartMenu";
import WishlistMenu from "../modals/WishlistMenu";
import { Skeleton } from "../ui/skeleton";
import CategoriesSheet from "./CategoriesSheet";
import Navigation from "./Navigation";
import ProfileMenu from "./ProfileMenu";
import Search from "./SearchBar";
import { useSession } from "next-auth/react";

export default function Navber() {
  const pathname = usePathname();
  const scrolled = useScrollTop();
  const isAuthPage = ["/auth/signIn", "/auth/register"].includes(pathname);
  const isPrivacyPolicy = pathname.includes("/privacy-policy");
  const isStudioPage = pathname.includes("/studio");
  const session = useSession();
  const loading = session.status === "loading";
  if (isAuthPage) return null;

  return (
    <header
      className={cn("fixed top-0 w-full z-[1000]", {
        "border-b shadow-md": scrolled,
      })}
    >
      <div
        className={cn("bg-mainBlack overflow-hidden", {
          "bg-[#13141b]": isStudioPage,
        })}
      >
        <div
          className={cn(
            "h-[70px] flex justify-between gap-2 px-5 items-center",
            { "containerWrapper mx-auto": !isStudioPage }
          )}
        >
          {!isStudioPage && (
            <div className="md:hidden">
              <CategoriesSheet />
            </div>
          )}
          <Link href="/" className="md:hidden block">
            <Image src="/logo.png" alt="logo" width={100} height={50} />
          </Link>
          <Link href="/" className="max-md:hidden">
            <Image src="/logo.png" alt="logo" width={152} height={50} />
          </Link>
          {!isStudioPage && !isPrivacyPolicy && (
            <div className="flex items-center gap-2">
              {loading ? (
                <>
                  <Skeleton className="h-10 w-[272px]" />
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-5 w-5" />
                </>
              ) : (
                <>
                  <Search />
                  <ProfileMenu />
                  <WishlistMenu />
                  <CartMenu />
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <Navigation />
    </header>
  );
}
