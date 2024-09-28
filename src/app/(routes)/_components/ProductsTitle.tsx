import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function ProductsTitle({
  searchParams,
  params,
  productsLength,
}: {
  searchParams?: any;
  params?: {
    categoryId: string;
    subCategoryId: string;
  };
  productsLength: number;
}) {
  const title = () => {
    const { q } = searchParams || {};
    const { categoryId, subCategoryId } = params || {};

    if (q && !categoryId && !subCategoryId) {
      return `"${q}" in All Products`;
    }

    if (q && categoryId) {
      return subCategoryId
        ? `"${q}" in ${subCategoryId} & ${categoryId}`
        : `"${q}" in ${categoryId}`;
    }

    if (categoryId) {
      return subCategoryId ? `${subCategoryId} & ${categoryId}` : categoryId;
    }

    return "All Products";
  };
  return (
    <div className="w-full mb-6">
      <h1
        className="text-[20px] font-bold capitalize
      mb-1"
      >
        {title()}
      </h1>
      <h2 className="text-[13px] text-slate-600 font-normal flex items-center gap-1">
        <span className="font-bold text-sm text-black">{productsLength} </span>
        Products
      </h2>
    </div>
  );
}
ProductsTitle.Skeleton = () => {
  return (
    <div className="w-full mb-6">
      <Skeleton
        className=" h-7 w-full max-w-[150px]
      mb-2"
      />

      <div className="flex items-center gap-2">
        <Skeleton className="w-full max-w-4 h-4" />
        <Skeleton className=" w-full max-w-[100px] h-5" />
      </div>
    </div>
  );
};
