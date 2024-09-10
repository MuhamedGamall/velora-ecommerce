"use client";
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { SearchIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Search() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null) as any;

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto"; 
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <>
      <form className="max-md:pr-5 md:mr-5  overflow-hidden relative  w-fit h-fit">
        <Input
          type="text"
          name="search"
          // onChange={(e) => setQuery(e.target.value)}
          // value={query}
          placeholder="Find your style"
          className="[&]:placeholder:text-mainBlack max-md:hidden pl-11 rounded-none   focus-visible:ring-0 focus-visible:ring-offset-0 border-0 h-[40px] w-[272px]"
        />
        <button className="absolute left-2 top-1/2 -translate-y-1/2">
          <SearchIcon className=" text-mainBlack   w-[25px] h-[25px] " />
        </button>
      </form>
      <div className="md:hidden">
        <button
          onClick={() => setOpen(true)}
          className={cn("", { hidden: open })}
        >
          <SearchIcon className="max-md:text-white   "size={17}  />
        </button>
        <button
          onClick={() => setOpen(false)}
          className={cn("", { hidden: !open })}
        >
          <X className="max-md:text-white " size={17} />
        </button>
      </div>
      <div
        ref={ref}
        className={cn(
          "hidden absolute shadow-searchBar top-[70px] left-0 w-full",
          { block: open }
        )}
      >
        <form className="relative w-full  h-[70px]">
          <Input
            type="text"
            name="search"
            // onChange={(e) => setQuery(e.target.value)}
            // value={query}
            placeholder="Find your style"
            className="[&]:placeholder:text-mainBlack top-1/2 w-full h-full pl-12 rounded-none   focus-visible:ring-0 focus-visible:ring-offset-0 border-0 "
          />
          <button className="absolute left-2 top-1/2 -translate-y-1/2">
            <SearchIcon className=" text-mainBlack    w-[30px] h-[30px] " />
          </button>
        </form>
      </div>
    </>
  );
}
