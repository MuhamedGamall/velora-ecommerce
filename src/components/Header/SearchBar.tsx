"use client";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";

export default function Search() {
  const [open, setOpen] = useState(false);
  const q = useSearchParams().get("q");
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    if (q) {
      setSearchQuery(q);
    } else setSearchQuery("");
  }, [q]);
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = qs.stringifyUrl(
      {
        query: { q: searchQuery },
        url: location?.href,
      },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    );
    setOpen(false);
    router.push(`${url}`);
    router.refresh();
  };
  return (
    <>
      <form
        onSubmit={handleSearch}
        className="max-md:pr-5 md:mr-5  overflow-hidden relative  w-fit h-fit"
      >
        <Input
          type="text"
          name="search"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          placeholder="Find your style"
          className="[&]:placeholder:text-mainBlack max-md:hidden pl-11 rounded-none   focus-visible:ring-0 focus-visible:ring-offset-0 border-0 h-[40px] w-[272px]"
        />
        <button className="absolute left-2 top-1/2 -translate-y-1/2">
          <SearchIcon className=" text-mainBlack   w-[25px] h-[25px] " />
        </button>
      </form>

      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild className=" md:hidden ring-offset-0e">
          <button>
            <SearchIcon className="max-md:text-white  " size={17} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className={cn(
            " rounded-none border-mainBlack     shadow-searchBar w-screen"
          )}
        >
          <form onSubmit={handleSearch} className="relative w-full  h-[60px]">
            <Input
              type="text"
              name="search"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              placeholder="Find your style"
              className="[&]:placeholder:text-mainBlack top-1/2 w-full h-full pl-12 rounded-none   focus-visible:ring-0 focus-visible:ring-offset-0 border-0 "
            />

            <button className="absolute left-2 top-1/2 -translate-y-1/2">
              <SearchIcon className=" text-mainBlack    w-[30px] h-[30px] " />
            </button>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
