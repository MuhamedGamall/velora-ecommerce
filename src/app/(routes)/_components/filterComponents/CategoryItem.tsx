"use client";
import { cn } from "@/lib/utils";
import { CategoryTree } from "@/types";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const CategoryItem = ({ cateItem }: { cateItem: CategoryTree }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const { categoryId, subCategoryId } = useParams();
  const isMainCategory = categoryId === cateItem?.title?.toLocaleLowerCase();

  const isSubCategory = (cateId: string) => {
    if (!subCategoryId || !cateId) return false;

    return subCategoryId === cateId?.toLocaleLowerCase() && isMainCategory;
  };

  useEffect(() => {
    if (isMainCategory) {
      setExpanded((prevExpanded) => ({
        ...prevExpanded,
        [cateItem?.title]: true,
      }));
    }
  }, [isMainCategory, cateItem?.title]);

  const onExpand = (cateId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [cateId]: !prevExpanded[cateId],
    }));
  };
  const ChevronIcon = expanded[cateItem.title] ? ChevronDown : ChevronRight;

  return (
    <div className="w-full [&>div]:first:border-none [&>div]:first:pt-0 [&>div]:first:mt-0 ">
      {cateItem && (
        <div
          className={cn(
            "max-lg:px-5 flex items-center justify-between w-full gap-2 h-[64px] cursor-pointer border-t "
          )}
          onClick={() => onExpand(cateItem?.title)}
        >
          <Link
            href={`/explore/${cateItem?.title?.toLocaleLowerCase()?.trim()}`}
            className={cn(
              "flex items-center cursor-pointer text-lg w-fit underline capitalize",
              {
                "font-bold": isMainCategory,
              }
            )}
          >
            {cateItem?.title}
          </Link>

          {cateItem?.subCategories && cateItem?.subCategories.length > 0 && (
            <div className="ml-auto ">
              <ChevronIcon size={17} />
            </div>
          )}
        </div>
      )}

      {expanded[cateItem?.title] &&
        cateItem?.subCategories &&
        cateItem?.subCategories.length > 0 && (
          <div className="max-lg:pl-10 pl-5 ">
            {cateItem?.subCategories.map((subCate, index) => (
              <Link
                href={`/explore/${cateItem?.title?.toLocaleLowerCase()?.trim()}/${subCate?.title?.toLocaleLowerCase()?.trim()}`}
                key={subCate?.title}
                className={cn(
                  "flex items-center cursor-pointer hover:underline capitalize mb-2 text-slate-600",
                  {
                    "font-semibold underline ": isSubCategory(subCate?.title),
                  }
                )}
              >
                {subCate?.title}
              </Link>
            ))}
          </div>
        )}
    </div>
  );
};
export default CategoryItem;
