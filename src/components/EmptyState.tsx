import Link from "next/link";
import React from "react";

export default function EmptyState({
  type,
}: {
  type: "checkout" | "wishlist";
}) {
  return (
    <div className="flex flex-col items-center gap-4 justify-center w-full h-[600px]">
      <h5 className="text-[20px]">
        {type === "checkout"
          ? "Add items to your Shopping Bag"
          : "Add items to your Wishlist"}
      </h5>
      <Link href={"/"} className="underline underline-offset-2">
        {/* TODO: add link */}
        Shop what's New
      </Link>
    </div>
  );
}
