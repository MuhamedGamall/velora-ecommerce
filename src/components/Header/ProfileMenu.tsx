"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const session = useSession();

  return session.status === 'unauthenticated' ? (
    <Link href={"/auth/signIn"}>
      <User
        size={20}
        strokeWidth={1.3}
        color="white"
        className="cursor-pointer"
      />
    </Link>
  ) : (
    <DropdownMenu onOpenChange={setOpen} open={open}>
      <DropdownMenuTrigger asChild className="outline-none">
        <button>
          <User size={20} strokeWidth={1.3} color="white " />
          <span className="sr-only">Toggle user menu</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="bg-white border rounded-none mt-5 !z-[1600] p-2"
      >
        <div className="flex items-center gap-2 p-2">
          {session?.data?.user?.image ? (
            <Image
              loading="lazy"
              src={session?.data?.user?.image}
              width={30}
              height={30}
              className="rounded-full"
              alt="user profile image"
            />
          ) : (
            <User size={30} />
          )}
          <div className="grid gap-0.5 leading-none">
            <div className="font-semibold capitalize">
              {session?.data?.user?.name}
            </div>
            <div className="text-sm text-muted-foreground ">
              {session?.data?.user?.email}
            </div>
          </div>
        </div>
        <>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpen(false)} asChild>
            <Link href={`/orders`} className="flex items-center gap-2 cursor-pointer">
              <div className="h-4 w-4" />
              <span>Orders</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => {
              setOpen(false);

              signOut({ callbackUrl: "/" }).then(() => {
                router.refresh();
              });
            }}
            asChild
            className="p-3 cursor-pointer text-slate-600"
          >
            <span>Sign Out</span>
          </DropdownMenuItem>
        </>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
